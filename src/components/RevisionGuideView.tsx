import React, { useState } from 'react';
import { revisionGuideData } from '../data/revisionGuide';
import { BookMarked, CheckCircle, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const RevisionGuideView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'coreQuestions' | 'tables'>('coreQuestions');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            High-Priority Preparation Checklist
          </span>
          <span className="text-xs text-slate-500 font-medium">
            পরীক্ষার আগের রাতের অবশ্য পাঠ্য
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
          <span>{revisionGuideData.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          সবচেয়ে বেশি পুনরাবৃত্ত প্রশ্ন, কোর সংজ্ঞা, গ্রন্থ, উক্তি ও সাল নিয়ে সাজানো ফোকাসড রিভিশন মডিউল।
        </p>
      </div>

      {/* Academic Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="leading-relaxed">{revisionGuideData.disclaimer}</p>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSection('coreQuestions')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'coreQuestions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          কোর প্রশ্নমালা (ক, খ ও গ বিভাগ সংক্ষেপ)
        </button>
        <button
          onClick={() => setActiveSection('tables')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
            activeSection === 'tables'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          দ্রুত স্মারক সারণিসমূহ (গ্রন্থ, উক্তি, সাল ও শব্দ)
        </button>
      </div>

      {activeSection === 'coreQuestions' ? (
        <div className="space-y-8">
          {/* Top 10 ক-বিভাগ সংক্ষেপ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center">১</span>
              <h3 className="text-base font-bold text-slate-900">
                ক-বিভাগ শীর্ষ ১০টি অবশ্য মুখস্থ প্রশ্ন ও এক নজরে উত্তর
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {revisionGuideData.topCoreQuestionsA.map((item) => (
                <div key={item.id} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-start justify-between gap-2 text-xs mb-1">
                    <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.2 rounded">
                      #{item.id}
                    </span>
                    <span className="text-[11px] text-slate-500">{item.reason}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-serif-bn">
                    <strong className="text-amber-800 font-sans mr-1">উঃ</strong> {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top 8 খ-বিভাগ সংক্ষেপ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-900 text-xs font-bold flex items-center justify-center">২</span>
              <h3 className="text-base font-bold text-slate-900">
                খ-বিভাগ শীর্ষ ৮টি প্রশ্নের মূল পয়েন্ট স্মারক (Quick Points)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {revisionGuideData.topCoreQuestionsB.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-900 bg-sky-50 px-2 py-0.2 rounded">
                      খ-প্রশ্ন #{item.id}
                    </span>
                    <span className="text-[11px] text-slate-500">{item.reason}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.question}
                  </h4>
                  <div className="space-y-1 pt-1">
                    {item.keyPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 6 গ-বিভাগ রচনা আউটলাইন */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center justify-center">৩</span>
              <h3 className="text-base font-bold text-slate-900">
                গ-বিভাগ শীর্ষ ৬টি ব্রড প্রশ্নের প্রবন্ধের কাঠামো (Essay Blueprint)
              </h3>
            </div>
            <div className="space-y-3">
              {revisionGuideData.topCoreQuestionsC.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.2 rounded">
                      গ-প্রশ্ন #{item.id}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">{item.reason}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.question}
                  </h4>
                  <div className="p-3 bg-indigo-50/40 rounded-lg border border-indigo-100">
                    <strong className="text-xs text-indigo-950 font-bold block mb-1">
                      পরীক্ষায় খাতায় লেখার ধারাবাহিক সাব-হেডিং রূপরেখা:
                    </strong>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800">
                      {item.essayOutline.map((head, hIdx) => (
                        <span key={hIdx} className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-indigo-200">
                          <span className="text-indigo-600 font-bold">{hIdx + 1}.</span> {head}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Fast Memorization Reference Tables */
        <div className="space-y-8">
          {/* Books and Authors */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                কালজয়ী রাজনৈতিক গ্রন্থ ও রচয়িতা (Books & Thinkers)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">গ্রন্থের নাম</th>
                    <th className="px-4 py-2.5">রচয়িতা / চিন্তাবিদ</th>
                    <th className="px-4 py-2.5">রচনাকাল / তথ্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revisionGuideData.booksAndAuthors.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2 font-bold text-slate-900">{b.col1}</td>
                      <td className="px-4 py-2 text-slate-700">{b.col2}</td>
                      <td className="px-4 py-2 text-slate-500">{b.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Famous Quotes */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                বিখ্যাত রাজনৈতিক উক্তি ও প্রবক্তা (Famous Quotes & Speakers)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">বিখ্যাত উক্তি</th>
                    <th className="px-4 py-2.5">বক্তা / রাষ্ট্রবিজ্ঞানী</th>
                    <th className="px-4 py-2.5">প্রাসঙ্গিকতা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revisionGuideData.famousQuotesAndSpeakers.map((q, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 font-bold text-slate-900 italic font-serif-bn">{q.col1}</td>
                      <td className="px-4 py-2.5 text-amber-900 font-semibold">{q.col2}</td>
                      <td className="px-4 py-2.5 text-slate-500">{q.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Years */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                ঐতিহাসিক সাল ও যুগান্তকারী ঘটনা (Historical Years & Events)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">সাল / শতাব্দী</th>
                    <th className="px-4 py-2.5">ঐতিহাসিক ঘটনা</th>
                    <th className="px-4 py-2.5">রাষ্ট্রচিন্তায় তাৎপর্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revisionGuideData.historicalYearsAndEvents.map((y, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2 font-bold text-slate-900">{y.col1}</td>
                      <td className="px-4 py-2 text-slate-700">{y.col2}</td>
                      <td className="px-4 py-2 text-slate-500">{y.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Etymology Keywords */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                মৌলিক পারিভাষিক শব্দ ও ব্যুৎপত্তিগত উৎস (Etymology of Keywords)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2.5">মূল শব্দ</th>
                    <th className="px-4 py-2.5">ভাষার উৎস</th>
                    <th className="px-4 py-2.5">আক্ষরিক অর্থ ও আধুনিক পরিভাষা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revisionGuideData.etymologyKeywords.map((w, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2 font-bold text-slate-900">{w.col1}</td>
                      <td className="px-4 py-2 text-slate-700">{w.col2}</td>
                      <td className="px-4 py-2 text-slate-500">{w.col3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
