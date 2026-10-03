import React, { useState } from 'react';
import { partBQuestions, QuestionB } from '../data/partBQuestions';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Flame, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speechHelper';

interface PartBViewProps {
  completedIds: number[];
  onToggleComplete: (id: number) => void;
  globalSearchQuery?: string;
}

export const PartBView: React.FC<PartBViewProps> = ({
  completedIds,
  onToggleComplete,
  globalSearchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [filterRocketOnly, setFilterRocketOnly] = useState<boolean>(false);
  const [filterTopFlameOnly, setFilterTopFlameOnly] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const handleToggleSpeak = (q: QuestionB) => {
    if (speakingId === q.id) {
      stopSpeech();
      setSpeakingId(null);
    } else {
      const pointsText = q.points.map((p, i) => `${i + 1}. ${p.title}। ${p.desc}`).join(' ');
      const textToRead = `প্রশ্ন ${q.id}: ${q.question}। ভূমিকা: ${q.intro}। মূল পয়েন্টসমূহ: ${pointsText}। উপসংহার: ${q.conclusion}`;
      speakText(
        textToRead,
        () => setSpeakingId(q.id),
        () => setSpeakingId(null)
      );
    }
  };

  const categories = ['সকল', 'রাষ্ট্রবিজ্ঞান', 'রাষ্ট্র', 'মৌলিক ধারণাসমূহ', 'রাষ্ট্র চিন্তাবিদগণ'];

  const filteredQuestions = partBQuestions.filter((q) => {
    if (selectedCategory !== 'সকল' && q.category !== selectedCategory) return false;
    if (filterRocketOnly && !q.isRocketSpecial) return false;
    if (filterTopFlameOnly && q.importance !== '🔥🔥🔥') return false;

    if (globalSearchQuery.trim()) {
      const query = globalSearchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchIntro = q.intro.toLowerCase().includes(query);
      const matchPoints = q.points.some((p) => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
      const matchYears = q.years.some((y) => y.toLowerCase().includes(query));
      if (!matchQ && !matchIntro && !matchPoints && !matchYears) return false;
    }

    return true;
  });

  const toggleExpand = (id: number) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((x) => x !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const handleToggleExpandAll = () => {
    if (expandAll) {
      setExpandedIds([]);
      setExpandAll(false);
    } else {
      setExpandedIds(filteredQuestions.map((q) => q.id));
      setExpandAll(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
              ৪ নম্বর প্রতি প্রশ্ন · পয়েন্টভিত্তিক পূর্ণাঙ্গ উত্তর
            </span>
            <span className="text-xs text-slate-500 font-medium">
              মোট ৬০টি বিশদ প্রশ্ন
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ২. খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি (Short Questions)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            পরীক্ষায় ৮টি প্রশ্ন থাকবে, যে কোনো ৫টির উত্তর দিতে হবে (৫ × ৪ = ২০ নম্বর)। ভূমিকা, মূল পয়েন্ট ও পরীক্ষোপযোগী উপসংহার।
          </p>
        </div>

        {/* Global Expand Toggle */}
        <button
          onClick={handleToggleExpandAll}
          className="self-start md:self-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          {expandAll ? 'সব বন্ধ করুন' : 'সব উত্তর খুলুন (Expand All)'}
        </button>
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
                ? 'bg-sky-100 border-sky-300 text-sky-900 font-bold'
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
            🔥 শীর্ষ গুরুত্বপূর্ণ
          </button>
        </div>
      </div>

      {/* Question Results Counter */}
      <div className="text-xs text-slate-500 px-1">
        প্রদর্শিত হচ্ছে: <strong>{filteredQuestions.length}</strong> / {partBQuestions.length}টি প্রশ্ন
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isDone = completedIds.includes(q.id);
          const isExpanded = expandAll || expandedIds.includes(q.id);

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border transition-all ${
                isDone 
                  ? 'border-emerald-200 bg-emerald-50/10' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header Accordion */}
              <div 
                onClick={() => toggleExpand(q.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      প্রশ্ন {q.id}
                    </span>
                    <span className="text-slate-500 font-medium">{q.category}</span>
                    {q.isRocketSpecial && (
                      <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                        ৯৯% রকেট
                      </span>
                    )}
                    <span className="text-rose-600 font-bold">{q.importance}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {q.question}
                  </h3>

                  {q.altQuestions && q.altQuestions.length > 0 && (
                    <div className="text-xs text-slate-500 italic">
                      অথবা: {q.altQuestions.join(' / ')}
                    </div>
                  )}

                  {/* Quick Metadata Preview */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span>এসেছে: <strong>{q.appearedCount} বার</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>সম্ভাব্যতা: <strong className="text-slate-700">{q.probability}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">সাজেশন পৃষ্ঠা: {q.pageRef}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSpeak(q);
                    }}
                    title={speakingId === q.id ? 'অডিও থামান' : 'প্রশ্ন ও উত্তর বাংলায় শুনুন'}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      speakingId === q.id
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'text-slate-400 hover:text-sky-600 hover:bg-sky-50'
                    }`}
                  >
                    {speakingId === q.id ? (
                      <VolumeX className="w-4 h-4 text-rose-600" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(q.id);
                    }}
                    title={isDone ? 'সম্পন্ন হিসেবে চিহ্নিত' : 'পড়া শেষ করুন'}
                    className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                    )}
                  </button>

                  <div className="p-1 rounded-md text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif-bn">
                  {/* ভূমিকা */}
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
                    <strong className="text-slate-900 font-sans font-bold block mb-1">ভূমিকা:</strong>
                    <p className="text-slate-700">{q.intro}</p>
                  </div>

                  {/* মূল আলোচনা ও পয়েন্টসমূহ */}
                  <div className="space-y-3 font-sans">
                    <strong className="text-slate-900 text-xs font-bold uppercase tracking-wider block text-slate-500">
                      মূল আলোচনা ও বিশ্লেষণ:
                    </strong>
                    <div className="grid grid-cols-1 gap-2.5">
                      {q.points.map((p, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-sky-50/40 border border-sky-100">
                          <h4 className="text-xs sm:text-sm font-bold text-sky-950 mb-1">
                            {idx + 1}. {p.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 font-serif-bn">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* উপসংহার */}
                  <div className="p-3 bg-amber-50/40 rounded-lg border border-amber-100 font-serif-bn">
                    <strong className="text-amber-900 font-sans font-bold block mb-1">উপসংহার:</strong>
                    <p className="text-slate-800">{q.conclusion}</p>
                  </div>

                  {/* Years Bar */}
                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-sans">
                    <strong>বিগত বছরসমূহ:</strong> {q.years.join(', ')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
