import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import * as constants from '../../libs/constants';
import { decodeToken } from '../../utils';
import type { Resource } from '../../interfaces';
import { UserContext } from '../../contexts/users';
import DropDownList from '../../components/DropDownList';
import UsedResourcesTable from '../../components/UsedResourcesTable';
import TotalImpactsView from '../../components/TotalImpactsView';

interface UserPageProps {
  resourcesList: Resource[];
}

const baseURL = 'http://localhost:3000';

const UserPage = (props: UserPageProps) => {
  const { resourcesList } = props;
  const { user, checkLogined, logout, deleteAccount } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      checkLogined && checkLogined();
    }
  }, [user]);

  const handleLogout = () => {
    if (logout) {
      logout();
      router.push('/');
    }
  };

  const handleDeleteAccount = () => {
    if (deleteAccount) {
      deleteAccount();
      router.push('/');
    }
  };

  return (
    <div className="my-4 mx-8">
      <h1>Welcome back, {user?.name}</h1>
      <div className="flex gap-4">
        <button className="btn-base bg-red-400 my-2" onClick={handleLogout}>
          Logout
        </button>
        <button
          className="btn-base bg-red-400 my-2"
          onClick={handleDeleteAccount}
        >
          Delete account
        </button>
      </div>
      <div className="mt-20">
        <h1>Used resources</h1>
        <div className="mt-4">
          <DropDownList data={resourcesList} />
        </div>
        <div className="mt-4">
          <p>
            <b>Total result</b>
          </p>
          <TotalImpactsView />
        </div>
        <div className="mt-4">
          <UsedResourcesTable />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const token = ctx.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const userId = decodeToken(token);

  if (!userId || userId !== id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    const resourcesList = await axios.get(
      baseURL + constants.apiRoutes.resources
    );
    return {
      props: {
        resourcesList: resourcesList.data,
      },
    };
  }
};

export default UserPage;
