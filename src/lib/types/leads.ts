export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Discovery'
  | 'Proposal'
  | 'Converted'
  | 'Archived';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: LeadStatus;
  isSeen?: boolean;
  notes: LeadNote[];
  createdAt: string;
}
