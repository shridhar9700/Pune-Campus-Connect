import { Link, useNavigate } from 'react-router-dom'
import { Bell, Bookmark, CalendarDays, ChevronDown, Compass, Heart, Home, Landmark, MessageCircle, Search, Settings, Trophy, Users, Megaphone, ShieldCheck, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const nav = [
  [Home, 'Home'], [Compass, 'Campus Feed'], [MessageCircle, 'Confessions'], [Trophy, 'Memes'], [ShieldCheck, 'Polls'],
  [CalendarDays, 'Events'], [Users, 'Clubs & Societies'], [GraduationIcon, 'Alumni Network'], [Megaphone, 'Mentorship'],
  [Landmark, 'Club Archives'], [Bookmark, 'Saved Posts']
]

function GraduationIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>
}

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const signOut = async () => { await logout(); navigate('/') }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, height: 42, textDecoration: 'none', color: '#17213a', fontWeight: 900, marginBottom: 18 }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: '#4f46e5', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Landmark size={18} /></span>
          <span className="brand-name">Campus Connect</span>
        </Link>
        {nav.map(([Icon, label], index) => {
          const NavIcon = Icon as typeof Home
          return <a className={`side-link ${index === 0 ? 'active' : ''}`} href="#" key={label as string}><NavIcon size={19} /><span className="label">{label as string}</span></a>
        })}
        <a className="side-link" href="#"><Settings size={19} /><span className="label">Settings</span></a>
        <button className="side-link" onClick={signOut} style={{ border: 0, background: 'transparent', width: '100%', marginTop: 8, cursor: 'pointer' }}><LogOut size={19} /><span className="label">Log out</span></button>
      </aside>

      <main className="dashboard-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={17} style={{ position: 'absolute', left: 14, top: 12, color: '#98a1b2' }} />
            <input className="field" style={{ height: 42, paddingLeft: 40, background: 'white' }} placeholder="Search campus" />
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 12, border: '1px solid #edf0f5', background: 'white', color: '#657087', display: 'grid', placeItems: 'center', position: 'relative' }}><Bell size={19} /><span style={{ position: 'absolute', width: 7, height: 7, borderRadius: '50%', background: '#ef4444', right: 8, top: 8 }} /></button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div><span style={{ color: '#8a94a7', fontSize: 13 }}>Good morning,</span><h1 style={{ margin: '2px 0', fontSize: 24, letterSpacing: -.5 }}>{user?.fullName || 'Campus member'}</h1></div>
          <button className="btn-primary" style={{ height: 42, padding: '0 14px' }}>Create Post</button>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
          {['For You', 'Latest', 'Trending', 'Campus News', 'Memes', 'Confessions', 'Discussions', 'Events'].map((filter, index) => <button key={filter} style={{ flexShrink: 0, height: 36, borderRadius: 999, border: index === 0 ? 0 : '1px solid #e6eaf1', background: index === 0 ? '#4f46e5' : 'white', color: index === 0 ? 'white' : '#69748a', padding: '0 13px', fontWeight: 800, fontSize: 12 }}>{filter}</button>)}
        </div>

        {user?.verificationStatus === 'pending' && <div style={{ background: '#fff7df', border: '1px solid #f3dda2', color: '#806a2b', borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 13 }}>Your college membership is pending verification. Some community features may be limited.</div>}

        <article className="post-card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#a9bcff,#7569df)' }} />
            <div><strong style={{ fontSize: 14 }}>Aarav Mehta</strong><div style={{ color: '#9aa3b4', fontSize: 12 }}>Computer Science · 18 min ago</div></div>
          </div>
          <p style={{ color: '#3f4a60', lineHeight: 1.65, margin: '16px 0' }}>Who is attending the AI and Data Science workshop this Friday? It would be great to form a study group afterward.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, color: '#7f8999', borderTop: '1px solid #f0f2f6', paddingTop: 12, fontSize: 13 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Heart size={17} /> 24</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={17} /> 8</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Bookmark size={17} /> Save</span>
          </div>
        </article>

        <article className="post-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: '#eeedff', color: '#4f46e5', display: 'grid', placeItems: 'center' }}><ShieldCheck size={20} /></div>
            <div><strong style={{ fontSize: 14 }}>Anonymous Student</strong><div style={{ color: '#9aa3b4', fontSize: 12 }}>Confession · 1 hr ago</div></div>
          </div>
          <p style={{ color: '#3f4a60', lineHeight: 1.65, margin: '16px 0' }}>What is the best way to approach seniors for guidance without feeling awkward? Every response helps.</p>
          <div style={{ color: '#7f8999', display: 'flex', gap: 22, borderTop: '1px solid #f0f2f6', paddingTop: 12, fontSize: 13 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Heart size={17} /> 41</span><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MessageCircle size={17} /> 12</span></div>
        </article>
      </main>

      <aside className="right-sidebar">
        <div style={{ background: 'white', border: '1px solid #edf0f5', borderRadius: 16, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}><strong style={{ fontSize: 14 }}>Your profile</strong><ChevronDown size={16} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#ffd2a8,#8da5ff)' }} /><div><strong style={{ fontSize: 13 }}>{user?.fullName}</strong><div style={{ color: '#98a1b2', fontSize: 11 }}>{user?.department || 'Student'}</div></div></div>
        </div>
        <div style={{ marginTop: 16 }}><strong style={{ fontSize: 14 }}>Upcoming</strong><div className="post-card" style={{ marginTop: 10, padding: 14 }}><span style={{ color: '#4f46e5', fontSize: 11, fontWeight: 900 }}>NOV 24 · 10:00 AM</span><h3 style={{ fontSize: 14, margin: '7px 0 4px' }}>AI & Data Science Workshop</h3><p style={{ color: '#8a94a7', fontSize: 12, margin: 0 }}>Computer Lab 2</p></div></div>
      </aside>

      <nav className="mobile-nav">
        {[Home, Compass, CalendarDays, Users, Bell].map((Icon, index) => <Icon key={index} size={20} color={index === 0 ? '#4f46e5' : '#8791a3'} />)}
      </nav>
    </div>
  )
}
