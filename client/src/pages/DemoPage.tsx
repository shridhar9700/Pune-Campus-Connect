import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, CalendarDays, Check, Compass, Heart, Landmark,
  MessageCircle, PartyPopper, Send, ShieldCheck, Sparkles, Users
} from 'lucide-react'

type FeedCategory = 'Campus life' | 'Questions' | 'Confessions' | 'Events'
type FeedPost = {
  id: string
  category: FeedCategory
  author: string
  detail: string
  message: string
  color: string
  likes: number
  comments: string[]
}

const initialPosts: FeedPost[] = [
  {
    id: 'welcome-week',
    category: 'Campus life',
    author: 'Mira Shah',
    detail: 'Design Society · Sample post',
    message: 'We made a little campus map for first-years with the quiet study spots, best chai breaks, and the shady route to the library. What should we add next?',
    color: '#f0a77a',
    likes: 18,
    comments: ['The garden benches near the arts block!']
  },
  {
    id: 'workshop',
    category: 'Events',
    author: 'Robotics Club',
    detail: 'Club announcement · Sample post',
    message: 'Curious about building your first robot? Join our beginner-friendly workshop this Saturday. No experience needed, just bring your curiosity.',
    color: '#7c79df',
    likes: 12,
    comments: []
  },
  {
    id: 'study-group',
    category: 'Questions',
    author: 'Dev Kulkarni',
    detail: 'Computer Science · Sample post',
    message: 'Anyone up for a low-pressure study group before the data structures quiz? I can bring notes; we can meet at the library cafe.',
    color: '#55a98c',
    likes: 9,
    comments: ['Count me in!']
  },
  {
    id: 'confession',
    category: 'Confessions',
    author: 'Anonymous student',
    detail: 'Anonymous confession · Sample post',
    message: 'It took me a whole semester to say hi to the people in my lab group. If you feel like everyone already has their circle, you are not the only one.',
    color: '#a18adc',
    likes: 24,
    comments: []
  }
]

const categories = ['For you', 'Campus life', 'Questions', 'Confessions', 'Events'] as const
const events = [
  { title: 'Build your first robot', host: 'Robotics Club', date: 'Saturday · 11:00 AM', place: 'Innovation Lab', icon: Sparkles, color: '#eeedff' },
  { title: 'Open mic on the quad', host: 'Campus Arts Collective', date: 'Wednesday · 5:30 PM', place: 'Central Quad', icon: PartyPopper, color: '#fff3e8' },
  { title: 'Peer study circle', host: 'Student Learning Hub', date: 'Thursday · 4:00 PM', place: 'Library, level 2', icon: Users, color: '#eaf7f1' }
]
const clubs = [
  { name: 'Robotics Club', description: 'Build, tinker, and learn together — all experience levels welcome.', members: 'Engineering · Sample club' },
  { name: 'Campus Arts Collective', description: 'A welcoming space for music, theatre, visual arts, and creative ideas.', members: 'Arts & culture · Sample club' },
  { name: 'Green Campus Crew', description: 'Small campus sustainability projects with a big community spirit.', members: 'Community · Sample club' }
]
const pollOptions = ['More hands-on workshops', 'Outdoor movie night', 'A campus-wide game day']
const initialPollVotes = [18, 26, 12]

