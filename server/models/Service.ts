import mongoose, { Schema } from 'mongoose';

export interface IService {
  id: string;
  title: string;
  description: string;
  badge?: string;
  highlights?: string[];
}

const ServiceSchema = new Schema<IService>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badge: { type: String, default: 'Frontend' },
  highlights: { type: [String], default: [] }
}, { timestamps: true });

const Service = (mongoose.models.Service as mongoose.Model<IService>) || mongoose.model<IService>('Service', ServiceSchema);
export default Service;
