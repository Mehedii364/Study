import React, { useState } from 'react';
import { mcqBank, McqFact } from '../data/mcqBank';
import { Eye, EyeOff, Search, CheckCircle2, Bookmark } from 'lucide-react';

interface McqBankViewProps {
  globalSearchQuery?: string;
}

export const McqBankView: React.FC<McqBankViewProps> = ({ globalSearchQuery = '' }) => {
  const [selectedCat, setSelectedCat] = useState<string>('সকল');
  const [hideAnswers, setHideAnswers] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const categories = [
    'সকল',
    'জনক ও চিন্তাবিদ',
    'গ্রন্থ ও রচয়িতা',
    'ঐতিহাসিক সাল ও বিপ্লব',
    'বিখ্যাত উক্তি',
    'তত্ত্ব ও মূলশব্দ',
    'সংখ্যাতাত্ত্বিক ও কাঠামো'
  ];

  const filteredFacts = mcqBank.filter((item) => {
    if (selectedCat !== 'সকল' && item.category !== selectedCat) return false;

    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase();
      const matchQ = item.question.toLowerCase().includes(q);
      const matchA = item.answer.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchQ && !matchA && !matchCat) return false;
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              প্রশ্ন → সরাসরি সঠিক উত্তর · কোনো অপশন নয়
            </span>
            <span className="text-xs text-slate-500 font-medium">
              মোট ৬৪টি অপরিহার্য তথ্যকণিকা
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ৪. MCQ ও তথ্যকোষ মাস্টার ব্যাংক (Direct Answer Bank)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            কে, কী, কখন, কোথায়, কোন সালে, কোন গ্রন্থে, কোন গ্রন্থের লেখক, কোন প্রতিষ্ঠান ও গুরুত্বপূর্ণ ঐতিহাসিক তথ্যসমূহ।
          </p>
        </div>

        <button
          onClick={() => setHideAnswers(!hideAnswers)}
          className={`self-start md:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            hideAnswers 
              ? 'bg-amber-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {hideAnswers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>{hideAnswers ? 'সকল উত্তর উন্মুক্ত করুন' : 'সেলফ-কুইজ মোড (উত্তর লুকান)'}</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of MCQ cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredFacts.map((fact) => {
          const isRevealed = !hideAnswers || revealedIds.includes(fact.id);

          return (
            <div
              key={fact.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-400">#{fact.id}</span>
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {fact.category}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {fact.question}
                </h3>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100">
                {isRevealed ? (
                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs sm:text-sm text-emerald-950 font-serif-bn font-semibold">
                    <span className="text-emerald-800 mr-1.5 font-sans font-bold">উঃ</span>
                    {fact.answer}
                    {fact.contextNote && (
                      <span className="block mt-1 text-[11px] text-emerald-700 font-normal font-sans">
                        💡 {fact.contextNote}
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => toggleReveal(fact.id)}
                    className="w-full py-2 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>সঠিক উত্তর দেখুন</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
