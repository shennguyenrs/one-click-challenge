import {
  ReactElement,
  useState,
  useEffect,
  useMemo,
  createContext,
} from 'react';
import axios from 'axios';
import * as constants from '../libs/constants';
import * as utils from '../utils';
import {
  CleanUser,
  Resource,
  UpdateResource,
  UsedResource,
} from '../interfaces';

export interface USERCTX {
  user: CleanUser | null;
  addResource: ((resource: Resource) => void) | undefined;
  checkLogined: (() => Promise<void>) | undefined;
  logout: (() => Promise<void>) | undefined;
  deleteAccount: (() => Promise<void>) | undefined;
}

export const UserContext = createContext<USERCTX>({
  user: null,
  addResource: undefined,
  checkLogined: undefined,
  logout: undefined,
  deleteAccount: undefined,
});

export default function UserProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [user, setUser] = useState<USERCTX['user']>(null);

  // Check if user is logged in
  const checkLogined = async () => {
    try {
      const { data } = await axios.get(
        `${constants.apiRoutes.authentication}/check`
      );

      if (data) {
        setUser(data.user as CleanUser);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await axios.delete(`${constants.apiRoutes.authentication}/logout`);
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle delete account
  const deleteAccount = async () => {
    try {
      await axios.delete(`${constants.apiRoutes.users}`);
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Save new used resources in database
  const saveUsedResources = async (updateResources: UpdateResource[]) => {
    try {
      await axios.patch(
        `${constants.apiRoutes.users}?field=usedResources`,
        updateResources
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Add resource to user
  const addResource = async (resource: Resource) => {
    // Check if the new resource in the list of used resources
    const usedResources = [...(user?.usedResources as UsedResource[])] || [];
    let newUsedResources;

    const isExist = usedResources.some(
      (usedResource: UsedResource) =>
        usedResource.resource.resourceId === resource.resourceId
    );

    // If the new resource is in the list, add 1 to the current quantity
    // Else update user with new used resources list
    if (isExist) {
      newUsedResources = usedResources.map((usedResource: UsedResource) => {
        if (usedResource.resource.resourceId === resource.resourceId) {
          const newQuantity = usedResource.quantity + 1;
          return {
            ...usedResource,
            quantity: newQuantity,
            result: utils.calculateImpacts(resource.impacts[0], newQuantity),
          };
        }

        return usedResource;
      });

      setUser({
        ...(user as CleanUser),
        usedResources: newUsedResources,
      });
    } else {
      // If new resources is not in the usedd resources
      // Calculate impacts of new used resource
      // the base quantity is 1
      const newQuantity = 1;
      const result = utils.calculateImpacts(resource.impacts[0], newQuantity);

      newUsedResources = [
        ...usedResources,
        { resource, quantity: newQuantity, result },
      ];

      setUser({
        ...(user as CleanUser),
        usedResources: newUsedResources,
      });
    }

    // Save new used resources in database
    const updateResources = newUsedResources.map((item) => {
      return {
        ...item,
        resource: item.resource._id as string,
      };
    });

    saveUsedResources(updateResources);
  };

  const initialValue = useMemo(() => {
    return {
      user,
      addResource,
      checkLogined,
      logout,
      deleteAccount,
    };
  }, [user]);

  // Check logined user on loading page
  useEffect(() => {
    if (!user) {
      checkLogined();
    }
  }, [user]);

  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  );
}
