import { Schema, models, model } from 'mongoose';
import { Resource } from '../interfaces/resource';

const ResourceSchema = new Schema<Resource>({
  resourceId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  impacts: {
    type: [
      {
        impactGWP100_kgCO2e: {
          type: String,
          required: true,
        },
        impactAP_kgSO2e: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export default models.resources || model<Resource>('resources', ResourceSchema);
