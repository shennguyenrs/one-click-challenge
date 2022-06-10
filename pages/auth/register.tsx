import { NextPage } from 'next';
import Link from 'next/link';
import { RegisterForm } from '../../components/forms';

export const Register: NextPage = () => {
  return (
    <div>
      <h1>Create new account</h1>
      <RegisterForm />
      <Link href="/auth/login">
        <p>Login</p>
      </Link>
    </div>
  );
};

export default Register;
