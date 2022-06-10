import { NextPage } from 'next';
import Link from 'next/link';
import { LoginForm } from '../../components/forms';

export const Login: NextPage = () => {
  return (
    <div className="root-wrapper">
      <h1>Login</h1>
      <LoginForm />
      <div className="flex flex-col items-center space-y-4">
        <Link href="/auth/register">
          <p className="link-base">Create new account</p>
        </Link>
        <Link href="/">
          <p className="link-base">Back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
