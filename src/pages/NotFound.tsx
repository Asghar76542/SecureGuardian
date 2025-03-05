
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="glass-panel rounded-xl p-12 max-w-lg text-center">
        <div className="mb-6 h-20 w-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="text-4xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Access Denied: This area is restricted or does not exist.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for might have been moved, deleted, or never existed. If you believe this is an error, please contact your security administrator.
        </p>
        
        <Button className="button-primary" onClick={() => window.location.href = "/"}>
          Return to Secure Area
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
