import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: 'all' | 'frontend' | 'javascript' | 'responsive';
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  techStack: string[];
  featured?: boolean;
  imageUrl?: string;
}

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: String, enum: ['all', 'frontend', 'javascript', 'responsive'], default: 'frontend' },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  features: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
