import { useEffect } from 'react'
import { TreePine } from 'lucide-react'

interface Props {
    onLogin: (user: { id: number; username: string; email: string }) => void
}

export default function OAuthCallback({ onLogin }: Props) {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const oauth = params.get('oauth')

        if (oauth === 'success') {
            const user = {
                id: Number(params.get('id')),
                username: params.get('username') || '',
                email: params.get('email') || '',
            }
            localStorage.setItem('gate-user', JSON.stringify(user))
            onLogin(user)
            // Clean URL
            window.history.replaceState({}, '', '/')
        } else {
            // OAuth failed — redirect to login
            const error = params.get('error') || 'unknown'
            console.error('OAuth failed:', error)
            window.location.href = '/'
        }
    }, [onLogin])

    return (
        <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <TreePine size={24} className="text-white" />
            </div>
            <div className="w-5 h-5 border-2 border-white/20 border-t-emerald-400 rounded-full animate-spin" />
            <p className="text-white/30 text-sm">Signing you in…</p>
        </div>
    )
}
