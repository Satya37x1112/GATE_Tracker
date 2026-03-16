import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { TreePine } from 'lucide-react'

interface User {
    id: number
    username: string
    email: string
}

interface Props {
    children: ReactNode
    user?: User | null
}

const publicLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
]

export default function PublicShell({ children, user }: Props) {
    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[8%] h-72 w-72 rounded-full bg-emerald-500/[.07] blur-3xl" />
                <div className="absolute bottom-[0%] right-[5%] h-96 w-96 rounded-full bg-cyan-500/[.05] blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_35%)]" />
            </div>

            <header className="relative z-10 border-b border-white/[.06] bg-[#09090b]/80 backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <Link to={user ? '/' : '/'} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
                            <TreePine size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[17px] font-semibold tracking-tight">GateTracker</p>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">Study Intelligence</p>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-2 sm:gap-3">
                        {publicLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `rounded-full px-3 py-2 text-[12px] font-medium transition-colors ${isActive ? 'bg-white/[.08] text-white' : 'text-white/55 hover:bg-white/[.05] hover:text-white'}`}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/"
                            className="rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
                        >
                            {user ? 'Dashboard' : 'Sign In'}
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
                {children}
            </main>

            <footer className="relative z-10 border-t border-white/[.06] bg-black/20">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-[12px] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p>GateTracker helps GATE CSE aspirants track progress, discover curated resources, and study with more structure.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/about" className="hover:text-white/70">About Us</Link>
                        <Link to="/contact" className="hover:text-white/70">Contact Us</Link>
                        <a
                            href="https://github.com/Satya37x1112/GATE_Tracker"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-white/70"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
