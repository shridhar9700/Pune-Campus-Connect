import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUser, User, UserRole } from '../models/User.js'

export interface AuthRequest extends Request {
  user?: IUser
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'development-secret') as { sub: string }
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ message: 'Account not found' })
    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' })
    }
    next()
  }
}
