import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { RegisterForm } from '../../components/forms';
import { decodeToken } from '../../utils';

export const Register: NextPage = () => {
  return (
    <div className="root-wrapper">
      <h1>Create new account</h1>
      <RegisterForm />
      <div className="flex flex-col items-center space-y-4">
        <Link href="/auth/login">
          <p className="link-base">Login</p>
        </Link>
        <Link href="/">
          <p className="link-base">Back to home</p>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token;

  if (token) {
    const userId = decodeToken(token);

    if (userId) {
      return {
        redirect: {
          destination: '/users/' + userId,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Register;
