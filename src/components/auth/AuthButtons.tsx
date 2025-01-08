import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth/AuthProvider';
import { UserMenu } from './UserMenu';

export function AuthButtons() {
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="text-white/80 hover:text-white transition-colors"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
      >
        Sign Up
      </Link>
    </div>
  );
}