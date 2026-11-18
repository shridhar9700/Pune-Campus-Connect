import { Router } from 'express'
import { z } from 'zod'
import { College } from '../models/College.js'
import { CollegeRequest } from '../models/CollegeRequest.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const city = typeof req.query.city === 'string' ? req.query.city : undefined
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : undefined
    const filter: Record<string, unknown> = { status: 'active' }
    if (city) filter.city = city
    if (search) filter.name = { $regex: search, $options: 'i' }
    const colleges = await College.find(filter).select('name city logoUrl domains studentCount').sort({ name: 1 })
    res.json({ colleges })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const college = await College.findOne({ _id: req.params.id, status: 'active' }).select('-domains')
    if (!college) return res.status(404).json({ message: 'College not found' })
    res.json({ college })
  } catch (error) {
    next(error)
  }
})

router.post('/request', async (req, res, next) => {
  try {
    const input = z.object({
      name: z.string().trim().min(3).max(150),
      city: z.string().trim().min(2).max(100),
      requesterEmail: z.string().email()
    }).parse(req.body)
    const existing = await CollegeRequest.findOne({ name: input.name, status: 'pending' })
    if (existing) return res.status(409).json({ message: 'A request for this college is already pending' })
    await CollegeRequest.create(input)
    res.status(201).json({ message: 'College request submitted for review' })
  } catch (error) {
    next(error)
  }
})

export default router
