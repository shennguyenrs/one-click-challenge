import { Schema, models, model } from 'mongoose';
import { User } from '../interfaces';

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
  usedResources: [
    {
      resource: {
        type: Schema.Types.ObjectId,
        ref: 'resources',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      result: {
        impactGWP100_kgCO2e: {
          type: Number,
          required: true,
        },
        impactAP_kgSO2e: {
          type: Number,
          required: true,
        },
      },
      _id: false,
    },
  ],
});

export default models.users || model<User>('users', UserSchema);
