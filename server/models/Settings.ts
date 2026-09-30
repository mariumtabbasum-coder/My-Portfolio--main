import mongoose, { Schema } from 'mongoose';

export interface ISettings {
  emails: string[];
  phone: string;
  buttonText: string;
  buttonLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  contactBtnText: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  profile: {
    name: string;
    title: string;
    education: string;
    scholarship: string;
    location: string;
    bio: string;
    heroBadge: string;
    responseTimeText: string;
  };
}

const SettingsSchema = new Schema<ISettings>({
  emails: { type: [String], required: true, default: ['mariumtabbasum@gmail.com'] },
  phone: { type: String, required: true, default: '+92 300 1234567' },
  buttonText: { type: String, required: true, default: 'View Projects' },
  buttonLink: { type: String, required: true, default: '#projects' },
  secondaryCtaText: { type: String, required: true, default: 'Download CV' },
  secondaryCtaLink: { type: String, required: true, default: '/resume.pdf' },
  contactBtnText: { type: String, required: true, default: 'Send Message' },
  links: {
    github: { type: String, default: 'https://github.com/mariumtabbasum-coder' },
    linkedin: { type: String, default: 'https://linkedin.com/in/mariumtabbasum' },
    twitter: { type: String, default: 'https://twitter.com/marium' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  profile: {
    name: { type: String, default: 'Marium Tabassum' },
    title: { type: String, default: 'Software Engineering Student & AI-Focused Web Developer' },
    education: { type: String, default: 'Aptech Computer Education (Semester 1 Complete)' },
    scholarship: { type: String, default: 'Bano Qabil Generative AI Scholar' },
    location: { type: String, default: 'Karachi, Pakistan' },
    bio: { type: String, default: 'Passionate software engineering student and frontend developer building responsive web applications and exploring generative AI solutions.' },
    heroBadge: { type: String, default: 'Aptech Computer Education • Semester 1 Complete' },
    responseTimeText: { type: String, default: 'Typical Response: Within 24 Hours' }
  }
}, { timestamps: true });

const Settings = (mongoose.models.Settings as mongoose.Model<ISettings>) || mongoose.model<ISettings>('Settings', SettingsSchema);
export default Settings;
