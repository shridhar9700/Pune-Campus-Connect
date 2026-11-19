import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { rateLimit } from 'express-rate-limit'
import mongoose from 'mongoose'
import { ZodError } from 'zod'
import authRoutes from './routes/auth.routes.js'
import collegeRoutes from './routes/college.routes.js'

export const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many authentication requests. Please try again later.' }
}))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/colleges', collegeRoutes)

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Please check the submitted fields',
      issues: error.issues.map((issue) => ({ field: issue.path.join('.'), message: issue.message }))
    })
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid request identifier' })
  }

  if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: number }).code === 11000) {
    return res.status(409).json({ message: 'A conflicting record already exists' })
  }

  console.error(error)
  res.status(500).json({ message: 'An unexpected server error occurred' })
})
