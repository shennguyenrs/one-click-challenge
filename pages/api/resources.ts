import type { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';
import dbConfig from '../../libs/dbConfig';
import ResourcesModel from '../../models/resource';

// GET all resources
const getAllResources = async (res: NextApiResponse) => {
  const resources = await ResourcesModel.find({});
  res.status(http.OK).json(resources);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Database connection
  const { method } = req;
  await dbConfig();

  switch (method) {
    case 'GET':
      return getAllResources(res);
    default:
      res.status(http.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed',
      });
      break;
  }
}
