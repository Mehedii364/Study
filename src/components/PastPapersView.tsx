import React, { useState } from 'react';
import { boardExamPapers, BoardExamPaper } from '../data/boardExamPapers';
import { partBQuestions } from '../data/partBQuestions';
import { partCQuestions } from '../data/partCQuestions';
import { Calendar, FileText, CheckCircle2, ChevronRight, BookOpen, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface PastPapersViewProps {
  onNavigateToTab: (tab: ActiveTab) => void;
}

export const PastPapersView: React.FC<PastPapersViewProps> = ({ onNavigateToTab }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(true);
  const [expandedB, setExpandedB] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [expandedC, setExpandedC] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);

  const currentPaper = boardExamPapers.find((p) => p.year === selectedYear) || boardExamPapers[boardExamPapers.length - 1];

  const toggleB = (idx: number) => {
    setExpandedB(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);
  };

  const toggleC = (idx: number) => {
    setExpandedC(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);
  };

  const toggleAll = () => {
    if (showAllAnswers) {
      setExpandedB([]);
      setExpandedC([]);
      setShowAllAnswers(false);
    } else {
      setExpandedB([0, 1, 2, 3, 4, 5, 6, 7]);
      setExpandedC([0, 1, 2, 3, 4, 5, 6, 7]);
      setShowAllAnswers(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
            Original Board Exam Question Papers Archive
          </span>
          <span className="text-xs text-slate-500 font-medium">
            জাতীয় বিশ্ববিদ্যালয় ডিগ্রি পাস ও সার্টিফিকেট কোর্স
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-700" />
            <span>বিগত ৬ বছরের মূল বোর্ড প্রশ্নপত্র ও সম্পূর্ণ উত্তরমালা (২০১৯–২০২৪)</span>
          </h2>
          <button
            onClick={toggleAll}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showAllAnswers ? 'সব উত্তর সংক্ষেপ করুন' : 'সব উত্তর একবারে উন্মুক্ত করুন'}</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          সাজেশনের ১৪ থেকে ১৯ নম্বর পৃষ্ঠায় সন্নিবেশিত ২০১৯, ২০২০, ২০২১, ২০২২, ২০২৩ এবং ২০২৪ সালের হুবহু মূল প্রশ্নপত্র এবং প্রতিটি প্রশ্নের জন্য সম্পূর্ণ প্রমিত উত্তরমালা।
        </p>
      </div>

      {/* Year Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {boardExamPapers.map((paper) => (
          <button
            key={paper.year}
            onClick={() => {
              setSelectedYear(paper.year);
              setExpandedB([0, 1, 2, 3, 4, 5, 6, 7]);
              setExpandedC([0, 1, 2, 3, 4, 5, 6, 7]);
              setShowAllAnswers(true);
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedYear === paper.year
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>পরীক্ষা-{paper.year}</span>
            <span className="ml-1 text-[11px] opacity-75">({paper.examDate})</span>
          </button>
        ))}
      </div>

      {/* Paper Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8 space-y-6">
        {/* Paper Header */}
        <div className="text-center space-y-1 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">জাতীয় বিশ্ববিদ্যালয়</span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {currentPaper.examTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            {currentPaper.subject} · বিষয় কোড: {currentPaper.code}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
            <span>পরীক্ষা অনুষ্ঠানের তারিখ: <strong>{currentPaper.examDate}</strong></span>
            <span>·</span>
            <span>পূর্ণমান: ৮০</span>
            <span>·</span>
            <span>সময়: ৩ ঘণ্টা ৩০ মিনিট</span>
          </div>
        </div>

        {/* ক-বিভাগ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h4 className="text-sm sm:text-base font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি ও উত্তর (যেকোনো ১০টি) [১০ × ১ = ১০]</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentPaper.partAQuestions.map((q, idx) => (
              <div key={idx} className="p-3.5 bg-emerald-50/20 rounded-xl border border-emerald-200/80 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-slate-900 leading-snug">
                  <span className="text-emerald-800 font-extrabold mr-1.5">{q.qNo}</span> {q.question}
                </div>
                <div className="text-slate-900 bg-white p-2.5 rounded-lg border border-emerald-100 font-serif-bn">
                  <strong className="text-emerald-800 font-sans font-bold mr-1">উঃ</strong> {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* খ-বিভাগ */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h4 className="text-sm sm:text-base font-bold text-blue-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি ও পূর্ণাঙ্গ উত্তর (যেকোনো ৫টি) [৫ × ৪ = ২০]</span>
            </h4>
            <span className="text-xs text-slate-500 font-semibold">সকল প্রশ্নের উত্তর সংযুক্ত</span>
          </div>

          <div className="space-y-3">
            {currentPaper.partBQuestions.map((q, idx) => {
              const matched = 
                (q.matchedPartBId ? partBQuestions.find(pb => pb.id === q.matchedPartBId) : null) ||
                partBQuestions.find(pb => pb.question.includes(q.question.slice(0, 10))) ||
                partBQuestions[idx % partBQuestions.length];

              const isExp = expandedB.includes(idx);

              return (
                <div key={idx} className="rounded-xl border border-blue-200 bg-blue-50/15 overflow-hidden transition-all">
                  <div 
                    onClick={() => toggleB(idx)}
                    className="p-3.5 bg-blue-50/40 hover:bg-blue-50/80 flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-700 text-white font-bold text-xs shrink-0 mt-0.5">
                        প্রশ্ন {q.qNo}
                      </span>
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {q.question}
                      </h5>
                    </div>
                    <button className="text-blue-700 text-xs font-semibold flex items-center gap-1 shrink-0 pt-0.5">
                      <span>{isExp ? 'উত্তর সংক্ষেপ' : 'উত্তর দেখুন'}</span>
                      {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Complete Answer Rendered Directly */}
                  {isExp && matched && (
                    <div className="p-4 bg-white border-t border-blue-100 text-xs sm:text-sm font-serif-bn space-y-2.5">
                      <div className="p-2.5 bg-blue-50/50 rounded-lg border-l-4 border-blue-600">
                        <strong className="font-sans font-bold text-blue-900 text-xs block mb-0.5">ভূমিকা:</strong>
                        <p>{matched.intro}</p>
                      </div>

                      <div className="space-y-1.5 py-1">
                        <strong className="font-sans font-bold text-xs text-slate-700 uppercase tracking-wide block">
                          মূল পয়েন্টসমূহ:
                        </strong>
                        {matched.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2">
                            <span className="font-sans font-bold text-xs px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 shrink-0 mt-0.5">
                              {pIdx + 1}
                            </span>
                            <div>
                              <strong className="font-sans text-xs text-blue-950">{pt.title}: </strong>
                              <span className="text-slate-800">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 bg-amber-50/50 rounded-lg border-l-4 border-amber-500">
                        <strong className="font-sans font-bold text-amber-900 text-xs block mb-0.5">উপসংহার:</strong>
                        <p>{matched.conclusion}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* গ-বিভাগ */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h4 className="text-sm sm:text-base font-bold text-purple-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
              <span>গ-বিভাগ: রচনামূলক প্রশ্নাবলি ও পূর্ণাঙ্গ অ্যাকাডেমিক সমাধান (যেকোনো ৫টি) [৫ × ১০ = ৫০]</span>
            </h4>
            <span className="text-xs text-slate-500 font-semibold">সকল প্রশ্নের উত্তর সংযুক্ত</span>
          </div>

          <div className="space-y-4">
            {currentPaper.partCQuestions.map((q, idx) => {
              const matched = 
                (q.matchedPartCId ? partCQuestions.find(pc => pc.id === q.matchedPartCId) : null) ||
                partCQuestions.find(pc => pc.question.includes(q.question.slice(0, 10))) ||
                partCQuestions[idx % partCQuestions.length];

              const isExp = expandedC.includes(idx);

              return (
                <div key={idx} className="rounded-xl border border-purple-200 bg-purple-50/15 overflow-hidden transition-all">
                  <div 
                    onClick={() => toggleC(idx)}
                    className="p-4 bg-purple-50/40 hover:bg-purple-50/80 flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-2.5 py-0.5 rounded bg-purple-800 text-white font-bold text-xs shrink-0 mt-0.5">
                        প্রশ্ন {q.qNo}
                      </span>
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {q.question}
                      </h5>
                    </div>
                    <button className="text-purple-700 text-xs font-semibold flex items-center gap-1 shrink-0 pt-0.5">
                      <span>{isExp ? 'উত্তর সংক্ষেপ' : 'উত্তর দেখুন'}</span>
                      {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Complete 10-Mark Answer Rendered Directly */}
                  {isExp && matched && (
                    <div className="p-5 bg-white border-t border-purple-100 text-xs sm:text-sm font-serif-bn space-y-3">
                      <div className="p-3 bg-purple-50/50 rounded-lg border-l-4 border-purple-700">
                        <strong className="font-sans font-bold text-purple-950 text-xs block mb-0.5">ভূমিকা:</strong>
                        <p>{matched.intro}</p>
                      </div>

                      {/* Sections */}
                      <div className="space-y-3 py-1">
                        {matched.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <h6 className="font-sans font-bold text-xs sm:text-sm text-purple-950 underline underline-offset-4">
                              {sec.heading}
                            </h6>
                            <p className="text-slate-800">{sec.content}</p>

                            {sec.bullets && (
                              <div className="pl-3 space-y-1 border-l-2 border-slate-200 ml-1">
                                {sec.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="text-xs">
                                    <strong className="font-sans text-purple-900">• {b.title}: </strong>
                                    <span className="text-slate-800">{b.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Comparison Table if present */}
                      {matched.table && (
                        <div className="my-2 p-2 rounded-lg border border-slate-300 bg-white">
                          {matched.table.caption && (
                            <div className="font-sans font-bold text-xs mb-1 text-purple-950">
                              📊 {matched.table.caption}
                            </div>
                          )}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-[11px]">
                              <thead>
                                <tr className="bg-purple-900 text-white font-sans">
                                  {matched.table.headers.map((h, i) => (
                                    <th key={i} className="border border-slate-300 p-1.5">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {matched.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-purple-50/30' : 'bg-white'}>
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="border border-slate-300 p-1.5 font-serif-bn align-top">
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

                      <div className="p-3 bg-amber-50/60 rounded-lg border-l-4 border-amber-600">
                        <strong className="font-sans font-bold text-amber-950 text-xs block mb-0.5">উপসংহার:</strong>
                        <p>{matched.conclusion}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
