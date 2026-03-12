import { useState, useRef, useCallback } from 'react'
import { Play, Pause, Square, Check } from 'lucide-react'
import SEO from '../components/SEO'
import { saveSession } from '../api/api'

const SUBJECTS = [
    { code: 'DSA', name: 'Data Structures & Algorithms' },
    { code: 'OS', name: 'Operating Systems' },
    { code: 'COA', name: 'Computer Organization' },
    { code: 'DBMS', name: 'Database Management' },
    { code: 'DL', name: 'Digital Logic' },
    { code: 'MATHS', name: 'Engineering Mathematics' },
    { code: 'CN', name: 'Computer Networks' },
    { code: 'TOC', name: 'Theory of Computation' },
    { code: 'CD', name: 'Compiler Design' },
    { code: 'SE', name: 'Software Engineering' },
    { code: 'APT', name: 'Aptitude' },
]
const TYPES = ['Theory', 'Practice', 'Lecture', 'Revision']

function pad(n: number) { return String(n).padStart(2, '0') }

export default function StartStudy() {
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState('')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const secondsRef = useRef(0)

    const [subject, setSubject] = useState('DSA')
    const [studyType, setStudyType] = useState('Theory')
    const [questions, setQuestions] = useState(0)
    const [lectureMin, setLectureMin] = useState(0)
    const [notes, setNotes] = useState(false)

    const start = useCallback(() => {
        if (running) return
        setRunning(true)
        setShowForm(false)
        intervalRef.current = setInterval(() => {
            secondsRef.current += 1
            setSeconds(secondsRef.current)
        }, 1000)
    }, [running])

    const pause = useCallback(() => {
        if (!running) return
        setRunning(false)
        if (intervalRef.current) clearInterval(intervalRef.current)
    }, [running])

    const stop = useCallback(() => {
        if (secondsRef.current === 0) return
        setRunning(false)
        if (intervalRef.current) clearInterval(intervalRef.current)
        setShowForm(true)
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await saveSession({
                subject,
                study_type: studyType,
                duration_seconds: secondsRef.current,
                questions_solved: questions,
                lecture_minutes: lectureMin,
                notes_created: notes,
            })
            setToast('Session saved ✓')
            secondsRef.current = 0; setSeconds(0); setShowForm(false)
            setQuestions(0); setLectureMin(0); setNotes(false)
            setTimeout(() => setToast(''), 3000)
        } catch {
            setToast('Error saving')
            setTimeout(() => setToast(''), 3000)
        } finally { setSaving(false) }
    }

    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return (
        <div className="max-w-xl mx-auto space-y-10">
            <SEO title="Study Timer" description="Start a focused GATE CSE study session. Track time, questions solved, and notes for DSA, OS, DBMS, CN, TOC & more." path="/start-study" />
            {/* Header */}
            <div className="text-center">
                <h1 className="text-[32px] font-semibold tracking-tight">Study Timer</h1>
                <p className="text-[14px] opacity-25 mt-1">Focus. Track. Grow.</p>
            </div>

            {/* Timer */}
            <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
                {/* Outer ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                    <circle cx="128" cy="128" r="120" fill="none"
                        stroke={running ? 'rgba(34,197,94,.15)' : 'rgba(255,255,255,.04)'}
                        strokeWidth="2" />
                    {running && (
                        <circle cx="128" cy="128" r="120" fill="none"
                            stroke="rgba(34,197,94,.4)" strokeWidth="2"
                            strokeDasharray="754" strokeDashoffset={754 - (seconds % 60) / 60 * 754}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
                    )}
                </svg>
                <span className="text-[52px] font-light tracking-tight tabular-nums font-mono">
                    {pad(h)}:{pad(m)}:{pad(s)}
                </span>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
                <button onClick={start} disabled={running}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-medium transition-all disabled:opacity-20 active:scale-[.97]">
                    <Play size={14} /> {seconds > 0 && !showForm ? 'Resume' : 'Start'}
                </button>
                <button onClick={pause} disabled={!running}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-white/[.06] hover:bg-white/[.1] text-[13px] font-medium transition-all disabled:opacity-20 active:scale-[.97]">
                    <Pause size={14} /> Pause
                </button>
                <button onClick={stop} disabled={seconds === 0}
                    className="flex items-center gap-2 px-7 py-3 rounded-full bg-white/[.06] hover:bg-red-500/20 text-[13px] font-medium transition-all disabled:opacity-20 active:scale-[.97]">
                    <Square size={14} /> Stop
                </button>
            </div>

            {/* Save form */}
            {showForm && (
                <div className="animate-slide-up glass-panel p-6 space-y-5">
                    <div className="text-center">
                        <p className="text-[15px] font-semibold">Save Session</p>
                        <p className="text-[13px] opacity-25 mt-0.5">Duration: {pad(h)}:{pad(m)}:{pad(s)}</p>
                    </div>

                    <div>
                        <label className="section-label block mb-1.5">Subject</label>
                        <select value={subject} onChange={e => setSubject(e.target.value)} className="form-input">
                            {SUBJECTS.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="section-label block mb-1.5">Study Type</label>
                        <select value={studyType} onChange={e => setStudyType(e.target.value)} className="form-input">
                            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="section-label block mb-1.5">Questions Solved</label>
                            <input type="number" value={questions} onChange={e => setQuestions(+e.target.value)} min={0} className="form-input" />
                        </div>
                        <div>
                            <label className="section-label block mb-1.5">Lecture Minutes</label>
                            <input type="number" value={lectureMin} onChange={e => setLectureMin(+e.target.value)} min={0} className="form-input" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" checked={notes} onChange={e => setNotes(e.target.checked)}
                            className="w-4 h-4 rounded bg-white/5 border-white/10 text-emerald-500" />
                        <label className="text-[13px] opacity-50">Notes created</label>
                    </div>

                    <button onClick={handleSave} disabled={saving}
                        className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-medium transition-all disabled:opacity-50 active:scale-[.98]">
                        <Check size={14} className="inline mr-1.5" />
                        {saving ? 'Saving…' : 'Save Session'}
                    </button>
                </div>
            )}

            {toast && (
                <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-full text-[13px] font-medium shadow-xl animate-slide-up">
                    {toast}
                </div>
            )}
        </div>
    )
}
