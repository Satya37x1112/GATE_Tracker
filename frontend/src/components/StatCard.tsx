import type { ReactNode } from 'react'

interface Props {
    label: string
    value: string | number
    sub?: string
    icon: ReactNode
    iconBg: string
}

export default function StatCard({ label, value, sub, icon, iconBg }: Props) {
    return (
        <div className="stat-card group">
            <div className="flex items-center justify-between mb-4">
                <span className="section-label">{label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
            </div>
            <p className="text-[28px] font-semibold tracking-tight leading-none">{value}</p>
            {sub && <p className="text-[12px] opacity-30 mt-1.5">{sub}</p>}
        </div>
    )
}
