import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseStudy extends Document {
  slug: string;
  client: string;
  badge: string;
  category: string;
  headline: string;
  description: string;
  websiteUrl: string;
  metrics: string[];
  imageUrl: string;
  cloudinaryPublicId?: string;
  altText: string;
  displayOrder: number;
  isVerified: boolean;
  isBlueprint: boolean;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      default: 'Verified Client Project',
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    websiteUrl: {
      type: String,
      default: '',
      trim: true,
    },
    metrics: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: true,
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
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isBlueprint: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'casestudies',
  }
);

const CaseStudy: Model<ICaseStudy> =
  mongoose.models && mongoose.models.CaseStudy
    ? (mongoose.models.CaseStudy as Model<ICaseStudy>)
    : mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

export default CaseStudy;
