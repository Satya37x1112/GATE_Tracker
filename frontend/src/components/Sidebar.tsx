import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard, Timer, BarChart3, History, Download, X, LogOut, TrendingUp, BookOpen, MessageSquare, MessagesSquare, Newspaper
} from 'lucide-react'
import { getExportUrl } from '../api/api'

interface User {
    id: number
    username: string
    email: string
}

interface Props {
    open: boolean
    onClose: () => void
    onLogout: () => void
    user: User
}

const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/start-study', label: 'Start Study', icon: Timer },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/progress', label: 'Progress', icon: TrendingUp },
    { to: '/assistant', label: 'Vistra AI', icon: MessageSquare },
    { to: '/feedback', label: 'Feedback', icon: MessagesSquare },
    { to: '/resources', label: 'Resources', icon: BookOpen },
    { to: '/news-blogs', label: 'News & Blogs', icon: Newspaper },
    { to: '/history', label: 'History', icon: History },
]

export default function Sidebar({ open, onClose, onLogout, user }: Props) {
    const overlay = open ? 'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden' : 'hidden'
    const sidebarCls = `app-sidebar fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col border-r transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`

    return (
        <>
            <div className={overlay} onClick={onClose} />

            <aside className={sidebarCls}>
                {/* Logo */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-inherit">
                    <div className="flex items-center gap-3">
                        <img src="/logo.svg" alt="GateTracker Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                        <div>
                            <span className="text-[15px] font-semibold tracking-tight">GateTracker</span>
                            <span className="theme-soft block text-[10px] tracking-[0.15em] uppercase">
                                Study Intelligence
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="theme-ghost-button lg:hidden p-1.5 rounded-lg">
                        <X size={16} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-0.5">
                    <p className="section-label px-3 mb-3">Navigation</p>
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            onClick={onClose}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <l.icon size={16} strokeWidth={1.8} />
                            {l.label}
                        </NavLink>
                    ))}

                    <div className="theme-divider-bg h-px my-4 mx-3" />
                    <p className="section-label px-3 mb-3">Actions</p>

                    <a href={getExportUrl()} className="nav-link" target="_blank" rel="noopener noreferrer">
                        <Download size={16} strokeWidth={1.8} />
                        Export CSV
                    </a>
                </nav>

                {/* User + Logout */}
                <div className={`px-4 py-4 border-t border-inherit`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="theme-surface-soft theme-muted w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-[13px] font-medium leading-tight">{user.username}</p>
                                <p className="theme-soft text-[11px]">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="theme-ghost-button p-2 rounded-lg transition-all hover:text-red-500 dark:hover:text-red-400"
                            title="Sign out"
                        >
                            <LogOut size={15} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
