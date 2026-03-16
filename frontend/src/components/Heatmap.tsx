import { useMemo } from 'react'
import { getChartTheme, isDarkTheme } from '../utils/theme'

interface Props {
    data: Record<string, number>
}

export default function Heatmap({ data }: Props) {
    const dark = isDarkTheme()
    const theme = getChartTheme(dark)
    const { weeks } = useMemo(() => {
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
        if (mins === 0) return theme.heatmapEmptyClass
        if (mins < 30) return theme.heatmapLowClass
        if (mins < 60) return theme.heatmapMidClass
        if (mins < 120) return theme.heatmapHighClass
        return theme.heatmapMaxClass
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
                <div className={`heatmap-cell ${theme.heatmapEmptyClass}`} />
                <div className={`heatmap-cell ${theme.heatmapLowClass}`} />
                <div className={`heatmap-cell ${theme.heatmapMidClass}`} />
                <div className={`heatmap-cell ${theme.heatmapHighClass}`} />
                <div className={`heatmap-cell ${theme.heatmapMaxClass}`} />
                <span>More</span>
            </div>
        </div>
    )
}
