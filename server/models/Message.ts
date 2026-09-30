import mongoose, { Schema } from 'mongoose';

export interface IMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date?: string;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const Message = (mongoose.models.Message as mongoose.Model<IMessage>) || mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
