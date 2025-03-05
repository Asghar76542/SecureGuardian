
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      setIsSuccess(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
      console.error('Error sending password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          {isSuccess 
            ? 'Check your email for a password reset link.' 
            : 'Enter your email address to receive a password reset link.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p>A password reset link has been sent to <strong>{email}</strong>.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              If you don't see the email in your inbox, please check your spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter>
        {!isSuccess && (
          <Button 
            onClick={handleResetPassword} 
            disabled={isLoading || !email} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        )}
        {isSuccess && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Reset Link
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PasswordReset;
