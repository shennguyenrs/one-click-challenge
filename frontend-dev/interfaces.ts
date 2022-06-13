import { Impacts } from './libs/constants';

export interface Resource {
  _id?: string;
  resourceId: string;
  name: string;
  impacts: {
    [key in Impacts]: string;
  }[];
}

export interface UsedResource {
  resource: Resource;
  quantity: number;
  result: {
    [key in Impacts]: number;
  };
}

export interface UpdateResource {
  resource: string;
  quantity: number;
  result: {
    [key in Impacts]: number;
  };
}

export interface User {
  _id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: number;
  usedResources: UsedResource[];
}

export type CleanUser = Omit<User, 'password | createdAt'>;
