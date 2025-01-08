import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Добавляем Link
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '../../lib/api/auth'; // Используем login вместо signIn
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
      navigate('/admin/status');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gradient">Admin Login</h1>
          <p className="text-white/60 mt-2">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button 
            type="submit" 
            loading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        {/* Ссылка на регистрацию */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
