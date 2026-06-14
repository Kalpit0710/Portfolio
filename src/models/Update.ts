import mongoose from 'mongoose';

export interface IUpdate extends mongoose.Document {
  type: 'github' | 'linkedin';
  content: string;
  mediaUrl?: string;
  url: string;
  postedAt: Date;
  isHidden: boolean;
  externalId: string; // To prevent duplicates (e.g. GitHub event ID)
}

const UpdateSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['github', 'linkedin'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isHidden: {
    type: Boolean,
    default: false,
  },
  externalId: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

// Prevent model overwrite upon hot reload in Next.js
export default mongoose.models.Update || mongoose.model<IUpdate>('Update', UpdateSchema);
