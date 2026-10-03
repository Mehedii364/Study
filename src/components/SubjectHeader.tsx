import React from 'react';
import { subjectInfo } from '../data/subjectInfo';
import { BookOpen, Award, CheckCircle2, ShieldCheck, Flame, History, FileText, ArrowRight, Download, BarChart3 } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { MotivationalQuotes } from './MotivationalQuotes';
import { VisitorCounter } from './VisitorCounter';

interface SubjectHeaderProps {
  onSelectTab: (tab: ActiveTab) => void;
  completedPercent: number;
  onOpenPrint?: () => void;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({ onSelectTab, completedPercent, onOpenPrint }) => {
  return (
    <div className="space-y-8 py-2">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-10 shadow-lg border border-slate-800">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-500/30">
            <span>জাতীয় বিশ্ববিদ্যালয়</span>
            <span aria-hidden="true">·</span>
            <span>{subjectInfo.degreeCourse}</span>
            <span aria-hidden="true">·</span>
            <span>{subjectInfo.examSession} ({subjectInfo.holdingYear})</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-serif-bn">
            {subjectInfo.subjectName}
            <span className="block text-amber-400 text-xl sm:text-2xl mt-1 font-sans">
              {subjectInfo.paperName}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            ব্যতিক্রম প্রকাশনী সর্বশেষ চূড়ান্ত সাজেশনস এবং বিগত ২০ বছরের (২০০৩–২০২৪) বোর্ড পরীক্ষার নিখুঁত ও প্রামাণ্য বিশ্লেষণ। কোনো মনগড়া বা অনুমান নয়—প্রতিটি প্রশ্নের জন্য পাঠ্যবইয়ের মানে পরীক্ষোপযোগী পূর্ণাঙ্গ উত্তর।
          </p>

          {/* Curator / Author Attribution */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-amber-200/90 font-medium">
            <span>পরিকল্পনা ও সার্বিক সমন্বয়ে:</span>
            <a
              href="https://www.facebook.com/mehedi3643"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 hover:border-amber-300 transition-all cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>মোঃ মেহেদী হাসান / MD Mehedi Hasan</span>
            </a>
          </div>

          {/* Quick Exam Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs sm:text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-slate-400 block text-xs">বিষয় কোড</span>
              <span className="text-white font-bold text-base sm:text-lg">{subjectInfo.paperCode}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-slate-400 block text-xs">পূর্ণমান</span>
              <span className="text-amber-400 font-bold text-base sm:text-lg">{subjectInfo.fullMarks} নম্বর</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-slate-400 block text-xs">সময়সীমা</span>
              <span className="text-white font-bold text-base sm:text-lg">{subjectInfo.timeLimit}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-slate-400 block text-xs">সিলেবাস কভারেজ</span>
              <span className="text-emerald-400 font-bold text-base sm:text-lg">১০০% সম্পূর্ণ</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {onOpenPrint && (
              <button
                onClick={onOpenPrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/20"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>এক ক্লিকে সম্পূর্ণ রঙিন PDF ডাউনলোড</span>
              </button>
            )}
            <button
              onClick={() => onSelectTab('partA')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>ক-বিভাগ পড়া শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('statistics')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-indigo-400/40"
            >
              <BarChart3 className="w-4 h-4 text-indigo-200" />
              <span>স্টাডি পরিসংখ্যান ({completedPercent}%)</span>
            </button>
            <button
              onClick={() => onSelectTab('important')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>টপ 🔥 প্রশ্নাবলি</span>
            </button>
            <button
              onClick={() => onSelectTab('revision')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>এক নজরে রিভিশন</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Quick Visual Progress Banner linking to Statistics */}
      <div 
        onClick={() => onSelectTab('statistics')}
        className="bg-white rounded-xl border border-indigo-100 p-4 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                ক, খ ও গ-বিভাগের প্রশ্ন সমাপ্তির হার ও বার চার্ট পরিসংখ্যান
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                অগ্রগতি {completedPercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              বিভাগভিত্তিক প্রস্তুতির অনুপাত, তুলনামূলক বার চার্ট ও দুর্বলতা চিহ্নিত করতে ড্যাশবোর্ড দেখুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="w-32 sm:w-40 bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${completedPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1">
            চার্ট দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Live Visitors & Active Learners Counter */}
      <VisitorCounter />

      {/* Motivational Philosophy Quotes Rotator */}
      <MotivationalQuotes />

      {/* 3 Examination Parts Structure Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Part A Card */}
        <div 
          onClick={() => onSelectTab('partA')}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              ১ নম্বর প্রতি প্রশ্ন
            </span>
            <span className="text-xs font-semibold text-slate-500">মোট ১০ নম্বর</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
            {subjectInfo.structure.partA.name}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            {subjectInfo.structure.partA.desc}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">৯৭টি পূর্ণাঙ্গ প্রশ্ন ও নির্ভুল উত্তর</span>
            <span className="text-amber-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              পড়ুন <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Part B Card */}
        <div 
          onClick={() => onSelectTab('partB')}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
              ৪ নম্বর প্রতি প্রশ্ন
            </span>
            <span className="text-xs font-semibold text-slate-500">মোট ২০ নম্বর</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
            {subjectInfo.structure.partB.name}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            {subjectInfo.structure.partB.desc}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">৬০টি পয়েন্টভিত্তিক পূর্ণাঙ্গ উত্তর</span>
            <span className="text-sky-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              পড়ুন <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Part C Card */}
        <div 
          onClick={() => onSelectTab('partC')}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
              ১০ নম্বর প্রতি প্রশ্ন
            </span>
            <span className="text-xs font-semibold text-slate-500">মোট ৫০ নম্বর</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">
            {subjectInfo.structure.partC.name}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            {subjectInfo.structure.partC.desc}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">৪৪টি তুলনামূলক ছকসহ রচনামূলক প্রশ্ন</span>
            <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              পড়ুন <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 6 Core Exam Preparation Rules from Master Prompt */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-bold text-slate-900">
            মাস্টার প্রস্তুতি ও অ্যাকাডেমিক বিশ্লেষণ নীতিমালা (Strict Quality Principles)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">১</span>
            <div>
              <strong className="text-slate-900 block font-semibold">কোনো প্রশ্ন বাদ দেওয়া হয়নি</strong>
              <span className="text-slate-600 text-xs">PDF-এর প্রথম পৃষ্ঠা থেকে শেষ পৃষ্ঠা পর্যন্ত ক, খ, গ এবং বোর্ড শিটের প্রতিটি প্রশ্নের উত্তর রয়েছে।</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">২</span>
            <div>
              <strong className="text-slate-900 block font-semibold">কোনো পৃষ্ঠা রেফারেন্সে ফাঁকি নয়</strong>
              <span className="text-slate-600 text-xs">শুধু 'পৃষ্ঠা দেখুন' লিখে এড়িয়ে যাওয়া হয়নি; পরীক্ষার খাতায় পূর্ণ নম্বর পাওয়ার মতো বিস্তারিত লেখা হয়েছে।</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">৩</span>
            <div>
              <strong className="text-slate-900 block font-semibold">মনগড়া উত্তর নিষিদ্ধ</strong>
              <span className="text-slate-600 text-xs">সকল নাম, সাল, গ্রন্থের নাম, সংবিধান ও তত্ত্ব অনুমোদিত বিশ্ববিদ্যালয় টেক্সটবুক দিয়ে যাচাইকৃত।</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">৪</span>
            <div>
              <strong className="text-slate-900 block font-semibold">বিষয় লক (Subject Lock)</strong>
              <span className="text-slate-600 text-xs">কেবলমাত্র রাষ্ট্রবিজ্ঞান ১ম পত্র (রাজনৈতিক তত্ত্ব)-এর সিলেবাস ও প্রশ্নের মধ্যেই সীমাবদ্ধ রাখা হয়েছে।</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">৫</span>
            <div>
              <strong className="text-slate-900 block font-semibold">OCR ভুল সংশোধন</strong>
              <span className="text-slate-600 text-xs">ঝাপসা ও স্ক্যান করা তথ্যের বিকৃতি দূর করে মূল ভাবধারা ও সঠিক বানান নিশ্চিত করা হয়েছে।</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">৬</span>
            <div>
              <strong className="text-slate-900 block font-semibold">৯৯.৯৯% নিশ্চিত দাবি বর্জন</strong>
              <span className="text-slate-600 text-xs">অবাস্তব '১০০% কমন গ্যারান্টি' নয়, বরং বিগত ২০ বছরের পরিসংখ্যানভিত্তিক প্রস্তুতি অগ্রাধিকার।</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
