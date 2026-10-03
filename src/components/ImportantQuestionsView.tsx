import React, { useState } from 'react';
import { mostImportantQuestions, ImportantQuestionItem } from '../data/importantQuestions';
import { partAQuestions } from '../data/partAQuestions';
import { partBQuestions, QuestionB } from '../data/partBQuestions';
import { partCQuestions, QuestionC } from '../data/partCQuestions';
import { Flame, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, BookOpen, Table as TableIcon } from 'lucide-react';

type AnswerDataUnion =
  | { type: 'A'; answer: string }
  | { type: 'B'; data: QuestionB }
  | { type: 'C'; data: QuestionC };

export const ImportantQuestionsView: React.FC = () => {
  const [filterPart, setFilterPart] = useState<string>('সকল');
  const [expandedIds, setExpandedIds] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

  const filtered = mostImportantQuestions.filter((item) => {
    if (filterPart === 'সকল') return true;
    return item.part.includes(filterPart);
  });

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (expandedIds.length > 0) {
      setExpandedIds([]);
    } else {
      setExpandedIds(mostImportantQuestions.map(q => q.id));
    }
  };

  // Helper to get matching full answer
  const getAnswerData = (item: ImportantQuestionItem): AnswerDataUnion | null => {
    if (item.part.includes('ক-বিভাগ')) {
      if (item.id === 1) {
        const found = partAQuestions.find(q => q.id === 2);
        return found ? { type: 'A', answer: found.answer } : null;
      }
      if (item.id === 2) {
        const found = partAQuestions.find(q => q.id === 21);
        return found ? { type: 'A', answer: found.answer } : null;
      }
      if (item.id === 3) {
        const found = partAQuestions.find(q => q.id === 77);
        return found ? { type: 'A', answer: found.answer } : null;
      }
      if (item.id === 4) {
        const found = partAQuestions.find(q => q.id === 17);
        return found ? { type: 'A', answer: found.answer } : null;
      }
      if (item.id === 5) {
        return { type: 'A', answer: "'The Republic' গ্রন্থের রচয়িতা প্রাচীন গ্রিক দার্শনিক প্লেটো (৩৮০ খ্রি.পূ.) এবং 'The Politics' গ্রন্থের রচয়িতা রাষ্ট্রবিজ্ঞানের জনক এরিস্টটল (৩৩৫ খ্রি.পূ.)।" };
      }
      if (item.id === 6) {
        const found = partAQuestions.find(q => q.id === 91);
        return found ? { type: 'A', answer: found.answer } : null;
      }
    } else if (item.part.includes('খ-বিভাগ')) {
      if (item.id === 7) {
        const found = partBQuestions.find(q => q.id === 7);
        return found ? { type: 'B', data: found } : null;
      }
      if (item.id === 8) {
        const found = partBQuestions.find(q => q.id === 15);
        return found ? { type: 'B', data: found } : null;
      }
      if (item.id === 9) {
        const found = partBQuestions.find(q => q.id === 59);
        return found ? { type: 'B', data: found } : null;
      }
      if (item.id === 10) {
        const found = partBQuestions.find(q => q.id === 36);
        return found ? { type: 'B', data: found } : null;
      }
      if (item.id === 11) {
        const found = partBQuestions.find(q => q.id === 53);
        return found ? { type: 'B', data: found } : null;
      }
    } else if (item.part.includes('গ-বিভাগ')) {
      if (item.id === 12) {
        const found = partCQuestions.find(q => q.id === 10);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 13) {
        const found = partCQuestions.find(q => q.id === 13);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 14) {
        const found = partCQuestions.find(q => q.id === 12);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 15) {
        const found = partCQuestions.find(q => q.id === 15);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 16) {
        const found = partCQuestions.find(q => q.id === 27);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 17) {
        const found = partCQuestions.find(q => q.id === 44);
        return found ? { type: 'C', data: found } : null;
      }
      if (item.id === 18) {
        const found = partCQuestions.find(q => q.id === 39);
        return found ? { type: 'C', data: found } : null;
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
            Historical Evidence-Based Top Questions
          </span>
          <span className="text-xs text-slate-500 font-medium">
            বিগত ২০ বছরের পুনরাবৃত্তি বিশ্লেষণ ও পূর্ণাঙ্গ সমাধান
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
          <span>৫. 🔥 সবচেয়ে গুরুত্বপূর্ণ ও সর্বাধিক সম্ভাব্য প্রশ্নাবলি (উত্তরসহ)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          শুধুমাত্র PDF-এর প্রশ্নগুলোর মধ্য থেকে বোর্ডের ঐতিহাসিক পরীক্ষার প্রমাণের (Evidence) ভিত্তিতে নির্বাচিত সর্বাধিক গুরুত্বপূর্ণ প্রশ্নসমূহ এবং প্রতিটি প্রশ্নের পূর্ণাঙ্গ পরীক্ষোপযোগী উত্তর।
        </p>
      </div>

      {/* 99.99% Rule Compliance Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block mb-0.5">অ্যাকাডেমিক সততা ও বাস্তবসম্মত প্রস্তুতি বিধি (99.99% Rule):</strong>
          কোনো শিক্ষক বা প্রকাশনী কোনো প্রশ্নকে ১০০% বা ৯৯.৯৯% নিশ্চিত “আসবেই” বলে গ্যারান্টি দিতে পারে না। তবে বিগত ২০ বছরের পুনরাবৃত্তির প্রমাণ স্পষ্টভাবে সাক্ষ্য দেয় যে এই প্রশ্নগুলো সংশ্লিষ্ট অধ্যায়গুলোর মূল মেরুদণ্ড (Core Topics)। তাই এই প্রশ্নগুলোর প্রস্তুতিতে সর্বোচ্চ অগ্রাধিকার দেওয়া আবশ্যক। নিচে প্রতিটি প্রশ্নের সম্পূর্ণ উত্তর সংযোজন করা হয়েছে।
        </div>
      </div>

      {/* Part Filter Bar & Toggle All */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['সকল', 'ক-বিভাগ', 'খ-বিভাগ', 'গ-বিভাগ'].map((part) => (
            <button
              key={part}
              onClick={() => setFilterPart(part)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterPart === part
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {part}
            </button>
          ))}
        </div>

        <button
          onClick={toggleAll}
          className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{expandedIds.length > 0 ? 'সব উত্তর সংক্ষেপ করুন' : 'সব উত্তর একবারে উন্মুক্ত করুন'}</span>
        </button>
      </div>

      {/* List of Important Questions with Answers */}
      <div className="space-y-5">
        {filtered.map((item, idx) => {
          const isExpanded = expandedIds.includes(item.id);
          const ansInfo = getAnswerData(item);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-rose-300 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {item.part}
                  </span>
                  <span className="text-slate-500 font-medium">কোর টপিক: {item.coreTopic}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-rose-600 font-bold">{item.importance}</span>
                  <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                    সম্ভাব্যতা: {item.probability}
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {item.question}
              </h3>

              {/* Repetition Statistics */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">পুনরাবৃত্তির সংখ্যা:</span>
                  <strong className="text-slate-900 font-bold text-sm">এসেছে: {item.appearedCount} বার</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">পরীক্ষার বছরসমূহ:</span>
                  <span className="text-slate-800 font-medium">{item.years.join(', ')}</span>
                </div>
              </div>

              {/* Evidence Rationale */}
              <div className="text-xs text-slate-700 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                <strong className="text-rose-950 font-semibold block mb-0.5">অ্যাকাডেমিক প্রমাণের কারণ:</strong>
                {item.evidenceReason}
              </div>

              {/* Toggle Full Answer Button */}
              <div className="pt-1">
                <button
                  onClick={() => toggleExpand(item.id)}
                  className={`w-full py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isExpanded 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'উত্তর সংক্ষেপ করুন' : 'সম্পূর্ণ পরীক্ষোপযোগী উত্তর দেখুন'}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Rendered Full Answer */}
              {isExpanded && (
                <div className="mt-3 p-4 bg-slate-50/90 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-serif-bn space-y-3">
                  {ansInfo?.type === 'A' && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <strong className="text-amber-800 font-sans font-bold mr-1">সঠিক উত্তর:</strong>
                      {ansInfo.answer}
                    </div>
                  )}

                  {ansInfo?.type === 'B' && ansInfo.data && (
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <strong className="text-slate-900 font-sans font-bold block mb-1">ভূমিকা:</strong>
                        <p>{ansInfo.data.intro}</p>
                      </div>
                      <div className="space-y-2 font-sans">
                        <strong className="text-xs text-slate-500 font-bold uppercase tracking-wider block">মূল পয়েন্টসমূহ:</strong>
                        {ansInfo.data.points.map((pt, pIdx) => (
                          <div key={pIdx} className="p-2.5 bg-white rounded-lg border border-sky-100">
                            <span className="font-bold text-sky-950 block mb-0.5">{pIdx + 1}. {pt.title}</span>
                            <span className="font-serif-bn text-slate-700">{pt.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
                        <strong className="text-amber-950 font-sans font-bold block mb-1">উপসংহার:</strong>
                        <p>{ansInfo.data.conclusion}</p>
                      </div>
                    </div>
                  )}

                  {ansInfo?.type === 'C' && ansInfo.data && (
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <strong className="text-slate-900 font-sans font-bold block mb-1">ভূমিকা:</strong>
                        <p>{ansInfo.data.intro}</p>
                      </div>
                      <div className="space-y-3 font-sans">
                        {ansInfo.data.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{sec.heading}</h4>
                            <p className="font-serif-bn text-slate-700">{sec.content}</p>
                            {sec.bullets && (
                              <div className="space-y-1 pt-1">
                                {sec.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="p-2 bg-indigo-50/30 rounded border border-indigo-100">
                                    <span className="font-bold text-indigo-950 block">{b.title}</span>
                                    <span className="font-serif-bn text-slate-700">{b.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {ansInfo.data.table && (
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-2">
                          <strong className="text-xs font-bold text-indigo-950 block mb-1 flex items-center gap-1">
                            <TableIcon className="w-3.5 h-3.5" />
                            {ansInfo.data.table.caption}
                          </strong>
                          <table className="w-full text-left text-xs font-sans">
                            <thead className="bg-slate-100 font-bold border-b border-slate-200">
                              <tr>
                                {ansInfo.data.table.headers.map((h, i) => (
                                  <th key={i} className="p-2">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {ansInfo.data.table.rows.map((row, i) => (
                                <tr key={i}>
                                  {row.map((c, j) => (
                                    <td key={j} className="p-2 font-serif-bn text-slate-700">{c}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
                        <strong className="text-amber-950 font-sans font-bold block mb-1">উপসংহার:</strong>
                        <p>{ansInfo.data.conclusion}</p>
                      </div>
                    </div>
                  )}

                  {!ansInfo && (
                    <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                      <strong className="text-rose-900 font-sans font-bold block mb-1">পরীক্ষোপযোগী উত্তর:</strong>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

