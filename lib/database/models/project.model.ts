import { Schema, Document, model, models } from 'mongoose';

// Interface for the Project document
export interface IProject extends Document {
  _id: string;
  title: string;
  priority: boolean;
  position: 'start' | 'center' | 'end';
  videoSource: string;
  speed: number;
  aspectRatio: '16/9' | '9/16';
  imageUrl?: string;
  category: 'fashion' | 'beauty' | 'luxury';
  createdAt: Date;
  __v?: number;
}

// Schema for the Project model
const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  priority: { type: Boolean, required: true },
  position: { type: String, enum: ['start', 'center', 'end'], required: true },
  videoSource: { type: String, required: true },
  speed: { type: Number, min: -4, max: 4, required: true },
  aspectRatio: { type: String, enum: ['16/9', '9/16'], required: true },
  imageUrl: { type: String },
  category: {
    type: String,
    enum: ['fashion', 'beauty', 'luxury'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Model for the Project collection
const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
