import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import StartStudy from './pages/StartStudy'
import Analytics from './pages/Analytics'
import History from './pages/History'
import Progress from './pages/Progress'
import Resources from './pages/Resources'
import Assistant from './pages/Assistant'
import Login from './pages/Login'
import OAuthCallback from './pages/OAuthCallback'

interface User {
  id: number
  username: string
  email: string
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const stored = localStorage.getItem('gate-user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { /* ignore */ }
    }
    setChecking(false)
  }, [])

  const handleLogin = (u: User) => {
    setUser(u)
    localStorage.setItem('gate-user', JSON.stringify(u))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('gate-user')
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/logout/`, { method: 'POST', credentials: 'include' }).catch(() => { })
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* OAuth callback — always accessible, even if not logged in */}
        <Route path="/oauth/callback" element={<OAuthCallback onLogin={handleLogin} />} />

        {/* If not logged in, show login on all other routes */}
        {!user ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/start-study" element={<StartStudy />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/history" element={<History />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}
