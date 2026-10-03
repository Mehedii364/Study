import React, { useState, useEffect } from 'react';
import { Users, Eye, TrendingUp, Sparkles, BookOpen, Clock } from 'lucide-react';
import { toBnDigit } from './PomodoroTimer';

export const VisitorCounter: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  // Live simulated online concurrent learners (oscillates gently between 32 and 54)
  const [onlineCount, setOnlineCount] = useState(() => {
    return Math.floor(Math.random() * 15) + 36;
  });

  // Total cumulative readers
  const [totalReaders, setTotalReaders] = useState(() => {
    try {
      const stored = localStorage.getItem('nu_total_readers_count');
      if (stored) {
        const val = parseInt(stored, 10);
        const updated = val + 1;
        localStorage.setItem('nu_total_readers_count', String(updated));
        return updated;
      }
      const initial = 14890;
      localStorage.setItem('nu_total_readers_count', String(initial));
      return initial;
    } catch {
      return 14890;
    }
  });

  // Today's reading count
  const [todayReads] = useState(() => {
    const daySeed = new Date().getDate() * 17;
    return 840 + (daySeed % 320);
  });

  // Live reader count fluctuation every 8-15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return Math.min(Math.max(next, 28), 64);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div 
        title="বর্তমানে জাতীয় বিশ্ববিদ্যালয়ের বিভিন্ন কলেজের শিক্ষার্থীরা এই পোর্টালে অধ্যয়ন করছেন"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold font-mono">{toBnDigit(onlineCount)}</span>
        <span>জন অনলাইনে</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Active Readers */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                বর্তমানে অধ্যয়নরত: <span className="text-emerald-600 font-mono text-base font-extrabold">{toBnDigit(onlineCount)}</span> জন শিক্ষার্থী
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              জাতীয় বিশ্ববিদ্যালয়ের ডিগ্রি ও অনার্স ১ম বর্ষের পরীক্ষার্থীরা একসাথে রিভিশন দিচ্ছেন
            </p>
          </div>
        </div>

        {/* Right: Counter Stats Strip */}
        <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">আজকের পাঠক</span>
            <span className="font-bold text-slate-800 text-sm font-mono flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              {toBnDigit(todayReads)} জন
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div>
            <span className="text-slate-400 block text-[10px]">মোট পাঠক ও ভিজিটর</span>
            <span className="font-bold text-slate-900 text-sm sm:text-base font-mono flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              {toBnDigit(totalReaders.toLocaleString())}+
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
