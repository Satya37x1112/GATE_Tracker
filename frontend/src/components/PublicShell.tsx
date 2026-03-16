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
        <div className="app-shell min-h-screen">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[8%] h-72 w-72 rounded-full bg-emerald-500/[.08] blur-3xl" />
                <div className="absolute bottom-[0%] right-[5%] h-96 w-96 rounded-full bg-cyan-500/[.07] blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />
            </div>

            <header className="app-topbar relative z-10 border-b">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <Link to={user ? '/' : '/'} className="flex items-center gap-3">
                        <div className="glass-primary-button flex h-10 w-10 items-center justify-center rounded-2xl text-white">
                            <TreePine size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[17px] font-semibold tracking-tight">GateTracker</p>
                            <p className="theme-soft text-[10px] uppercase tracking-[0.18em]">Study Intelligence</p>
                        </div>
                    </Link>

                    <nav className="flex items-center gap-2 sm:gap-3">
                        {publicLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `public-nav-link px-3 py-2 text-[12px] font-medium transition-colors ${isActive ? 'active' : ''}`}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link
                            to="/"
                            className="glass-primary-button rounded-full px-4 py-2 text-[12px] font-semibold text-white transition-colors"
                        >
                            {user ? 'Dashboard' : 'Sign In'}
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
                {children}
            </main>

            <footer className="app-footer relative z-10 border-t">
                <div className="theme-soft mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-[12px] sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p>GateTracker helps GATE CSE aspirants track progress, discover curated resources, and study with more structure.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/about" className="hover:opacity-80">About Us</Link>
                        <Link to="/contact" className="hover:opacity-80">Contact Us</Link>
                        <a
                            href="https://github.com/Satya37x1112/GATE_Tracker"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:opacity-80"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
