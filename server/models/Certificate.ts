import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  description?: string;
  skills: string[];
}

const CertificateSchema = new Schema<ICertificate>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, default: '' },
  credentialId: { type: String, default: '' },
  description: { type: String, default: '' },
  skills: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
