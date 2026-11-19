import type { Response } from 'express'
import jwt from 'jsonwebtoken'
import type { IUser } from '../models/User.js'

const SESSION_COOKIE = 'token'
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is not configured')
  }
  return 'development-secret'
}

export function signSessionToken(userId: string): string {
  return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: '7d' })
}

export function setSessionCookie(res: Response, userId: string): void {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie(SESSION_COOKIE, signSessionToken(userId), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: SESSION_MAX_AGE_MS,
  })
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(SESSION_COOKIE)
}

export function toAuthUser(user: IUser) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    collegeId: user.collegeId,
    department: user.department,
    academicYear: user.academicYear,
    graduationYear: user.graduationYear,
    verificationStatus: user.verificationStatus,
  }
}
