import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TreePine, LogIn, UserPlus } from 'lucide-react'
import SEO from '../components/SEO'
import PublicShell from '../components/PublicShell'
import { API_BASE, fetchWithCsrf } from '../api/api'

interface Props {
    onLogin: (user: { id: number; username: string; email: string }) => void
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    )
}

function GitHubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    )
}

export default function Login({ onLogin }: Props) {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const url = mode === 'login'
            ? `${API_BASE}/api/auth/login/`
            : `${API_BASE}/api/auth/register/`

        const body = mode === 'login'
            ? { username, password }
            : { username, email, password }

        try {
            const res = await fetchWithCsrf(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.error || 'Something went wrong')
            } else {
                localStorage.setItem('gate-user', JSON.stringify(data.user))
                onLogin(data.user)
            }
        } catch {
            setError('Cannot connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <PublicShell>
            <SEO
                title="Free GATE CSE Study Tracker"
                description="Track GATE CSE study sessions, review analytics, use curated subject resources, and prepare with a transparent, education-focused study platform."
                path="/"
            />

            <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
                <div className="order-2 space-y-4 lg:order-1">
                    <div>
                        <p className="section-label mb-3">Study With Structure</p>
                        <h1 className="text-[42px] leading-none tracking-tight text-white">GateTracker</h1>
                        <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65">
                            A focused workspace for GATE CSE preparation with session tracking, analytics, curated study
                            resources, and a public feedback loop for continuous improvement.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="glass-panel p-5">
                            <p className="text-[15px] font-semibold">Original, relevant study data</p>
                            <p className="mt-2 text-[13px] leading-6 text-white/60">Your dashboard is built from your own study sessions and progress history, not recycled content.</p>
                        </div>
                        <div className="glass-panel p-5">
                            <p className="text-[15px] font-semibold">Clear public trust pages</p>
                            <p className="mt-2 text-[13px] leading-6 text-white/60">Visitors can now review the product context on the <Link to="/about" className="text-emerald-300 hover:text-emerald-200">About Us</Link> and <Link to="/contact" className="text-emerald-300 hover:text-emerald-200">Contact Us</Link> pages before signing in.</p>
                        </div>
                        <div className="glass-panel p-5">
                            <p className="text-[15px] font-semibold">Fresh improvements over time</p>
                            <p className="mt-2 text-[13px] leading-6 text-white/60">Resources, feedback workflows, and product features are updated iteratively as the platform evolves.</p>
                        </div>
                    </div>
                </div>

                <div className="order-1 w-full lg:order-2">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-10 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/20">
                                <TreePine size={28} className="text-white" />
                            </div>
                            <h2 className="text-4xl tracking-tight text-white">Welcome back</h2>
                            <p className="mt-2 text-[14px] text-white/25">Study Intelligence for GATE 2027</p>
                        </div>

                        <div className="rounded-2xl border border-white/[.06] bg-white/[.03] p-8 backdrop-blur-xl">
                            <div className="mb-8 flex rounded-xl bg-white/[.04] p-1">
                                <button
                                    onClick={() => { setMode('login'); setError('') }}
                                    className={`flex-1 rounded-lg py-2.5 text-[14px] font-medium transition-all ${mode === 'login'
                                        ? 'bg-white/[.08] text-white shadow-sm'
                                        : 'text-white/30 hover:text-white/50'
                                        }`}
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => { setMode('register'); setError('') }}
                                    className={`flex-1 rounded-lg py-2.5 text-[14px] font-medium transition-all ${mode === 'register'
                                        ? 'bg-white/[.08] text-white shadow-sm'
                                        : 'text-white/30 hover:text-white/50'
                                        }`}
                                >
                                    Create Account
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/30">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="johndoe"
                                        required
                                        autoFocus
                                        className="w-full rounded-xl border border-white/[.08] bg-white/[.04] px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-white/15 focus:border-white/20 focus:bg-white/[.06]"
                                    />
                                </div>

                                {mode === 'register' && (
                                    <div className="animate-slide-up">
                                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/30">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full rounded-xl border border-white/[.08] bg-white/[.04] px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-white/15 focus:border-white/20 focus:bg-white/[.06]"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/30">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        className="w-full rounded-xl border border-white/[.08] bg-white/[.04] px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-white/15 focus:border-white/20 focus:bg-white/[.06]"
                                    />
                                </div>

                                {error && (
                                    <div className="animate-slide-up rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[13px] text-red-400">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 py-3.5 text-[15px] font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 disabled:opacity-40 active:scale-[.98]"
                                >
                                    {mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
                                    {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/[.08]" />
                                <span className="text-[11px] font-medium uppercase tracking-wider text-white/20">or continue with</span>
                                <div className="h-px flex-1 bg-white/[.08]" />
                            </div>

                            <div className="flex gap-3">
                                <a
                                    href={`${API_BASE}/api/auth/google/`}
                                    className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-white/[.08] bg-white/[.05] py-3 text-[14px] font-medium text-white transition-all hover:border-white/[.12] hover:bg-white/[.08] active:scale-[.98]"
                                >
                                    <GoogleIcon />
                                    Google
                                </a>
                                <a
                                    href={`${API_BASE}/api/auth/github/`}
                                    className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-white/[.08] bg-white/[.05] py-3 text-[14px] font-medium text-white transition-all hover:border-white/[.12] hover:bg-white/[.08] active:scale-[.98]"
                                >
                                    <GitHubIcon />
                                    GitHub
                                </a>
                            </div>
                        </div>

                        <p className="mt-8 text-center text-[12px] text-white/15">
                            Made with ♥ by Satya Sarthak Manohari
                        </p>
                    </div>
                </div>
            </div>
        </PublicShell>
    )
}
