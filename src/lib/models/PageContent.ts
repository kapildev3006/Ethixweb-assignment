import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageContent extends Document {
  pageSlug: string; // 'home' | 'about' | 'contact'
  title: string;
  sections: Record<string, any>;
  draftSections?: Record<string, any>;
  hasDraft?: boolean;
  draftUpdatedAt?: Date;
  isPublished: boolean;
  lastPublishedAt?: Date;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    pageSlug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sections: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    draftSections: {
      type: Schema.Types.Mixed,
      default: null,
    },
    hasDraft: {
      type: Boolean,
      default: false,
    },
    draftUpdatedAt: {
      type: Date,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    lastPublishedAt: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      default: 'system',
    },
  },
  {
    timestamps: true,
    collection: 'pagecontents',
  }
);

const PageContent: Model<IPageContent> =
  mongoose.models && mongoose.models.PageContent
    ? (mongoose.models.PageContent as Model<IPageContent>)
    : mongoose.model<IPageContent>('PageContent', PageContentSchema);

export default PageContent;
