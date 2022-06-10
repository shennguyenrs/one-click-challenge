import { Schema, models, model } from 'mongoose';
import { User } from '../interfaces/user';

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

export default models.users || model<User>('users', UserSchema);
