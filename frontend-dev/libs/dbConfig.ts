import mongoose from 'mongoose';
import * as constants from './constants';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(constants.MONGO_URI as string, {
        bufferCommands: false,
        connectTimeoutMS: 10000,
        authSource: 'admin',
        user: constants.MONGO_USER as string,
        pass: constants.MONGO_PASSWORD as string,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
