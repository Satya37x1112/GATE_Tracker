import { useEffect, useState } from 'react'
import { Menu, Sun, Moon, Flame } from 'lucide-react'

interface User {
    id: number
    username: string
    email: string
}

interface Props {
    onMenuClick: () => void
    dark: boolean
    onToggleDark: () => void
    user: User
}

export default function TopBar({ onMenuClick, dark, onToggleDark, user }: Props) {
    const [streak, setStreak] = useState(0)
    const [dateStr, setDateStr] = useState('')

    useEffect(() => {
        setDateStr(new Date().toLocaleDateString('en-IN', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        }))
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/dashboard/`)
            .then(r => r.json())
            .then(d => setStreak(d.current_streak))
            .catch(() => { })
    }, [])

    const bg = dark
        ? 'bg-[#09090b]/80 backdrop-blur-xl border-white/[.04]'
        : 'bg-white/80 backdrop-blur-xl border-black/[.04]'

    return (
        <header className={`sticky top-0 z-30 border-b px-6 py-3.5 flex items-center justify-between ${bg}`}>
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-white/5">
                    <Menu size={18} />
                </button>
                <span className={`hidden md:block text-[13px] ${dark ? 'text-white/30' : 'text-black/30'}`}>
                    {dateStr}
                </span>
            </div>

            <div className="flex items-center gap-3">
                {/* Welcome */}
                <span className={`hidden sm:block text-[13px] ${dark ? 'text-white/25' : 'text-black/25'}`}>
                    Hi, {user.username}
                </span>

                {/* Streak */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${dark ? 'bg-orange-500/8 text-orange-400/80' : 'bg-orange-50 text-orange-600'
                    }`}>
                    <Flame size={13} />
                    <span>{streak} day{streak !== 1 ? 's' : ''}</span>
                </div>

                {/* Dark/Light toggle */}
                <button
                    onClick={onToggleDark}
                    className={`p-2 rounded-full transition-all ${dark ? 'hover:bg-white/5 text-white/30' : 'hover:bg-black/5 text-black/30'
                        }`}
                >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>
        </header>
    )
}
