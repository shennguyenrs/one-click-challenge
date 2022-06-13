import type { NextApiRequest, NextApiResponse } from 'next';
import http from 'http-status';

const deleteSession = (res: NextApiResponse) => {
  try {
    return res
      .status(http.OK)
      .setHeader('Set-Cookie', 'token=; Path=/; Max-age=0')
      .json({ message: 'Logout successful' });
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'DELETE':
      return deleteSession(res);

    default:
      return res
        .status(http.METHOD_NOT_ALLOWED)
        .json({ message: 'Method not allowed' });
  }
}
