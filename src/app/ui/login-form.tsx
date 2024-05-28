import { auth } from '@/auth';
import AuthButton from '../AuthButton.server';
 
async function LoginForm() {
  const session = await auth();

  return (
    <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <AuthButton />
    </div>
  )
}

export default LoginForm