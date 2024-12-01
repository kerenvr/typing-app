// pages/auth/sign-up/sso-callback.tsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SSOCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform any needed actions after the callback
    router.push('/stats'); // Or wherever you want to redirect after a successful callback
  }, [router]);

};

export default SSOCallbackPage;
