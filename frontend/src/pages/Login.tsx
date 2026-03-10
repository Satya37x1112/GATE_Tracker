import { useState } from 'react'
import { TreePine, LogIn, UserPlus } from 'lucide-react'

interface Props {
    onLogin: (user: { id: number; username: string; email: string }) => void
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
                </div>

                {/* Footer */}
                <p className="text-center text-[12px] text-white/15 mt-8">
                    GATE Study Intelligence Tracker · v2.0
                </p>
            </div>
        </div>
    )
}
