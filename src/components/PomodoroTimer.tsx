import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  Timer, 
  Flame, 
  Coffee, 
  Sun, 
  CheckCircle2,
  Sparkles,
  Settings,
  ChevronDown
} from 'lucide-react';

export type PomodoroMode = 'study' | 'shortBreak' | 'longBreak';

interface TimerPreset {
  label: string;
  minutes: number;
}

const STUDY_PRESETS: TimerPreset[] = [
  { label: '২৫ মিনিট (প্রমিত)', minutes: 25 },
  { label: '৪৫ মিনিট (গভীর মনোযোগ)', minutes: 45 },
  { label: '৫০ মিনিট (মক টেস্ট)', minutes: 50 },
];

const SHORT_BREAK_PRESETS: TimerPreset[] = [
  { label: '৫ মিনিট', minutes: 5 },
  { label: '১০ মিনিট', minutes: 10 },
];

const LONG_BREAK_PRESETS: TimerPreset[] = [
  { label: '১৫ মিনিট', minutes: 15 },
  { label: '২০ মিনিট', minutes: 20 },
];

// Bangla digit converter
export const toBnDigit = (num: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bnDigits[Number(d)]);
};

const MOTIVATIONAL_TIPS = [
  'ধারাবাহিক ২৫ মিনিট গভীর মনোযোগ দীর্ঘ ঘণ্টার এলোমেলো পড়ার চেয়ে বহুগুণ কার্যকর!',
  'প্লেটো ও এরিস্টটলের মূল দর্শনগুলোর মধ্যে তুলনামূলক পার্থক্যগুলো মনে করার চেষ্টা করুন।',
  'রচনামূলক প্রশ্নের উত্তরের ক্ষেত্রে ৩-৪টি শক্তিশালী পয়েন্ট ও উপসংহার গুছিয়ে রাখুন।',
  'বিরতির সময় এক গ্লাস পানি পান করুন এবং চোখের ওপর চাপ কমাতে দূরে কোথাও তাকান।',
  'প্রতিটি পড়ার সেশনের পর বিগত বছরের বোর্ড প্রশ্ন সমাধানের দক্ষতা নিশ্চিত করুন।'
];

