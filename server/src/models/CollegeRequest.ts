import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ICollegeRequest extends Document {
  name: string
  city: string
  requesterEmail: string
  status: 'pending' | 'approved' | 'rejected'
}

const schema = new Schema<ICollegeRequest>({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  requesterEmail: { type: String, required: true, lowercase: true, trim: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true })

export const CollegeRequest: Model<ICollegeRequest> = mongoose.model<ICollegeRequest>('CollegeRequest', schema)
