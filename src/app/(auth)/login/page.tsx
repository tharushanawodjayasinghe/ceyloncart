import { Metadata } from 'next';
import LoginForm from '@/features/auth/LoginForm';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Sign in to your CeylonCart account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
