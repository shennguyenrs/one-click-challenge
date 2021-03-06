import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { decodeToken } from '../utils';

const Home: NextPage = () => {
  return (
    <div className="root-wrapper">
      <h1>One Click LCA - Front-end developer challenge</h1>
      <div className="mt-10 flex flex-col text-center gap-2">
        <Link href="/auth/login">
          <p className="btn-base">Login</p>
        </Link>
        <Link href="/auth/register">
          <p className="btn-base">Create new account</p>
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

export default Home;
