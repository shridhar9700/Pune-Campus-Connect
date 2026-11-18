export type User = {
  id: string
  fullName: string
  email: string
  role: 'student' | 'alumni' | 'club_admin' | 'college_moderator' | 'platform_admin'
  collegeId: string
  department?: string
  academicYear?: number
  graduationYear?: number
  verificationStatus: 'pending' | 'verified' | 'approved' | 'rejected'
}

export type College = {
  _id: string
  name: string
  city: string
  logoUrl?: string
  studentCount: number
}
