import type { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as constants from '../../../libs/constants';
import dbConfig from '../../../libs/dbConfig';
import UserModel from '../../../models/user';
import { User } from '../../../interfaces';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to database
  await dbConfig();

  try {
    const { email, password } = req.body;

    const user: User | null = await UserModel.findOne({ email });

    // Return message if user not found
    if (!user) {
      return res.status(http.NOT_FOUND).json({ message: 'User not found' });
    }

    const { _id, password: hashedPass } = user as User;

    // Comparing hasing password
    const isValid = await bcrypt.compare(password, hashedPass);

    // Return message if password is not valid
    if (!isValid) {
      return res
        .status(http.UNAUTHORIZED)
        .json({ message: 'Password is not valid' });
    }

    // Generate new token and add to header
    // Then return with user data
    const token = jwt.sign(
      { _id },
      constants.JWT_SECRET as string,
      constants.jwtOpts
    );

    return res
      .status(http.OK)
      .setHeader(
        'Set-Cookie',
        `token=${token}; Path=/; Max-age=${60 * 60 * 24 * 7}`
      )
      .json({ id: _id });
  } catch (err) {
    return res
      .status(http.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server failed to validate user' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return getUser(req, res);
    default:
      res
        .status(http.METHOD_NOT_ALLOWED)
        .json({ message: 'This method not allowed' });
      break;
  }
}
