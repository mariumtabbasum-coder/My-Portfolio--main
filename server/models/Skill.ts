import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'programming' | 'tools';
  badge?: string;
}

const SkillSchema = new Schema<ISkill>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 1, max: 100 },
  category: { type: String, enum: ['frontend', 'programming', 'tools'], default: 'frontend' },
  badge: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
