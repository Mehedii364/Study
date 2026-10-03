import React, { useState } from 'react';
import { partCQuestions, QuestionC } from '../data/partCQuestions';
import { ChevronDown, ChevronUp, CheckCircle, Circle, Flame, Table as TableIcon, Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeech } from '../utils/speechHelper';

interface PartCViewProps {
  completedIds: number[];
  onToggleComplete: (id: number) => void;
  globalSearchQuery?: string;
}

export const PartCView: React.FC<PartCViewProps> = ({
  completedIds,
  onToggleComplete,
  globalSearchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [filterRocketOnly, setFilterRocketOnly] = useState<boolean>(false);
  const [filterTopFlameOnly, setFilterTopFlameOnly] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<number[]>([1]); // First question open by default
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const handleToggleSpeak = (q: QuestionC) => {
    if (speakingId === q.id) {
      stopSpeech();
      setSpeakingId(null);
    } else {
      const sectionsSummary = q.sections.map((s) => s.heading).join('। ');
      const textToRead = `রচনামূলক প্রশ্ন ${q.id}: ${q.question}। ভূমিকা: ${q.intro}। মূল অধ্যায় ও পয়েন্টসমূহ: ${sectionsSummary}। মূল্যায়ন ও উপসংহার: ${q.conclusion}`;
      speakText(
        textToRead,
        () => setSpeakingId(q.id),
        () => setSpeakingId(null)
      );
    }
  };

  const categories = ['সকল', 'রাষ্ট্রবিজ্ঞান', 'রাষ্ট্র', 'মৌলিক ধারণাসমূহ', 'রাষ্ট্র চিন্তাবিদগণ'];

  const filteredQuestions = partCQuestions.filter((q) => {
    if (selectedCategory !== 'সকল' && q.category !== selectedCategory) return false;
    if (filterRocketOnly && !q.isRocketSpecial) return false;
    if (filterTopFlameOnly && q.importance !== '🔥🔥🔥') return false;

    if (globalSearchQuery.trim()) {
      const query = globalSearchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchIntro = q.intro.toLowerCase().includes(query);
      const matchSec = q.sections.some((s) => s.heading.toLowerCase().includes(query) || s.content.toLowerCase().includes(query));
      const matchYears = q.years.some((y) => y.toLowerCase().includes(query));
      if (!matchQ && !matchIntro && !matchSec && !matchYears) return false;
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
              ১০ নম্বর প্রতি প্রশ্ন · উচ্চমান সম্পন্ন অ্যাকাডেমিক প্রবন্ধ ও ছক
            </span>
            <span className="text-xs text-slate-500 font-medium">
              মোট ৪৪টি বিস্তারিত ব্রড প্রশ্ন
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ৩. গ-বিভাগ: রচনামূলক প্রশ্নাবলি (Broad Questions)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            পরীক্ষায় ৮টি প্রশ্ন থাকবে, যে কোনো ৫টির উত্তর দিতে হবে (৫ × ১০ = ৫০ নম্বর)। তাত্ত্বিক সংজ্ঞা, বিস্তারিত পয়েন্ট, তুলনামূলক টেবিল ও সমকালীন প্রাসঙ্গিকতা।
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
                ? 'bg-indigo-100 border-indigo-300 text-indigo-900 font-bold'
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

      {/* Questions Counter */}
      <div className="text-xs text-slate-500 px-1">
        প্রদর্শিত হচ্ছে: <strong>{filteredQuestions.length}</strong> / {partCQuestions.length}টি প্রশ্ন
      </div>

      {/* Questions List */}
      <div className="space-y-5">
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
                className="p-4 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      রচনামূলক প্রশ্ন {q.id}
                    </span>
                    <span className="text-slate-500 font-medium">{q.category}</span>
                    {q.isRocketSpecial && (
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                        ৯৯% রকেট
                      </span>
                    )}
                    <span className="text-rose-600 font-bold">{q.importance}</span>
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  {q.altQuestions && q.altQuestions.length > 0 && (
                    <div className="text-xs text-slate-500 italic">
                      অথবা: {q.altQuestions.join(' / ')}
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <span>এসেছে: <strong>{q.appearedCount} বার</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>সম্ভাব্যতা: <strong className="text-slate-700">{q.probability}</strong></span>
                    <span aria-hidden="true">·</span>
                    {q.table && (
                      <span className="inline-flex items-center gap-1 text-indigo-700 font-medium bg-indigo-50 px-2 py-0.2 rounded">
                        <TableIcon className="w-3 h-3" /> ছক সংযোজিত
                      </span>
                    )}
                    <span className="text-slate-400">সাজেশন পৃষ্ঠা: {q.pageRef}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSpeak(q);
                    }}
                    title={speakingId === q.id ? 'অডিও থামান' : 'রচনামূলক সারসংক্ষেপ বাংলায় শুনুন'}
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

              {/* Full Academic Essay Body */}
              {isExpanded && (
                <div className="px-4 pb-6 sm:px-6 sm:pb-8 pt-3 border-t border-slate-100 space-y-5 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif-bn">
                  {/* ভূমিকা */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 font-sans font-bold block mb-1 text-sm">ভূমিকা:</strong>
                    <p className="text-slate-700 text-sm leading-relaxed">{q.intro}</p>
                  </div>

                  {/* মূল সেকশনসমূহ */}
                  <div className="space-y-4 font-sans">
                    {q.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 pb-1 border-b border-slate-200">
                          {sec.heading}
                        </h4>
                        <p className="text-slate-700 font-serif-bn text-xs sm:text-sm">
                          {sec.content}
                        </p>

                        {sec.bullets && sec.bullets.length > 0 && (
                          <div className="grid grid-cols-1 gap-2 pt-1">
                            {sec.bullets.map((b, bIdx) => (
                              <div key={bIdx} className="p-3 bg-indigo-50/30 rounded-lg border border-indigo-100">
                                <span className="font-bold text-indigo-950 block mb-0.5 text-xs sm:text-sm">
                                  {b.title}
                                </span>
                                <span className="text-slate-700 font-serif-bn text-xs sm:text-sm">
                                  {b.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ঐচ্ছিক তুলনামূলক ছক / টেবিল */}
                  {q.table && (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                        <TableIcon className="w-4 h-4 text-indigo-600" />
                        <span>{q.table.caption || 'তুলনামূলক সারসংক্ষেপ ছক'}</span>
                      </div>
                      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-xs">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                            <tr>
                              {q.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-3.5 py-2.5">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {q.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50/80">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-3.5 py-2 text-slate-700 font-serif-bn">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* সমালোচনা বা সমকালীন প্রাসঙ্গিকতা */}
                  {q.critiqueOrSignificance && (
                    <div className="p-3.5 bg-rose-50/50 rounded-lg border border-rose-100">
                      <strong className="text-rose-950 font-sans font-bold block mb-1">
                        সমালোচনা ও তাত্ত্বিক প্রাসঙ্গিকতা:
                      </strong>
                      <p className="text-slate-800">{q.critiqueOrSignificance}</p>
                    </div>
                  )}

                  {/* উপসংহার */}
                  <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-100">
                    <strong className="text-amber-950 font-sans font-bold block mb-1 text-sm">
                      উপসংহার:
                    </strong>
                    <p className="text-slate-800 text-sm">{q.conclusion}</p>
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
