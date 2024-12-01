// /pages/auth/sign-up.tsx
"use client"
import { SignUp } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignUpPage = () => {
  const router = useRouter();

  useEffect(() => {
    // You can also use `redirectTo` prop to automatically redirect users after successful signup
    const handleRedirect = () => {
      // Redirect user after successful sign-up if needed
      router.push('/dashboard'); // Example: Redirecting to the dashboard after sign-up
    };
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignUp path="/auth/sign-up" routing="path" />
    </div>
  );
};

export default SignUpPage;
