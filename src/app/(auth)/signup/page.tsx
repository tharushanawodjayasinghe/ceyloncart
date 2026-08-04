import { Metadata } from 'next';
import SignUpForm from '@/features/auth/SignUpForm';

export const metadata: Metadata = { title: 'Create Account' };

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Join CeylonCart and discover authentic Sri Lankan products
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
