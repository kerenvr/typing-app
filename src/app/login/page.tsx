import { auth } from '@/auth';
import AuthButton from '../AuthButton.server';
import LoginForm from '@/app/ui/login-form';
 
async function LoginPage() {
  const session = await auth();

  return (
    <div>
        <LoginForm />
    </div>
  )
}

export default LoginPage