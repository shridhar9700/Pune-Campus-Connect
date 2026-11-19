import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { requireAuth, AuthRequest } from '../middleware/auth.js'
import { College } from '../models/College.js'
import { User } from '../models/User.js'
import { clearSessionCookie, setSessionCookie, toAuthUser } from '../utils/auth.js'
import { sendOtpEmail } from '../utils/email.js'

const router = Router()

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(72),
  collegeId: z.string().min(1),
  department: z.string().trim().min(2).max(100),
  academicYear: z.coerce.number().int().min(1).max(6),
  graduationYear: z.coerce.number().int().min(2020).max(2040),
  role: z.enum(['student', 'alumni']).default('student')
})

router.post('/register', async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body)
    const existing = await User.findOne({ email: input.email })
    if (existing) return res.status(409).json({ message: 'An account with this email already exists' })

    const college = await College.findOne({ _id: input.collegeId, status: 'active' })
    if (!college) return res.status(400).json({ message: 'Please select an approved college' })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const passwordHash = await bcrypt.hash(input.password, 12)
    const user = await User.create({
      ...input,
      passwordHash,
      verificationStatus: 'pending',
      otpHash: await bcrypt.hash(otp, 10),
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    await sendOtpEmail(input.email, otp)
    setSessionCookie(res, user.id)

    res.status(201).json({
      user: toAuthUser(user),
      ...(process.env.NODE_ENV !== 'production' ? { developmentOtp: otp } : {})
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const input = z.object({
      email: z.string().trim().email().transform((value) => value.toLowerCase()),
      password: z.string().min(1)
    }).parse(req.body)
    const user = await User.findOne({ email: input.email }).select('+passwordHash')
    if (!user || !(await user.comparePassword(input.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    setSessionCookie(res, user.id)
    res.json({ user: toAuthUser(user) })
  } catch (error) {
    next(error)
  }
})

router.post('/verify-email', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { otp } = z.object({ otp: z.string().regex(/^\d{6}$/) }).parse(req.body)
    const user = await User.findById(req.user?.id).select('+otpHash +otpExpiresAt')
    if (!user) {
      return res.status(404).json({ message: 'Account not found' })
    }

    if (user.verificationStatus === 'verified' || user.verificationStatus === 'approved') {
      return res.json({ verificationStatus: user.verificationStatus })
    }

    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({ message: 'Verification is unavailable. Please register again.' })
    }
    if (user.otpExpiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: 'Verification code has expired' })
    }
    if (!(await bcrypt.compare(otp, user.otpHash))) {
      return res.status(400).json({ message: 'Invalid verification code' })
    }

    user.verificationStatus = user.role === 'alumni' ? 'approved' : 'verified'
    user.otpHash = undefined
    user.otpExpiresAt = undefined
    await user.save()

    res.json({ verificationStatus: user.verificationStatus })
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (_req, res) => {
  clearSessionCookie(res)
  res.status(204).end()
})

router.get('/me', requireAuth, (req: AuthRequest, res) => {
  res.json({ user: toAuthUser(req.user!) })
})

export default router
