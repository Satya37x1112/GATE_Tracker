import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'

/**
 * Break Reminder: shows a toast notification every 50 minutes
 * reminding the user to take a break.
 */
export default function BreakReminder() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(true)
            // Auto-hide after 15 seconds
            setTimeout(() => setVisible(false), 15000)
        }, 50 * 60 * 1000) // 50 minutes

        return () => clearInterval(interval)
    }, [])

    if (!visible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm">
                <AlertTriangle size={22} className="flex-shrink-0" />
                <div>
                    <p className="font-bold">Time for a break! ☕</p>
                    <p className="text-sm opacity-90">You've been studying for 50 minutes. Rest for 10 min.</p>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="ml-3 text-white/70 hover:text-white text-xl leading-none"
                >
                    ×
                </button>
            </div>
        </div>
    )
}
