import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  id: string;
  title: string;
  description: string;
  badge: string;
  highlights: string[];
}

const ServiceSchema = new Schema<IService>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badge: { type: String, default: 'Frontend' },
  highlights: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
