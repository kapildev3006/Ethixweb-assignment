import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  slug: string;
  name: string;
  role: string;
  date: string;
  impact: string;
  quote: string;
  sourceUrl: string;
  rating: number;
  isVisible: boolean;
  displayOrder: number;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  altText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'Verified Client',
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    impact: {
      type: String,
      default: '',
      trim: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    sourceUrl: {
      type: String,
      default: 'https://www.trustpilot.com/review/ethixweb.com',
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      required: true,
      default: 0,
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
    collection: 'testimonials',
  }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models && mongoose.models.Testimonial
    ? (mongoose.models.Testimonial as Model<ITestimonial>)
    : mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
