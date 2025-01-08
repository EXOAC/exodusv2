import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src="https://imgur.com/iC4dzF4.png" 
              alt="Logo" 
              className="h-8 w-8"
            />
            <span className="ml-2 text-xl font-bold text-white">
              Admin Panel
            </span>
          </div>

          <Button variant="ghost" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}