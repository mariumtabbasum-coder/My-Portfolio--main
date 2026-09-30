import mongoose, { Schema } from 'mongoose';

export interface IMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date?: string;
  read?: boolean;
  replied?: boolean;
  replyText?: string;
  repliedAt?: string;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString() },
  read: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  replyText: { type: String, default: '' },
  repliedAt: { type: String, default: '' }
}, { timestamps: true });

const Message = (mongoose.models.Message as mongoose.Model<IMessage>) || mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
