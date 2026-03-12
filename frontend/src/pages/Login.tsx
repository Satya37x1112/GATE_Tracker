import { useState } from 'react'
import { TreePine, LogIn, UserPlus } from 'lucide-react'

interface Props {
    onLogin: (user: { id: number; username: string; email: string }) => void
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
            ? `${API}/api/auth/login/`
            : `${API}/api/auth/register/`

        const body = mode === 'login'
            ? { username, password }
            : { username, email, password }

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                credentials: 'include',
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
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/[.03] rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[.02] rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/20">
                        <TreePine size={28} className="text-white" />
                    </div>
                    <h1 className="text-4xl tracking-tight text-white">GateTracker</h1>
                    <p className="text-[14px] text-white/25 mt-2">Study Intelligence for GATE 2027</p>
                </div>

                {/* Card */}
                <div className="bg-white/[.03] border border-white/[.06] rounded-2xl p-8 backdrop-blur-xl">
                    {/* Tabs */}
                    <div className="flex bg-white/[.04] rounded-xl p-1 mb-8">
                        <button
                            onClick={() => { setMode('login'); setError('') }}
                            className={`flex-1 py-2.5 rounded-lg text-[14px] font-medium transition-all ${mode === 'login'
                                ? 'bg-white/[.08] text-white shadow-sm'
                                : 'text-white/30 hover:text-white/50'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setMode('register'); setError('') }}
                            className={`flex-1 py-2.5 rounded-lg text-[14px] font-medium transition-all ${mode === 'register'
                                ? 'bg-white/[.08] text-white shadow-sm'
                                : 'text-white/30 hover:text-white/50'
                                }`}
                        >
                            Create Account
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-white/30 mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="johndoe"
                                required
                                autoFocus
                                className="w-full px-4 py-3 rounded-xl bg-white/[.04] border border-white/[.08] text-white text-[15px] placeholder:text-white/15 outline-none focus:border-white/20 focus:bg-white/[.06] transition-all"
                            />
                        </div>

                        {/* Email (register only) */}
                        {mode === 'register' && (
                            <div className="animate-slide-up">
                                <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-white/30 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/[.04] border border-white/[.08] text-white text-[15px] placeholder:text-white/15 outline-none focus:border-white/20 focus:bg-white/[.06] transition-all"
                                />
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-white/30 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl bg-white/[.04] border border-white/[.08] text-white text-[15px] placeholder:text-white/15 outline-none focus:border-white/20 focus:bg-white/[.06] transition-all"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="text-red-400 text-[13px] bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 animate-slide-up">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-[15px] font-medium transition-all disabled:opacity-40 active:scale-[.98] shadow-lg shadow-emerald-500/20"
                        >
                            {mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
                            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* OAuth Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/[.08]" />
                        <span className="text-[11px] font-medium tracking-wider uppercase text-white/20">or continue with</span>
                        <div className="flex-1 h-px bg-white/[.08]" />
                    </div>

                    {/* OAuth Buttons */}
                    <div className="flex gap-3">
                        <a
                            href={`${API}/api/auth/google/`}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/[.05] border border-white/[.08] hover:bg-white/[.08] hover:border-white/[.12] text-white text-[14px] font-medium transition-all active:scale-[.98]"
                        >
                            <GoogleIcon />
                            Google
                        </a>
                        <a
                            href={`${API}/api/auth/github/`}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/[.05] border border-white/[.08] hover:bg-white/[.08] hover:border-white/[.12] text-white text-[14px] font-medium transition-all active:scale-[.98]"
                        >
                            <GitHubIcon />
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-[12px] text-white/15 mt-8">
                    Made with ♥ by Satya Sarthak Manohari
                </p>
            </div>
        </div>
    )
}
