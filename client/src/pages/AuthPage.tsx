import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, GraduationCap, LockKeyhole, Mail, CheckCircle2 } from 'lucide-react'
import { api } from '../services/api'
import { getApiErrorMessage } from '../services/errors'
import { useAuth } from '../context/AuthContext'
import type { College, User } from '../types'

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'
  const location = useLocation()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const collegeIdFromUrl = new URLSearchParams(location.search).get('college') || ''
  const [colleges, setColleges] = useState<College[]>([])
  const [collegesError, setCollegesError] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [verification, setVerification] = useState(false)
  const [otp, setOtp] = useState('')
  const [developmentOtp, setDevelopmentOtp] = useState('')

  useEffect(() => {
    if (!isRegister) return

    let active = true
    api.get<{ colleges: College[] }>('/colleges')
      .then(({ data }) => {
        if (active) {
          setColleges(data.colleges)
          setCollegesError('')
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setColleges([])
          setCollegesError(getApiErrorMessage(err, 'Unable to load colleges right now.'))
        }
      })

    return () => {
      active = false
    }
  }, [isRegister])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const payload = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login'
      const { data } = await api.post<{ user: User; developmentOtp?: string }>(endpoint, payload)
      setUser(data.user)

      if (isRegister) {
        setDevelopmentOtp(data.developmentOtp || '')
        setVerification(true)
      } else if (data.user.verificationStatus === 'pending') {
        setVerification(true)
      } else {
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, 'Unable to continue. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  const verifyEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data } = await api.post<{ verificationStatus: User['verificationStatus'] }>('/auth/verify-email', { otp })
      const response = await api.get<{ user: User }>('/auth/me')
      setUser(response.data.user)

      if (data.verificationStatus === 'verified' || data.verificationStatus === 'approved') {
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, 'Verification failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  if (verification) {
    return (
      <div className="auth-layout">
        <aside className="auth-side"><div style={{ maxWidth: 430 }}><div className="feature-icon" style={{ width: 54, height: 54 }}><GraduationCap size={27} /></div><h2 style={{ fontSize: 38, lineHeight: 1.15, marginTop: 22 }}>Verify your college membership</h2><p style={{ color: '#747e92', lineHeight: 1.7 }}>We sent a 6-digit code to your email. College verification keeps every community safe and exclusive.</p></div></aside>
        <main className="auth-panel"><form className="form-card" onSubmit={verifyEmail}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#747e92', textDecoration: 'none', marginBottom: 32 }}><ArrowLeft size={16} /> Back to home</Link>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: '#eaf7f1', color: '#16845b', display: 'grid', placeItems: 'center', marginBottom: 16 }}><CheckCircle2 /></div>
          <h1 style={{ fontSize: 32, margin: '0 0 8px', letterSpacing: -1 }}>Enter verification code</h1>
          <p style={{ color: '#747e92', marginBottom: 24 }}>The code expires in 10 minutes.</p>
          {developmentOtp && <div style={{ background: '#fff7df', border: '1px solid #f3dda2', color: '#806a2b', borderRadius: 10, padding: 10, marginBottom: 14, fontSize: 13 }}>Development code: <strong>{developmentOtp}</strong></div>}
          <label style={{ display: 'block', marginBottom: 16 }}>Verification code<input className="field" value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" maxLength={6} placeholder="000000" required /></label>
          {error && <p style={{ color: '#b42318', fontSize: 13 }}>{error}</p>}
          <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>{loading ? 'Verifying...' : 'Verify and continue'}</button>
        </form></main>
      </div>
    )
  }

  return (
    <div className="auth-layout">
      <aside className="auth-side">
        <div style={{ maxWidth: 430 }}>
          <div className="feature-icon" style={{ width: 54, height: 54 }}><GraduationCap size={27} /></div>
          <h2 style={{ fontSize: 38, lineHeight: 1.15, marginTop: 22 }}>Campus Connect</h2>
          <p style={{ color: '#747e92', lineHeight: 1.7 }}>Your college community is waiting. Find your people, preserve memories, and build connections that last.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            {['College communities', 'Anonymous confessions', 'Alumni network'].map((item) => <span key={item} style={{ borderRadius: 999, background: 'white', padding: '8px 10px', fontSize: 12, color: '#647087' }}>{item}</span>)}
          </div>
        </div>
      </aside>
      <main className="auth-panel">
        <form className="form-card" onSubmit={submit}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#747e92', textDecoration: 'none', marginBottom: 28 }}><ArrowLeft size={16} /> Back to home</Link>
          <h1 style={{ fontSize: 34, margin: '0 0 8px', letterSpacing: -1 }}>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
          <p style={{ color: '#747e92', marginBottom: 24 }}>{isRegister ? 'Join your verified college community.' : 'Log in to continue to your campus.'}</p>

          {isRegister && <>
            <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>Full name<input className="field" name="fullName" placeholder="Your full name" required /></label>
            <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>College<select className="field" name="collegeId" defaultValue={collegeIdFromUrl} required><option value="" disabled>Select your college</option>{colleges.map((college) => <option key={college._id} value={college._id}>{college.name}</option>)}</select></label>
            {collegesError && <p style={{ color: '#b42318', fontSize: 13, margin: '-4px 0 12px' }}>{collegesError}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>Department<input className="field" name="department" placeholder="Computer Science" required /></label>
              <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>Academic year<select className="field" name="academicYear" defaultValue="1">{[1,2,3,4,5].map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>Graduation year<input className="field" type="number" name="graduationYear" defaultValue={new Date().getFullYear() + 3} min="2020" max="2040" required /></label>
              <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>I am a<select className="field" name="role"><option value="student">Student</option><option value="alumni">Alumni</option></select></label>
            </div>
          </>}

          <label style={{ display: 'block', marginBottom: 12, fontSize: 13, fontWeight: 800 }}>Email address<div style={{ position: 'relative' }}><Mail size={16} style={{ position: 'absolute', left: 12, top: 15, color: '#98a1b2' }} /><input className="field" style={{ paddingLeft: 38 }} type="email" name="email" placeholder="you@college.edu" required /></div></label>
          <label style={{ display: 'block', marginBottom: 16, fontSize: 13, fontWeight: 800 }}>Password<div style={{ position: 'relative' }}><LockKeyhole size={16} style={{ position: 'absolute', left: 12, top: 15, color: '#98a1b2' }} /><input className="field" style={{ paddingLeft: 38 }} type="password" name="password" minLength={8} placeholder="At least 8 characters" required /></div></label>
          {error && <p style={{ color: '#b42318', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button className="btn-primary" type="submit" style={{ width: '100%' }} disabled={loading}>{loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Log In'}</button>
          <p style={{ textAlign: 'center', color: '#747e92', fontSize: 13, marginTop: 18 }}>
            {isRegister ? 'Already have an account?' : "New to Campus Connect?"}{' '}
            <Link to={isRegister ? '/login' : '/register'} style={{ color: '#4f46e5', fontWeight: 800 }}>{isRegister ? 'Log in' : 'Create account'}</Link>
          </p>
        </form>
      </main>
    </div>
  )
}