export function DemoPage() {
  const [activeView, setActiveView] = useState<'feed' | 'events' | 'clubs'>('feed')
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('For you')
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [comments, setComments] = useState<Record<string, string[]>>({})
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [openComments, setOpenComments] = useState<string[]>([])
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null)
  const [pollSubmitted, setPollSubmitted] = useState(false)
  const [rsvps, setRsvps] = useState<string[]>([])
  const [followedClubs, setFollowedClubs] = useState<string[]>([])

  const visiblePosts = initialPosts.filter((post) =>
    activeCategory === 'For you' || post.category === activeCategory
  )

  const submitComment = (event: FormEvent<HTMLFormElement>, postId: string) => {
    event.preventDefault()
    const text = commentDrafts[postId]?.trim()
    if (!text) return
    setComments((current) => ({ ...current, [postId]: [...(current[postId] || []), text] }))
    setCommentDrafts((current) => ({ ...current, [postId]: '' }))
  }

  const toggleItem = (items: string[], setItems: (next: string[]) => void, value: string) => {
    setItems(items.includes(value) ? items.filter((item) => item !== value) : [...items, value])
  }

  const pollTotal = initialPollVotes.reduce((sum, votes) => sum + votes, 0) + (pollSubmitted ? 1 : 0)

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div className="demo-header-inner">
          <Link to="/" className="demo-brand"><span className="demo-brand-mark"><Landmark size={19} /></span>Campus Connect</Link>
          <div className="demo-header-actions">
            <span className="demo-mode-badge"><Sparkles size={14} /> Guest demo</span>
            <Link to="/login" className="demo-login-link">Log in</Link>
            <Link to="/colleges" className="btn-primary demo-create-link">Create account <ArrowRight size={16} /></Link>
          </div>
        </div>
      </header>

      <main className="demo-shell">
        <section className="demo-welcome">
          <div>
            <Link className="demo-back-link" to="/"><ArrowLeft size={15} /> Back to home</Link>
            <div className="demo-eyebrow"><Compass size={15} /> EXPLORE CAMPUS CONNECT</div>
            <h1>Campus life, <span>in the mix.</span></h1>
            <p>Explore a sample campus community. Try the feed, vote in a poll, and discover events and clubs — no sign-up required.</p>
          </div>
          <div className="demo-sample-note"><ShieldCheck size={18} /><span><strong>Sample experience</strong><br />All people, posts, events, clubs, and poll responses here are fictional examples.</span></div>
        </section>

        <div className="demo-workspace">
          <aside className="demo-navigation" aria-label="Demo sections">
            <span className="demo-nav-label">YOUR COMMUNITY</span>
            <button type="button" className={`demo-nav-item ${activeView === 'feed' ? 'active' : ''}`} onClick={() => setActiveView('feed')}><Compass size={18} /> Campus feed</button>
            <button type="button" className={`demo-nav-item ${activeView === 'events' ? 'active' : ''}`} onClick={() => setActiveView('events')}><CalendarDays size={18} /> Events</button>
            <button type="button" className={`demo-nav-item ${activeView === 'clubs' ? 'active' : ''}`} onClick={() => setActiveView('clubs')}><Users size={18} /> Clubs & societies</button>
            <div className="demo-nav-signup">
              <div className="demo-nav-signup-icon"><Sparkles size={17} /></div>
              <strong>Make it your campus</strong>
              <p>Create an account to join your verified college community.</p>
              <Link to="/colleges">Get started <ArrowRight size={14} /></Link>
            </div>
          </aside>

          <section className="demo-content" aria-live="polite">
            {activeView === 'feed' && (
              <>
                <div className="demo-section-heading">
                  <div><span className="demo-label">SAMPLE COMMUNITY</span><h2>Campus feed</h2></div>
                  <span className="demo-campus-chip"><Landmark size={14} /> Example campus</span>
                </div>
                <div className="demo-category-tabs" role="tablist" aria-label="Filter sample posts">
                  {categories.map((category) => (
                    <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
                  ))}
                </div>
                {visiblePosts.map((post) => {
                  const isLiked = likedPosts.includes(post.id)
                  const postComments = [...post.comments, ...(comments[post.id] || [])]
                  const areCommentsOpen = openComments.includes(post.id)
                  return (
                    <article className="demo-post-card" key={post.id}>
                      <div className="demo-post-author">
                        <div className="demo-avatar" style={{ background: post.color }}>{post.author === 'Anonymous student' ? <ShieldCheck size={19} /> : post.author.slice(0, 1)}</div>
                        <div><strong>{post.author}</strong><span>{post.detail}</span></div>
                        <span className="demo-sample-tag">SAMPLE</span>
                      </div>
                      <p className="demo-post-message">{post.message}</p>
                      <div className="demo-post-actions">
                        <button type="button" className={isLiked ? 'liked' : ''} aria-pressed={isLiked} onClick={() => toggleItem(likedPosts, setLikedPosts, post.id)}><Heart size={17} fill={isLiked ? 'currentColor' : 'none'} /> {post.likes + (isLiked ? 1 : 0)} <span>sample reactions</span></button>
                        <button type="button" aria-expanded={areCommentsOpen} onClick={() => toggleItem(openComments, setOpenComments, post.id)}><MessageCircle size={17} /> {postComments.length} <span>sample replies</span></button>
                      </div>
                      {areCommentsOpen && (
                        <div className="demo-comments">
                          {postComments.map((comment, index) => <p key={`${post.id}-${index}`}><strong>{index >= post.comments.length ? 'You' : 'Sample student'}:</strong> {comment}</p>)}
                          <form onSubmit={(event) => submitComment(event, post.id)}>
                            <input aria-label="Write a sample comment" value={commentDrafts[post.id] || ''} onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Add a temporary comment..." maxLength={240} />
                            <button type="submit" aria-label="Post comment"><Send size={16} /></button>
                          </form>
                          <span className="demo-temporary-hint">Your comment stays in this demo session only.</span>
                        </div>
                      )}
                    </article>
                  )
                })}
                {activeCategory === 'For you' && (
                  <article className="demo-poll-card">
                    <div className="demo-post-author">
                      <div className="demo-poll-icon"><Sparkles size={19} /></div>
                      <div><strong>Plan the next campus hangout</strong><span>Sample community poll · Demo responses</span></div>
                      <span className="demo-sample-tag">SAMPLE</span>
                    </div>
                    <p className="demo-poll-question">What would you be most excited to join?</p>
                    <div className="demo-poll-options">
                      {pollOptions.map((option, index) => {
                        const votes = initialPollVotes[index] + (pollSubmitted && selectedPoll === index ? 1 : 0)
                        const percentage = Math.round((votes / pollTotal) * 100)
                        return (
                          <button key={option} type="button" className={`demo-poll-option ${selectedPoll === index ? 'chosen' : ''} ${pollSubmitted ? 'results' : ''}`} aria-pressed={selectedPoll === index} onClick={() => !pollSubmitted && setSelectedPoll(index)}>
                            {pollSubmitted && <span className="demo-poll-bar" style={{ width: `${percentage}%` }} />}
                            <span className="demo-poll-option-label">{option}</span>
                            {pollSubmitted && <span className="demo-poll-percent">{percentage}%</span>}
                          </button>
                        )
                      })}
                    </div>
                    <div className="demo-poll-footer">
                      {pollSubmitted ? <span><Check size={15} /> Your vote is temporary · {pollTotal} sample responses</span> : <span>{pollTotal} sample responses</span>}
                      <button type="button" className="demo-vote-button" disabled={selectedPoll === null || pollSubmitted} onClick={() => setPollSubmitted(true)}>{pollSubmitted ? 'Vote recorded' : 'Vote'}</button>
                    </div>
                  </article>
                )}
              </>
            )}

            {activeView === 'events' && (
              <>
                <div className="demo-section-heading"><div><span className="demo-label">SAMPLE COMMUNITY</span><h2>Find your next thing</h2></div><span className="demo-campus-chip"><CalendarDays size={14} /> Example events</span></div>
                <p className="demo-section-intro">Browse sample campus events and try a temporary RSVP. These events are examples, not real listings.</p>
                <div className="demo-discovery-list">
                  {events.map((event) => {
                    const EventIcon = event.icon
                    const attending = rsvps.includes(event.title)
                    return <article className="demo-discovery-card" key={event.title}>
                      <div className="demo-discovery-icon" style={{ background: event.color }}><EventIcon size={22} /></div>
                      <div className="demo-discovery-info"><span className="demo-label">{event.host}</span><h3>{event.title}</h3><p><CalendarDays size={14} /> {event.date}</p><p><Landmark size={14} /> {event.place}</p></div>
                      <button type="button" className={`demo-action-button ${attending ? 'confirmed' : ''}`} aria-pressed={attending} onClick={() => toggleItem(rsvps, setRsvps, event.title)}>{attending ? <><Check size={15} /> Going</> : 'Interested'}</button>
                    </article>
                  })}
                </div>
              </>
            )}

            {activeView === 'clubs' && (
              <>
                <div className="demo-section-heading"><div><span className="demo-label">SAMPLE COMMUNITY</span><h2>Find your people</h2></div><span className="demo-campus-chip"><Users size={14} /> Example clubs</span></div>
                <p className="demo-section-intro">Explore sample student clubs and try following one. Your choice is temporary and visible only in this demo.</p>
                <div className="demo-discovery-list">
                  {clubs.map((club) => {
                    const following = followedClubs.includes(club.name)
                    return <article className="demo-club-card" key={club.name}>
                      <div className="demo-club-icon"><Users size={22} /></div>
                      <div className="demo-discovery-info"><span className="demo-label">{club.members}</span><h3>{club.name}</h3><p>{club.description}</p></div>
                      <button type="button" className={`demo-action-button ${following ? 'confirmed' : ''}`} aria-pressed={following} onClick={() => toggleItem(followedClubs, setFollowedClubs, club.name)}>{following ? <><Check size={15} /> Following</> : 'Follow club'}</button>
                    </article>
                  })}
                </div>
              </>
            )}
          </section>

          <aside className="demo-side-panel">
            <div className="demo-side-card demo-promo-card"><div className="demo-promo-icon"><Users size={19} /></div><span className="demo-label">YOUR NEXT STEP</span><h3>Bring your campus together.</h3><p>Sign up to meet classmates, join real clubs, and keep up with your college.</p><Link className="btn-primary" to="/colleges">Create your account <ArrowRight size={15} /></Link><Link className="demo-side-login" to="/login">Already a member? Log in</Link></div>
            <div className="demo-side-card"><div className="demo-sample-heading"><strong>What you can try</strong><span className="demo-sample-tag">DEMO</span></div><div className="demo-feature-list"><span><Heart size={16} /> React and comment</span><span><Sparkles size={16} /> Vote in a sample poll</span><span><CalendarDays size={16} /> Explore sample events</span><span><Users size={16} /> Follow sample clubs</span></div><p className="demo-private-note"><ShieldCheck size={15} /> Demo activity is temporary and is not sent to an account.</p></div>
          </aside>
        </div>
        <footer className="demo-footer"><span>Campus Connect · Interactive guest demo</span><Link to="/colleges">Ready to join? Create an account <ArrowRight size={14} /></Link></footer>
      </main>
    </div>
  )
}
