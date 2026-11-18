import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users, CalendarDays, Trophy, ShieldCheck, Landmark } from 'lucide-react'

export function LandingPage() {
  return (
    <div>
      <header style={{ height: 78, borderBottom: '1px solid #edf0f5', background: 'rgba(255,255,255,.94)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="container-shell" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#17213a', fontWeight: 900, fontSize: 20 }}>
            <span style={{ width: 38, height: 38, borderRadius: 11, background: '#4f46e5', color: 'white', display: 'grid', placeItems: 'center' }}><Landmark size={20} /></span>
            Campus Connect
          </Link>
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#about">About</a>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="btn-primary" to="/colleges">Join Your Campus</Link>
          </nav>
        </div>
      </header>

      <main>
        <section style={{ background: 'linear-gradient(180deg, #fff 0%, #fafbff 100%)' }}>
          <div className="container-shell hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, background: '#eeedff', color: '#4f46e5', padding: '8px 12px', fontSize: 13, fontWeight: 800 }}>
                <GraduationCap size={16} /> Built for college communities
              </div>
              <h1 className="hero-title">Your College. <span>Your People.</span> Your Community.</h1>
              <p style={{ maxWidth: 560, color: '#667087', lineHeight: 1.75, fontSize: 18, marginBottom: 28 }}>
                One place to connect with students, discover events, share moments, and stay connected with your college forever.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link className="btn-primary" to="/colleges">Join Your Campus <ArrowRight size={17} /></Link>
                <a className="btn-secondary" href="#features">Explore Features</a>
              </div>
              <div style={{ display: 'flex', gap: 28, marginTop: 34, color: '#7a8497', fontSize: 13 }}>
                <span><strong style={{ display: 'block', color: '#17213a', fontSize: 18 }}>College-first</strong>Verified communities</span>
                <span><strong style={{ display: 'block', color: '#17213a', fontSize: 18 }}>Forever</strong>Knowledge preserved</span>
              </div>
            </div>

            <div className="feed-preview" aria-label="Campus feed preview">
              <div style={{ color: 'rgba(255,255,255,.75)', display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <strong style={{ color: 'white' }}>Fergusson College</strong><span>Campus Feed</span>
              </div>
              <div className="preview-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#ff9f6e,#ef5da8)' }} />
                  <div><strong style={{ fontSize: 13 }}>Aarav Mehta</strong><div style={{ color: '#9aa3b4', fontSize: 11 }}>Student · 12 min ago</div></div>
                </div>
                <p style={{ margin: '14px 0', color: '#3f4a60', lineHeight: 1.5, fontSize: 14 }}>The NSS planning team just wrapped up the orientation. Thank you to everyone who showed up! 🌱</p>
                <div style={{ height: 118, borderRadius: 12, background: 'linear-gradient(135deg,#bdd6ff,#aeb6f8)', display: 'grid', placeItems: 'center', color: '#4f46e5', fontWeight: 800 }}>Campus moments</div>
              </div>
              <div className="preview-card secondary">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <strong>Hackathon registrations</strong><span style={{ color: '#4f46e5', fontWeight: 800 }}>Today</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" style={{ padding: '82px 0', background: '#fff' }}>
          <div className="container-shell">
            <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 42px' }}>
              <span style={{ color: '#4f46e5', fontWeight: 900, fontSize: 13, letterSpacing: 1.2 }}>EVERYTHING CAMPUS</span>
              <h2 style={{ fontSize: 38, letterSpacing: -1.5, margin: '10px 0' }}>A single place for every campus moment</h2>
              <p style={{ color: '#747e92', lineHeight: 1.7 }}>Stay informed, find your people, and preserve the experiences that shape college life.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
              {[
                [Users, 'Campus Community', 'Verified, college-exclusive feeds for conversations and confessions.'],
                [CalendarDays, 'Events & Activities', 'Discover events, RSVP, and never miss what is happening.'],
                [Trophy, 'Clubs & Societies', 'Meet clubs, join communities, and follow official announcements.'],
                [ShieldCheck, 'Alumni & Mentorship', 'Learn from seniors and alumni who have been where you are.']
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof Users
                return <article className="feature-card" key={title as string}><div className="feature-icon"><FeatureIcon size={21} /></div><h3 style={{ margin: '18px 0 8px', fontSize: 17 }}>{title as string}</h3><p style={{ color: '#747e92', lineHeight: 1.65, fontSize: 14 }}>{text as string}</p></article>
              })}
            </div>
          </div>
        </section>

        <section id="about" style={{ padding: '72px 0', background: '#17213a', color: 'white' }}>
          <div className="container-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
            <div><span style={{ color: '#aaa6ff', fontWeight: 900, fontSize: 13 }}>NO EXPERIENCE SHOULD DISAPPEAR</span><h2 style={{ maxWidth: 620, fontSize: 38, lineHeight: 1.15, margin: '12px 0' }}>Preserve club knowledge and stay connected after graduation.</h2></div>
            <Link className="btn-primary" style={{ background: 'white', color: '#4f46e5' }} to="/colleges">Create your account <ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
    </div>
  )
}
