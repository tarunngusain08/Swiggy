import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side: Form */}
        <div className="md:w-1/2 flex flex-col order-2 md:order-1">
          {/* Header */}
          <div className="p-4 md:p-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </button>
          </div>
          
          {/* Form */}
          <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Create an account</h2>
              <p className="text-muted-foreground">Sign up to start ordering your favorite food</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div>
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-2" required />
                  <span className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
              
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-4 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="btn btn-outline flex justify-center items-center gap-2">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="btn btn-outline flex justify-center items-center gap-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M16.318 13.714v5.484h-9.877v-5.484a.75.75 0 0 1 .75-.75h8.378a.75.75 0 0 1 .75.75zm-1.5 2.293v-1.543h-2.54v1.543h2.54zm0 2.442v-1.543h-2.54v1.543h2.54zm-4.039-2.442v-1.543h-2.54v1.543h2.54zm0 2.442v-1.543h-2.54v1.543h2.54zM9.19 4.552a.75.75 0 0 1 .526.215l.214.215.6.6a3.75 3.75 0 0 0 5.294 0l.6-.6.214-.215a.75.75 0 0 1 1.161.939l-.1.123-.213.214-.601.602a5.25 5.25 0 0 1-7.418 0L9.1 6.043l-.215-.214a.75.75 0 0 1 .305-1.277zM13.864 3.5a2.75 2.75 0 0 1 1.937.793l.213.214.6.6a.25.25 0 0 0 .354 0l.6-.6.214-.214a2.75 2.75 0 0 1 4.144 3.562l-.213.214-.601.602a1.75 1.75 0 0 1-2.473 0l-.6-.602-.214-.214a2.75 2.75 0 0 1-.794-1.937V5.25H15.5V5.9a1.75 1.75 0 0 1-.394 1.099l-.195.195a1.75 1.75 0 0 1-2.224.141l-.164-.136-.401-.401-.33-.329-.329-.33-.401-.4a1.75 1.75 0 0 1-.165-.195l-.127-.164a1.75 1.75 0 0 1-.125-1.78l.136-.217A1.75 1.75 0 0 1 12.111 3.5h1.753z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right side: Image */}
        <div className="md:w-1/2 bg-muted order-1 md:order-2">
          <div className="h-40 md:h-full w-full relative">
            <img
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Food delivery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
              <h1 className="text-white text-4xl font-bold mb-6">Join our food community</h1>
              <p className="text-white/90 text-lg max-w-md text-center">
                Create an account to get personalized recommendations and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}