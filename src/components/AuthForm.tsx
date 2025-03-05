
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm = ({ isLogin = true }: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signIn(email, password);
        // Login successful, navigation is handled in AuthContext
      } else {
        console.log('Signing up with:', { email, fullName });
        
        // Validate input
        if (!fullName.trim()) {
          throw new Error('Full name is required');
        }
        
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        const result = await signUp(email, password, fullName);
        console.log('Signup result:', result);
        
        // If we got here, signup was successful
        toast.success('Account created successfully!', {
          description: 'Your account is pending approval by an administrator.',
        });
        
        // Navigate to pending approval page
        navigate('/auth/pending');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      
      // Extract the most user-friendly error message
      let errorMessage = 'An unexpected error occurred';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.error_description) {
        errorMessage = err.error_description;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Special handling for common errors
      if (errorMessage.includes('User already registered')) {
        errorMessage = 'This email is already registered. Try signing in instead.';
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (errorMessage.toLowerCase().includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-8 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-semibold">
          {isLogin ? 'Secure Login' : 'Create Account'}
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          {isLogin 
            ? 'Enter your credentials to access secure areas' 
            : 'Sign up for a new account with SecureGuardian'}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/20 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required={!isLogin}
              disabled={isLoading}
              className="bg-secondary/50 border-border"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="bg-secondary/50 border-border"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isLogin ? "Enter your password" : "Create a strong password"}
            required
            disabled={isLoading}
            className="bg-secondary/50 border-border"
            minLength={6}
          />
          {!isLogin && (
            <p className="text-xs text-muted-foreground mt-1">
              Password must be at least 6 characters long
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="button-primary w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isLogin ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            isLogin ? 'Sign In' : 'Create Account'
          )}
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/auth" className="text-primary hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
