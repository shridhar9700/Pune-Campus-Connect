import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ICollege extends Document {
  name: string
  city: string
  logoUrl?: string
  domains: string[]
  status: 'active' | 'pending'
  studentCount: number
}

const collegeSchema = new Schema<ICollege>({
  name: { type: String, required: true, trim: true, unique: true },
  city: { type: String, required: true, trim: true, index: true },
  logoUrl: { type: String },
  domains: { type: [String], required: true, default: [] },
  status: { type: String, enum: ['active', 'pending'], default: 'active', index: true },
  studentCount: { type: Number, default: 0 }
}, { timestamps: true })

export const College: Model<ICollege> = mongoose.model<ICollege>('College', collegeSchema)
