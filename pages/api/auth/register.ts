import type { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as constants from '../../../libs/constants';
import dbConfig from '../../../libs/dbConfig';
import UserModel from '../../../models/user';
import { User } from '../../../interfaces';

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  // Connect to database
  await dbConfig();

  try {
    const { name, email, password } = req.body;

    const user: User | null = await UserModel.findOne({ email });

    // Return message if user exists
    if (user) {
      return res.status(http.BAD_REQUEST).json({ message: 'User exists' });
    }

    // Hashing password
    const hashsedPass = await bcrypt.hash(password, 10);

    // Create and save user in database
    const newUser = new UserModel({
      name,
      email,
      password: hashsedPass,
    });

    const saved: User = await newUser.save();

    // Generate new token and add to header
    // Then return with user data
    const token = jwt.sign(
      { _id: saved._id },
      constants.JWT_SECRET as string,
      constants.jwtOpts
    );

    return res
      .status(http.CREATED)
      .setHeader(
        'Set-Cookie',
        `token=${token}; Path=/; Max-age=${60 * 60 * 24 * 7}`
      )
      .json({ id: saved._id });
  } catch (err) {
    return res
      .status(http.INTERNAL_SERVER_ERROR)
      .json({ message: 'Server failed to create new user' });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return createUser(req, res);
    default:
      res
        .status(http.METHOD_NOT_ALLOWED)
        .json({ message: 'This method not allowed' });
      break;
  }
}
