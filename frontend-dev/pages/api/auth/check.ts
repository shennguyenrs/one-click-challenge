import type { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';
import jwt from 'jsonwebtoken';
import dbConfig from '../../../libs/dbConfig';
import * as constants from '../../../libs/constants';
import UserModel from '../../../models/user';
import { CleanUser } from '../../../interfaces';

const validateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect mongodb
  await dbConfig();

  try {
    // Parse session token in authorization header
    const sessionToken = req.cookies.token as string;

    if (!sessionToken) {
      return res.status(http.UNAUTHORIZED).json({
        message: 'User not login',
      });
    }

    // Validate token
    let decoded;

    decoded = jwt.verify(sessionToken, constants.JWT_SECRET as string) as {
      _id: string;
    };

    // Find user in database
    const foundUser = await UserModel.findById(decoded._id).populate({
      path: 'usedResources',
      populate: {
        path: 'resource',
        model: 'resources',
      },
    });

    if (!foundUser) {
      return res.status(http.UNAUTHORIZED).json({
        message: 'User not found',
      });
    }

    // Return user data as clean user
    const returnUser = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      usedResources: foundUser.usedResources,
    } as CleanUser;

    return res.status(http.OK).json({ user: returnUser });
  } catch (err) {
    return res
      .status(http.UNAUTHORIZED)
      .json({ message: 'Can not verify token' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return validateUser(req, res);

    default:
      return res
        .status(http.METHOD_NOT_ALLOWED)
        .json({ message: 'Method not allowed' });
  }
}
