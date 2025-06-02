import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-24 w-24 text-muted-foreground mx-auto">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back to finding delicious food.
      </p>
      
      <Button asChild>
        <Link to="/" className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
}