import React, { useState } from 'react';
import { partAQuestions, QuestionA } from '../data/partAQuestions';
import { CheckCircle, Circle, Eye, EyeOff, Flame, Search, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speechHelper';

interface PartAViewProps {
  completedIds: number[];
  onToggleComplete: (id: number) => void;
  globalSearchQuery?: string;
}

export const PartAView: React.FC<PartAViewProps> = ({
  completedIds,
  onToggleComplete,
  globalSearchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [filterRocketOnly, setFilterRocketOnly] = useState<boolean>(false);
  const [filterTopFlameOnly, setFilterTopFlameOnly] = useState<boolean>(false);
  const [hideAnswersMode, setHideAnswersMode] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const handleToggleSpeak = (q: QuestionA) => {
    if (speakingId === q.id) {
      stopSpeech();
      setSpeakingId(null);
    } else {
      const textToRead = `প্রশ্ন ${q.id}: ${q.question}। উত্তর: ${q.answer}`;
      speakText(
        textToRead,
        () => setSpeakingId(q.id),
        () => setSpeakingId(null)
      );
    }
  };

  const activeSearch = globalSearchQuery || localSearch;

  const categories = ['সকল', 'রাষ্ট্রবিজ্ঞান', 'রাষ্ট্র', 'মৌলিক ধারণাসমূহ', 'রাষ্ট্র চিন্তাবিদগণ'];

  const filteredQuestions = partAQuestions.filter((q) => {
    if (selectedCategory !== 'সকল' && q.category !== selectedCategory) return false;
    if (filterRocketOnly && !q.isRocketSpecial) return false;
    if (filterTopFlameOnly && q.importance !== '🔥🔥🔥') return false;

    if (activeSearch.trim()) {
      const query = activeSearch.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchA = q.answer.toLowerCase().includes(query);
      const matchYears = q.years.some((y) => y.toLowerCase().includes(query));
      const matchAlt = q.altQuestions?.some((alt) => alt.toLowerCase().includes(query));
      if (!matchQ && !matchA && !matchYears && !matchAlt) return false;
    }

    return true;
  });

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((x) => x !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              ১ নম্বর প্রতি প্রশ্ন · পূর্ণাঙ্গ প্রশ্ন ও সমাধান
            </span>
            <span className="text-xs text-slate-500 font-medium">
              মোট ৯৭টি সুনির্দিষ্ট প্রশ্ন
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ১. ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি (Brief Questions)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            পরীক্ষায় ১২টি প্রশ্ন থাকবে, যে কোনো ১০টির উত্তর দিতে হবে। উত্তর ১-২ লাইনের মধ্যে সুনির্দিষ্ট ও নির্ভুল হতে হবে।
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setHideAnswersMode(!hideAnswersMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              hideAnswersMode 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {hideAnswersMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{hideAnswersMode ? 'উত্তর দৃশ্যমান করুন' : 'সেলফ-টেস্ট মোড (উত্তর লুকান)'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Special Filters */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterRocketOnly(!filterRocketOnly)}
            className={`px-2.5 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
              filterRocketOnly
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            🚀 রকেট স্পেশাল (৯৯%)
          </button>
          <button
            onClick={() => setFilterTopFlameOnly(!filterTopFlameOnly)}
            className={`px-2.5 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
              filterTopFlameOnly
                ? 'bg-rose-100 border-rose-300 text-rose-900 font-bold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            🔥 শীর্ষ গুরুত্বপূর্ণ (🔥🔥🔥)
          </button>
        </div>
      </div>

      {/* Question Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>প্রদর্শিত হচ্ছে: <strong>{filteredQuestions.length}</strong> / {partAQuestions.length}টি প্রশ্ন</span>
        {activeSearch && (
          <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
            অনুসন্ধান: "{activeSearch}"
          </span>
        )}
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuestions.map((q) => {
          const isDone = completedIds.includes(q.id);
          const isRevealed = !hideAnswersMode || revealedIds.includes(q.id);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 shadow-xs transition-all relative ${
                isDone 
                  ? 'border-emerald-200 bg-emerald-50/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Top Row: ID, Category & Rocket Marker */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                    প্রশ্ন {q.id}
                  </span>
                  <span className="text-slate-500 font-medium">{q.category}</span>
                  {q.isRocketSpecial && (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      ৯৯% রকেট
                    </span>
                  )}
                </div>

                {/* Action buttons: Read Aloud & Mark as Done */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleToggleSpeak(q)}
                    title={speakingId === q.id ? 'অডিও থামান' : 'প্রশ্ন ও উত্তর বাংলায় শুনুন'}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      speakingId === q.id
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {speakingId === q.id ? (
                      <VolumeX className="w-4 h-4 text-rose-600" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Mark as Done Toggle */}
                  <button
                    onClick={() => onToggleComplete(q.id)}
                    title={isDone ? 'সম্পন্ন হিসেবে চিহ্নিত' : 'পড়া শেষ করুন'}
                    className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Main Question */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {q.question}
              </h3>

              {/* Alternative question phrasing if available */}
              {q.altQuestions && q.altQuestions.length > 0 && (
                <div className="mt-1 text-xs text-slate-500 italic">
                  বিকল্প রূপ: {q.altQuestions.join(' / ')}
                </div>
              )}

              {/* Answer Box */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                {isRevealed ? (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif-bn">
                    <strong className="text-amber-800 font-sans font-bold mr-1">উঃ</strong>
                    {q.answer}
                  </div>
                ) : (
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>উত্তর দেখতে ক্লিক করুন (স্মরণ করার চেষ্টা করুন)</span>
                  </button>
                )}
              </div>

              {/* Metadata Footer: Repeat Count, Years, Importance & Probability */}
              <div className="mt-3 pt-2 flex flex-wrap items-center justify-between gap-y-1.5 text-[11px] text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span>এসেছে: <strong>{q.appearedCount} বার</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>গুরুত্ব: <span className="text-rose-600 font-bold">{q.importance}</span></span>
                  <span aria-hidden="true">·</span>
                  <span>সম্ভাব্যতা: <strong className="text-slate-700">{q.probability}</strong></span>
                </div>
                <div className="text-[10px] text-slate-400">
                  সাজেশন পৃষ্ঠা: {q.pageRef}
                </div>
              </div>

              {/* Years List Badge */}
              {q.years.length > 0 && (
                <div className="mt-1.5 text-[10px] text-slate-500 truncate" title={q.years.join(', ')}>
                  বছর: {q.years.join(', ')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">কোনো প্রশ্ন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
        </div>
      )}
    </div>
  );
};