export const PomodoroTimer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PomodoroMode>('study');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('nu_pomo_completed_sessions');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [totalStudyMinutes, setTotalStudyMinutes] = useState(() => {
    try {
      const saved = localStorage.getItem('nu_pomo_total_minutes');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Play gentle celebratory chime using Web Audio API
  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        
        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.8);
      });
    } catch (e) {
      console.warn('Audio play error', e);
    }
  };

  // Close on click outside popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Main countdown ticker
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playSound();

      if (mode === 'study') {
        const newCount = completedSessions + 1;
        const newTotalMins = totalStudyMinutes + durationMinutes;
        setCompletedSessions(newCount);
        setTotalStudyMinutes(newTotalMins);
        try {
          localStorage.setItem('nu_pomo_completed_sessions', String(newCount));
          localStorage.setItem('nu_pomo_total_minutes', String(newTotalMins));
        } catch {
          // ignore localStorage error
        }

        // Auto prompt next stage
        setTipIndex((prev) => (prev + 1) % MOTIVATIONAL_TIPS.length);
        if (newCount % 4 === 0) {
          switchMode('longBreak', 15);
        } else {
          switchMode('shortBreak', 5);
        }
      } else {
        // Break ended, switch back to study
        switchMode('study', 25);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode, completedSessions, totalStudyMinutes, durationMinutes]);

  // Mode switch helper
  const switchMode = (newMode: PomodoroMode, mins: number) => {
    setMode(newMode);
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durationMinutes * 60);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'study') {
      switchMode('shortBreak', 5);
    } else {
      switchMode('study', 25);
    }
  };

  const handleResetStats = () => {
    if (window.confirm('আপনি কি আজকের রিভিশন সেশন ট্র্যাকার রিসেট করতে চান?')) {
      setCompletedSessions(0);
      setTotalStudyMinutes(0);
      try {
        localStorage.removeItem('nu_pomo_completed_sessions');
        localStorage.removeItem('nu_pomo_total_minutes');
      } catch {
        // ignore
      }
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  const totalDurationSeconds = durationMinutes * 60;
  const progressPercent = totalDurationSeconds > 0 
    ? Math.round(((totalDurationSeconds - timeLeft) / totalDurationSeconds) * 100) 
    : 0;

  // Mode thematic colors
  const modeConfig = {
    study: {
      label: 'পড়ার সেশন',
      icon: Flame,
      color: 'from-amber-500 to-rose-600',
      badge: 'bg-rose-100 text-rose-800 border-rose-300',
      progressColor: '#e11d48',
      pillBg: 'bg-rose-950/80 border-rose-800 text-rose-200'
    },
    shortBreak: {
      label: 'সংক্ষিপ্ত বিরতি',
      icon: Coffee,
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      progressColor: '#059669',
      pillBg: 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
    },
    longBreak: {
      label: 'দীর্ঘ বিরতি',
      icon: Sun,
      color: 'from-blue-500 to-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      progressColor: '#4f46e5',
      pillBg: 'bg-indigo-950/80 border-indigo-800 text-indigo-200'
    }
  }[mode];

  const CurrentModeIcon = modeConfig.icon;

  return (
    <div className="relative inline-block" ref={popoverRef}>
      
      {/* ----------------- COMPACT FLOATING TOOLBAR BUTTON ----------------- */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        title="পোমোডোরো স্টাডি টাইমার ও সেশন ট্র্যাকার"
        className={`px-3 py-2 rounded-xl text-xs font-bold shadow-lg border flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
          isRunning 
            ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white border-rose-300/40 animate-pulse' 
            : 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          {isRunning && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRunning ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
        </span>

        <CurrentModeIcon className="w-3.5 h-3.5 text-amber-300" />
        
        {/* Dynamic Live Digits */}
        <span className="tracking-wider font-mono font-bold">
          {toBnDigit(formattedMinutes)}:{toBnDigit(formattedSeconds)}
        </span>

        {/* Small Mode indicator badge */}
        <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-slate-100">
          {mode === 'study' ? 'পড়া' : 'বিরতি'}
        </span>
      </button>

      {/* ----------------- EXPANDED POPOVER CARD ----------------- */}
      {isOpen && (
        <div 
          className="absolute bottom-12 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 text-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ maxWidth: 'calc(100vw - 24px)' }}
        >
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-xs">
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  রিভিশন টাইমার (Pomodoro)
                </h4>
                <p className="text-[11px] text-slate-500">
                  মনোযোগ ও রিভিশন ট্র্যাকার
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled((prev) => !prev)}
                title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl my-3 text-xs">
            <button
              onClick={() => switchMode('study', 25)}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                mode === 'study'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>পড়া</span>
            </button>
            <button
              onClick={() => switchMode('shortBreak', 5)}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                mode === 'shortBreak'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>বিরতি</span>
            </button>
            <button
              onClick={() => switchMode('longBreak', 15)}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                mode === 'longBreak'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>দীর্ঘ বিরতি</span>
            </button>
          </div>

          {/* Central Circular Dial / Countdown Display */}
          <div className="flex flex-col items-center justify-center py-2 space-y-1">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Circular SVG Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100"
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={modeConfig.progressColor}
                  strokeWidth="7"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              {/* Inside Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold tracking-tight font-mono text-slate-900">
                  {toBnDigit(formattedMinutes)}:{toBnDigit(formattedSeconds)}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  {isRunning ? 'চলমান সেশন' : 'বিরতিতে রয়েছে'}
                </span>
                <span className="text-[10px] text-slate-400">
                  অগ্রগতি {toBnDigit(progressPercent)}%
                </span>
              </div>
            </div>

            {/* Quick Preset Selector Buttons */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              {(mode === 'study' ? STUDY_PRESETS : mode === 'shortBreak' ? SHORT_BREAK_PRESETS : LONG_BREAK_PRESETS).map((p) => (
                <button
                  key={p.minutes}
                  onClick={() => switchMode(mode, p.minutes)}
                  className={`px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    durationMinutes === p.minutes
                      ? 'bg-slate-900 text-white border-slate-900 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {toBnDigit(p.minutes)}মি
                </button>
              ))}
            </div>
          </div>

          {/* Action Controls (Play, Reset, Skip) */}
          <div className="flex items-center justify-center gap-3 pt-3 pb-2">
            <button
              onClick={handleReset}
              title="পুনরায় শুরু করুন"
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleStartPause}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>বিরতি দিন</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>শুরু করুন</span>
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              title="পরবর্তী ধাপে যান"
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Session Statistics Bar */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-slate-500 block text-[10px]">আজকের অগ্রগতি:</span>
                <span className="font-bold text-slate-900">
                  {toBnDigit(completedSessions)}টি সেশন · {toBnDigit(totalStudyMinutes)} মিনিট
                </span>
              </div>
            </div>
            {completedSessions > 0 && (
              <button
                onClick={handleResetStats}
                className="text-[10px] text-slate-400 hover:text-rose-600 hover:underline cursor-pointer"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Study Tip Box */}
          <div className="mt-2.5 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              {MOTIVATIONAL_TIPS[tipIndex]}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
