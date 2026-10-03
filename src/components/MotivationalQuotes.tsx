import React, { useState, useEffect, useRef } from 'react';
import { motivationalQuotesList, PhilosophyQuote } from '../data/motivationalQuotes';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Pause, 
  Play, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  Share2,
  Bookmark
} from 'lucide-react';
import { toBnDigit } from './PomodoroTimer';

export const MotivationalQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('সব');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['সব', 'রাষ্ট্রচিন্তা', 'রাজনৈতিক দর্শন', 'স্বাধীনতা ও অধিকার', 'জ্ঞান ও নীতিশাস্ত্র', 'অধ্যয়ন ও সাধনা'];

  const filteredQuotes = filterCategory === 'সব' 
    ? motivationalQuotesList 
    : motivationalQuotesList.filter(q => q.category === filterCategory);

  const currentQuote = filteredQuotes[currentIndex % filteredQuotes.length] || motivationalQuotesList[0];

  // Auto-rotation every 10 seconds
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, filteredQuotes.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const handleRandom = () => {
    const nextIdx = Math.floor(Math.random() * filteredQuotes.length);
    setCurrentIndex(nextIdx);
  };

  const handleCopy = () => {
    const textToCopy = `"${currentQuote.quoteBn}"\n— ${currentQuote.author} (${currentQuote.authorEn})\n${currentQuote.bookRef ? `গ্রন্থ: ${currentQuote.bookRef}` : ''}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700/80 p-5 sm:p-7 shadow-lg">
      
      {/* Decorative Top Accent Glow */}
      <div className="absolute top-0 right-1/4 -mt-10 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-10 w-64 h-64 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

      {/* Header bar: Title & Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-wide">
              রাষ্ট্রচিন্তা ও দার্শনিক অনুপ্রেরণা (Philosophical Quotes)
            </h3>
            <p className="text-[11px] text-slate-400">
              রাষ্ট্রবিজ্ঞানের মহান চিন্তাবিদদের কালজয়ী উক্তি ও তত্ত্ব
            </p>
          </div>
        </div>

        {/* Action button controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="px-2 py-0.5 rounded-md bg-white/10 text-amber-300 font-mono text-[11px] font-bold">
            {toBnDigit((currentIndex % filteredQuotes.length) + 1)} / {toBnDigit(filteredQuotes.length)}
          </span>

          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            title={isPlaying ? 'অটো-স্লাইড বিরতি' : 'অটো-স্লাইড চালু'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={handleRandom}
            title="দৈবচয়ন (Shuffle)"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            title="উক্তিটি কপি করুন"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <div className="h-4 w-px bg-white/20 mx-0.5" />

          <button
            onClick={handlePrev}
            title="পূর্ববর্তী উক্তি"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNext}
            title="পরবর্তী উক্তি"
            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Quote Card Body */}
      <div className="relative z-10 pt-4 space-y-4">
        
        {/* Quote text and Giant Quote icon */}
        <div className="flex gap-3">
          <Quote className="w-8 h-8 text-amber-400/30 shrink-0 transform -scale-x-100" />
          
          <div className="space-y-2 flex-1">
            <blockquote className="text-base sm:text-lg lg:text-xl font-bold font-serif-bn text-white leading-relaxed tracking-wide">
              “{currentQuote.quoteBn}”
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-300 italic font-sans leading-relaxed">
              "{currentQuote.quoteEn}"
            </p>
          </div>
        </div>

        {/* Academic context & Author badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
          
          {/* Author Details */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-xs font-serif-bn shrink-0">
              {currentQuote.author.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-sm sm:text-base font-serif-bn">
                  {currentQuote.author}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  ({currentQuote.authorEn})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                <span>{currentQuote.title}</span>
                <span>·</span>
                <span>{currentQuote.era}</span>
                {currentQuote.bookRef && (
                  <>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      📖 {currentQuote.bookRef}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Academic Context Tag */}
          <div className="sm:max-w-xs text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-xl p-2.5 leading-snug">
            <span className="text-amber-400 font-bold block mb-0.5">💡 পরীক্ষার প্রাসঙ্গিকতা:</span>
            {currentQuote.context}
          </div>

        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none text-[11px]">
          <span className="text-slate-400 font-semibold shrink-0 mr-1">বিষয়ভিত্তিক ফিল্টার:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                filterCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
