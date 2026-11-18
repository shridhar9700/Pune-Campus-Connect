import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export type UserRole = 'student' | 'alumni' | 'club_admin' | 'college_moderator' | 'platform_admin'

export interface IUser extends Document {
  id: string
  fullName: string
  email: string
  passwordHash: string
  collegeId: mongoose.Types.ObjectId
  department: string
  academicYear: number
  graduationYear: number
  role: UserRole
  verificationStatus: 'pending' | 'verified' | 'approved' | 'rejected'
  otpHash?: string
  otpExpiresAt?: Date
  bio?: string
  skills: string[]
  interests: string[]
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  collegeId: { type: Schema.Types.ObjectId, ref: 'College', required: true, index: true },
  department: { type: String, required: true, trim: true },
  academicYear: { type: Number, required: true, min: 1, max: 6 },
  graduationYear: { type: Number, required: true },
  role: { type: String, enum: ['student', 'alumni', 'club_admin', 'college_moderator', 'platform_admin'], default: 'student' },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'approved', 'rejected'], default: 'pending' },
  otpHash: { type: String, select: false },
  otpExpiresAt: { type: Date, select: false },
  bio: { type: String, maxlength: 500 },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] }
}, { timestamps: true })

userSchema.method('comparePassword', function (password: string) {
  return bcrypt.compare(password, this.passwordHash)
})

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)
