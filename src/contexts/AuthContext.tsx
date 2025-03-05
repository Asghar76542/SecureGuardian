
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

type UserRole = 'admin' | 'user';
type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  approval_status: ApprovalStatus;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Derived states
  const isAuthenticated = !!user;
  const isAdmin = profile?.role === 'admin';
  const isApproved = profile?.approval_status === 'approved';

  useEffect(() => {
    // Initialize the auth state
    setIsLoading(true);
    
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
        
        if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch the user profile from the database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to load user profile');
      
      // When user profile fails to load, check if the record exists at all
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('id', userId);
      
      if (count === 0) {
        console.log('User profile missing, creating it manually');
        try {
          // Attempt to create the profile manually
          if (user) {
            await createUserProfile(user);
            await fetchUserProfile(userId);
          }
        } catch (createError) {
          console.error('Failed to create missing user profile:', createError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create a user profile if missing
  const createUserProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name || user.email?.split('@')[0] || 'User',
          role: 'user',
          approval_status: 'pending'
        });

      if (error) throw error;
      console.log('User profile created successfully');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }
      
      // Special handling for user already registered error
      if (data?.user && !data?.session) {
        // For email confirmation flow
        toast.success('Account created successfully!', {
          description: 'Your account is pending approval.',
        });
        navigate('/auth/pending');
        return;
      }
      
      if (data?.user) {
        // Ensure the profile exists in the users table
        try {
          // Check if profile already exists (could happen if trigger failed)
          const { count } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('id', data.user.id);
          
          if (count === 0) {
            console.log('Creating user profile after signup');
            await createUserProfile(data.user);
          }
        } catch (profileError) {
          console.error('Error creating profile after signup:', profileError);
        }
      }

      toast.success('Account created successfully!', {
        description: 'Your account is pending approval.',
      });
      navigate('/auth/pending');
    } catch (error: any) {
      console.error('Error signing up:', error);
      
      // Handle the case where the user already exists
      if (error.message?.includes('User already registered')) {
        toast.error('This email is already registered', {
          description: 'Try signing in instead, or use a different email address.'
        });
      } else {
        toast.error(error.message || 'Failed to sign up');
      }
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      toast.success('Signed out successfully');
      navigate('/auth');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || 'Failed to sign out');
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    isAuthenticated,
    isAdmin,
    isApproved,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
