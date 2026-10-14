import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILeadNote {
  id?: string;
  text: string;
  createdAt: Date;
  author: string;
}

export type LeadLifecycleStatus =
  | 'New'
  | 'Contacted'
  | 'Discovery'
  | 'Proposal'
  | 'Converted'
  | 'Archived'
  | 'Spam';

export interface ILead extends Document {
  fullName: string;
  name?: string; // backwards compatibility
  email: string;
  phone: string;
  companyName: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: LeadLifecycleStatus;
  notes: ILeadNote[];
  metadata: {
    ip?: string;
    userAgent?: string;
    submittedAt: Date;
    durationMs?: number;
  };
  isSpam: boolean;
  spamScore: number;
  isSeen?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>({
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, default: 'Admin' },
});

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      maxlength: [120, 'Email cannot exceed 120 characters'],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [7, 'Phone number must be at least 7 digits'],
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      trim: true,
      default: 'Website Engineering & Redesign',
      index: true,
    },
    budget: {
      type: String,
      trim: true,
      default: '',
    },
    timeline: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Discovery', 'Proposal', 'Converted', 'Archived', 'Spam'],
      default: 'New',
      index: true,
    },
    notes: {
      type: [LeadNoteSchema],
      default: [],
    },
    metadata: {
      ip: { type: String, default: 'unknown' },
      userAgent: { type: String, default: 'unknown' },
      submittedAt: { type: Date, default: Date.now },
      durationMs: { type: Number, default: 0 },
    },
    isSpam: {
      type: Boolean,
      default: false,
      index: true,
    },
    spamScore: {
      type: Number,
      default: 0,
    },
    isSeen: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to mirror fullName to name
LeadSchema.pre('save', function (next) {
  if (this.fullName && !this.name) {
    this.name = this.fullName;
  }
  next();
});

const Lead: Model<ILead> =
  mongoose.models && mongoose.models.Lead
    ? (mongoose.models.Lead as Model<ILead>)
    : mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
