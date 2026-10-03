import React from 'react';
import { repeatedQuestionsList } from '../data/repeatedAnalysis';
import { History, TrendingUp, Layers } from 'lucide-react';

export const RepeatedQuestionsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            Frequency & Trend Analysis
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ২০০৩ থেকে ২০২৪ সাল পর্যন্ত বোর্ড ডেটা
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
          <span>৬. 🔁 পুনরাবৃত্ত প্রশ্নের পরিসংখ্যান ও পূর্ণাঙ্গ তালিকা</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
          একই বিষয়ের বিভিন্ন বছরের প্রশ্ন (Similar Wording) একত্রিত করে একই Topic হিসেবে বৈজ্ঞানিক গণনা করা হয়েছে।
        </p>
      </div>

      {/* Top 3 Summary Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider block">র‍্যাংক ১ (সর্বাধিক পুনরাবৃত্ত)</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">স্বাধীনতার রক্ষাকবচসমূহ</h3>
          <span className="text-2xl font-black text-amber-900 block mt-2">১৪ বার</span>
          <span className="text-[11px] text-slate-600 mt-1 block">গ-বিভাগের অবিসংবাদিত শীর্ষ প্রশ্ন</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100/60 border border-sky-200">
          <span className="text-sky-800 text-xs font-bold uppercase tracking-wider block">র‍্যাংক ২ (যৌথ)</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">রাষ্ট্রের বিবর্তনমূলক মতবাদ</h3>
          <span className="text-2xl font-black text-sky-900 block mt-2">১২ বার</span>
          <span className="text-[11px] text-slate-600 mt-1 block">রাষ্ট্রের উৎপত্তি সংক্রান্ত একমাত্র সঠিক মতবাদ</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 border border-indigo-200">
          <span className="text-indigo-800 text-xs font-bold uppercase tracking-wider block">র‍্যাংক ৩ (যৌথ)</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">আইন ও আইনের প্রধান উৎসসমূহ</h3>
          <span className="text-2xl font-black text-indigo-900 block mt-2">১২ বার</span>
          <span className="text-[11px] text-slate-600 mt-1 block">অধ্যাপক হল্যান্ডের ৬টি উৎস নিয়মিত আসে</span>
        </div>
      </div>

      {/* Full Ranking Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <span>শীর্ষ ২০টি সর্বাধিক পুনরাবৃত্ত প্রশ্নের পূর্ণ সারণি</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">ফ্রিকোয়েন্সি ক্রম অনুযায়ী সাজানো</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 w-16 text-center">ক্রম</th>
                <th className="px-4 py-3">প্রশ্নের মূল বিষয় (Core Topic) ও বিকল্প রূপ</th>
                <th className="px-4 py-3 w-28 text-center">বিভাগ</th>
                <th className="px-4 py-3 w-28 text-center">পুনরাবৃত্তি</th>
                <th className="px-4 py-3">বিগত পরীক্ষার বছরসমূহ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {repeatedQuestionsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 text-center font-bold text-slate-600">
                    #{item.frequencyRank}
                  </td>
                  <td className="px-4 py-3">
                    <strong className="text-slate-900 block text-xs sm:text-sm font-semibold mb-1">
                      {item.topic}
                    </strong>
                    <div className="text-[11px] text-slate-500 space-y-0.5 mb-2">
                      {item.similarWordingVariants.map((v, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <span className="text-slate-400">•</span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* Complete Answer Rendered Directly */}
                    <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-900 font-serif-bn text-xs leading-relaxed">
                      <strong className="text-amber-950 font-sans font-bold block mb-0.5">
                        প্রমিত পরীক্ষোপযোগী সমাধান ও মূল পয়েন্ট:
                      </strong>
                      <p>{item.coreAnswer}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                      {item.part}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                      {item.timesRepeated} বার
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-600">
                    {item.yearsList}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
