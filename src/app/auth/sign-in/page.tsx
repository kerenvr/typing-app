// /pages/auth/sign-up.tsx
"use client"
import { SignIn } from '@clerk/clerk-react';

const SignUpPage = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignIn fallbackRedirectUrl="/typing" />
    </div>
  );
};

export default SignUpPage;
