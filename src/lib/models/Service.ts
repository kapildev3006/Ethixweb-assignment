import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  slug: string;
  number: string;
  category: 'website' | 'ai' | 'growth' | 'data' | 'accessibility' | 'support';
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  indianUseCase: string;
  iconName: string;
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  altText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['website', 'ai', 'growth', 'data', 'accessibility', 'support'],
      index: true,
    },
    categoryLabel: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    capabilities: {
      type: [String],
      default: [],
    },
    indianUseCase: {
      type: String,
      default: '',
      trim: true,
    },
    iconName: {
      type: String,
      default: 'Zap',
      trim: true,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      default: '',
      trim: true,
    },
    altText: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'services',
  }
);

const Service: Model<IService> =
  mongoose.models && mongoose.models.Service
    ? (mongoose.models.Service as Model<IService>)
    : mongoose.model<IService>('Service', ServiceSchema);

export default Service;
