import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import BreakReminder from './BreakReminder'

interface User {
    id: number
    username: string
    email: string
}

interface Props {
    user: User
    onLogout: () => void
}

export default function Layout({ user, onLogout }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dark, setDark] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('gate-dark')
        if (saved !== null) setDark(saved === 'true')
    }, [])

    useEffect(() => {
        localStorage.setItem('gate-dark', String(dark))
        document.documentElement.className = dark ? 'dark' : 'light'
    }, [dark])

    return (
        <div className={`min-h-screen flex ${dark ? 'bg-[#09090b] text-[#fafafa]' : 'bg-[#fafafa] text-[#09090b]'}`}>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} dark={dark} onLogout={onLogout} user={user} />

            <div className="flex-1 flex flex-col lg:ml-[260px] min-h-screen">
                <TopBar
                    onMenuClick={() => setSidebarOpen(true)}
                    dark={dark}
                    onToggleDark={() => setDark(d => !d)}
                    user={user}
                />
                <main className="flex-1 px-6 py-8 md:px-10 md:py-10 animate-fade-in max-w-[1400px]">
                    <Outlet />
                </main>
                <footer className="border-t border-white/[.04] px-6 py-4 text-[11px] opacity-25">
                    <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <p>
                            Made with ♥ by <span className="font-medium opacity-70">Satya Sarthak Manohari</span>
                        </p>
                        <div className="flex items-center justify-center gap-4 sm:justify-end">
                            <Link to="/about" className="hover:opacity-70">About Us</Link>
                            <Link to="/contact" className="hover:opacity-70">Contact Us</Link>
                        </div>
                    </div>
                </footer>
            </div>

            <BreakReminder />
        </div>
    )
}
