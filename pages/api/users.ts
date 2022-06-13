import { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';
import { decodeToken } from '../../utils';
import dbConfig from '../../libs/dbConfig';
import UserModel from '../../models/user';

async function updateField(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string
) {
  // Connect database
  dbConfig();

  const { field } = req.query;

  const saved = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      [field as string]: req.body,
    },
  });

  if (saved)
    return res.status(http.OK).json({ message: `new ${field} is saved` });
  return res
    .status(http.INTERNAL_SERVER_ERROR)
    .json({ message: 'Failed to update user data' });
}

async function deleteUser(res: NextApiResponse, userId: string) {
  // Connect database
  dbConfig();

  const deleted = await UserModel.findByIdAndDelete(userId);

  if (deleted)
    return res
      .status(http.OK)
      .setHeader('Set-Cookie', 'token=; Path=/; Max-age=0')
      .json({ message: 'User deleted' });
  return res
    .status(http.INTERNAL_SERVER_ERROR)
    .json({ message: 'Failed to delete user' });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, cookies } = req;
  const token = cookies.token as string;

  const userId = decodeToken(token);

  if (!userId) {
    return res.status(http.UNAUTHORIZED).json({ message: 'User unauthorized' });
  }

  switch (method) {
    case 'PATCH':
      return updateField(req, res, userId);
    case 'DELETE':
      return deleteUser(res, userId);
    default:
      return res
        .status(http.METHOD_NOT_ALLOWED)
        .json({ message: 'This method not allowed' });
  }
}
