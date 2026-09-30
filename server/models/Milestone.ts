import mongoose, { Schema } from 'mongoose';

export interface IMilestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  highlights?: string[];
  status?: 'completed' | 'in-progress' | 'upcoming';
}

const MilestoneSchema = new Schema<IMilestone>({
  id: { type: String, required: true, unique: true },
  period: { type: String, required: true },
  title: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  highlights: { type: [String], default: [] },
  status: { type: String, enum: ['completed', 'in-progress', 'upcoming'], default: 'completed' }
}, { timestamps: true });

const Milestone = (mongoose.models.Milestone as mongoose.Model<IMilestone>) || mongoose.model<IMilestone>('Milestone', MilestoneSchema);
export default Milestone;
