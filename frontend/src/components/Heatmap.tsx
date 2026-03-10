import { useMemo } from 'react'

interface Props {
    data: Record<string, number>
}

export default function Heatmap({ data }: Props) {
    const { weeks, months } = useMemo(() => {
        const today = new Date()
        const cells: { date: string; mins: number; dayOfWeek: number }[] = []

        for (let i = 363; i >= 0; i--) {
            const d = new Date(today)
            d.setDate(d.getDate() - i)
            const key = d.toISOString().slice(0, 10)
            cells.push({
                date: key,
                mins: data[key] || 0,
                dayOfWeek: d.getDay(),
            })
        }

        const weeks: typeof cells[] = []
        let currentWeek: typeof cells = []
        for (const cell of cells) {
            if (cell.dayOfWeek === 0 && currentWeek.length > 0) {
                weeks.push(currentWeek)
                currentWeek = []
            }
            currentWeek.push(cell)
        }
        if (currentWeek.length > 0) weeks.push(currentWeek)

        const monthLabels: { label: string; col: number }[] = []
        const seen = new Set<string>()
        weeks.forEach((week, wi) => {
            const first = week[0]
            const m = first.date.slice(0, 7)
            if (!seen.has(m)) {
                seen.add(m)
                monthLabels.push({
                    label: new Date(first.date).toLocaleString('en', { month: 'short' }),
                    col: wi,
                })
            }
        })

        return { weeks, months: monthLabels }
    }, [data])

    function getColor(mins: number): string {
        if (mins === 0) return 'bg-white/[.03]'
        if (mins < 30) return 'bg-emerald-900/40'
        if (mins < 60) return 'bg-emerald-700/50'
        if (mins < 120) return 'bg-emerald-500/70'
        return 'bg-emerald-400/90'
    }

    return (
        <div className="chart-card">
            <p className="section-label mb-1">Activity</p>
            <p className="text-lg font-semibold tracking-tight mb-4">Study Heatmap</p>

            <div className="flex gap-[3px] overflow-x-auto pb-2">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] text-[9px] opacity-25 pr-1">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                        <div key={i} className="h-[11px] flex items-center">{d}</div>
                    ))}
                </div>

                {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                        {wi === 0 && week[0].dayOfWeek > 0 &&
                            Array.from({ length: week[0].dayOfWeek }).map((_, i) => (
                                <div key={`pad-${i}`} className="heatmap-cell" />
                            ))
                        }
                        {week.map(cell => (
                            <div
                                key={cell.date}
                                className={`heatmap-cell ${getColor(cell.mins)}`}
                                title={`${cell.date}: ${Math.round(cell.mins)}m`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3 text-[9px] opacity-25">
                <span>Less</span>
                <div className="heatmap-cell bg-white/[.03]" />
                <div className="heatmap-cell bg-emerald-900/40" />
                <div className="heatmap-cell bg-emerald-700/50" />
                <div className="heatmap-cell bg-emerald-500/70" />
                <div className="heatmap-cell bg-emerald-400/90" />
                <span>More</span>
            </div>
        </div>
    )
}
