import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, Landmark, CheckCircle2 } from 'lucide-react'
import { api } from '../services/api'
import type { College } from '../types'

export function CollegePage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(true)
  const [showRequest, setShowRequest] = useState(false)
  const [requestStatus, setRequestStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = window.setTimeout(async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/colleges', { params: { search: search || undefined, city: city || undefined } })
        setColleges(data.colleges)
      } catch {
        setColleges([])
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => window.clearTimeout(timeout)
  }, [search, city])

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await api.post('/colleges/request', Object.fromEntries(form))
      setRequestStatus('submitted')
    } catch (error: any) {
      setRequestStatus(error.response?.data?.message || 'Unable to submit request')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ height: 72, background: 'white', borderBottom: '1px solid #edf0f5' }}>
        <div className="container-shell" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#17213a', textDecoration: 'none', fontWeight: 900 }}><ArrowLeft size={18} /> Campus Connect</Link>
          <Link className="nav-link" to="/login">Already a member? Log in</Link>
        </div>
      </header>
      <main className="container-shell" style={{ padding: '58px 0' }}>
        <div style={{ maxWidth: 700 }}>
          <span style={{ color: '#4f46e5', fontWeight: 900, fontSize: 13 }}>FIND YOUR COMMUNITY</span>
          <h1 style={{ fontSize: 44, letterSpacing: -2, margin: '10px 0 12px' }}>Choose your college</h1>
          <p style={{ color: '#747e92', lineHeight: 1.7 }}>Discover verified college communities and join the people who make campus life memorable.</p>
        </div>

        <div style={{ display: 'flex', gap: 12, margin: '28px 0', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 360px' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: 14, color: '#98a1b2' }} />
            <input className="field" style={{ height: 46, paddingLeft: 42 }} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search colleges" />
          </div>
          <select className="field" style={{ width: 180 }} value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="">All cities</option><option>Pune</option>
          </select>
        </div>

        {loading ? <div style={{ color: '#747e92', padding: 40 }}>Loading communities...</div> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {colleges.map((college) => (
              <article className="college-card" key={college._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: '#eeedff', color: '#4f46e5', display: 'grid', placeItems: 'center' }}><Landmark size={24} /></div>
                  <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: '#16845b', background: '#eaf7f1', borderRadius: 999, padding: '6px 9px', fontSize: 11, fontWeight: 800 }}><CheckCircle2 size={13} /> Verified</span>
                </div>
                <h3 style={{ margin: '18px 0 8px', fontSize: 17 }}>{college.name}</h3>
                <p style={{ color: '#8791a3', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><MapPin size={14} /> {college.city}</p>
                <button className="btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => navigate(`/register?college=${college._id}`)}>Enter to Campus</button>
              </article>
            ))}
          </div>
        )}

        {!loading && colleges.length === 0 && (
          <div className="feature-card" style={{ textAlign: 'center', maxWidth: 560, margin: '30px auto' }}>
            <h3>Don't see your college?</h3><p style={{ color: '#747e92', marginBottom: 16 }}>Submit a request and our team will review it.</p>
            <button className="btn-secondary" onClick={() => setShowRequest(true)}>Request Your College</button>
          </div>
        )}
        {showRequest && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(15,23,42,.45)', display: 'grid', placeItems: 'center', padding: 20 }}>
            <form onSubmit={submitRequest} className="form-card" style={{ background: 'white', borderRadius: 18, padding: 24 }}>
              <h2 style={{ marginTop: 0 }}>Request a college</h2>
              {requestStatus === 'submitted' ? <p style={{ color: '#16845b' }}>Your college request was submitted.</p> : <>
                <label style={{ display: 'block', marginBottom: 12 }}>College name<input className="field" name="name" required /></label>
                <label style={{ display: 'block', marginBottom: 12 }}>City<input className="field" name="city" defaultValue="Pune" required /></label>
                <label style={{ display: 'block', marginBottom: 12 }}>Your email<input className="field" type="email" name="requesterEmail" required /></label>
                {requestStatus && <p style={{ color: '#b42318', fontSize: 13 }}>{requestStatus}</p>}
                <button className="btn-primary" type="submit" style={{ width: '100%' }}>Submit Request</button>
              </>}
              <button type="button" className="btn-secondary" style={{ width: '100%', marginTop: 10 }} onClick={() => setShowRequest(false)}>Close</button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
