import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
