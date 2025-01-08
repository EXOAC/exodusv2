import { useAuthRedirect } from '../../lib/auth/hooks/useAuthRedirect';
import { SignUpForm } from '../../components/auth/forms/SignUpForm';

export default function SignUp() {
  useAuthRedirect();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gradient">Create Account</h1>
          <p className="text-white/60 mt-2">Join our community</p>
        </div>
        
        <SignUpForm />
      </div>
    </div>
  );
}