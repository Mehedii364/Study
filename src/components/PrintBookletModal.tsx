import React, { useState, useRef } from 'react';
import { partAQuestions } from '../data/partAQuestions';
import { partBQuestions } from '../data/partBQuestions';
import { partCQuestions } from '../data/partCQuestions';
import { mcqBank } from '../data/mcqBank';
import { mostImportantQuestions } from '../data/importantQuestions';
import { revisionGuideData } from '../data/revisionGuide';
import { subjectInfo } from '../data/subjectInfo';
import { 
  X, 
  Printer, 
  Download, 
  Palette, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Type,
  Flame,
  BookOpen,
  ArrowRight,
  Hash
} from 'lucide-react';

interface PrintBookletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PageDefinition {
  id: string;
  pageNumber: number;
  sectionTitle: string;
  categoryTag: string;
  content: React.ReactNode;
}

export const PrintBookletModal: React.FC<PrintBookletModalProps> = ({ isOpen, onClose }) => {
  // Section Inclusions (default ALL included for complete PDF)
  const [includeCover, setIncludeCover] = useState(true);
  const [includePartA, setIncludePartA] = useState(true);
  const [includePartB, setIncludePartB] = useState(true);
  const [includePartC, setIncludePartC] = useState(true);
  const [includeMcq, setIncludeMcq] = useState(true);
  const [includeImportant, setIncludeImportant] = useState(true);
  const [includeRevision, setIncludeRevision] = useState(true);

  // Customization: Color Mode & Font Size
  const [colorMode, setColorMode] = useState<'color' | 'mono'>('color');
  const [fontSize, setFontSize] = useState<'compact' | 'normal' | 'large'>('normal');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const totalQuestionsCount = 
    (includePartA ? partAQuestions.length : 0) +
    (includePartB ? partBQuestions.length : 0) +
    (includePartC ? partCQuestions.length : 0) +
    (includeMcq ? mcqBank.length : 0);

  const selectAll = (val: boolean) => {
    setIncludeCover(val);
    setIncludePartA(val);
    setIncludePartB(val);
    setIncludePartC(val);
    setIncludeMcq(val);
    setIncludeImportant(val);
    setIncludeRevision(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToPage = (pageNum: number) => {
    const el = document.getElementById(`pdf-page-${pageNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Font size classes
  const sizeClasses = {
    compact: {
      text: 'text-[11px] leading-relaxed',
      heading: 'text-xs font-bold',
      subheading: 'text-[11px]',
      padding: 'p-2',
      space: 'space-y-2'
    },
    normal: {
      text: 'text-xs sm:text-[13px] leading-relaxed',
      heading: 'text-sm font-bold',
      subheading: 'text-xs',
      padding: 'p-3',
      space: 'space-y-3'
    },
    large: {
      text: 'text-sm sm:text-[15px] leading-relaxed',
      heading: 'text-base font-bold',
      subheading: 'text-sm',
      padding: 'p-4',
      space: 'space-y-4'
    }
  }[fontSize];

  const isColor = colorMode === 'color';

  // -------------------------------------------------------------
  // DYNAMIC A4 PAGES COMPOSITION
  // -------------------------------------------------------------
  const pages: PageDefinition[] = [];
  let pageCounter = 1;

  // PAGE 1: Cover & Index
  if (includeCover) {
    pages.push({
      id: 'cover',
      pageNumber: pageCounter++,
      sectionTitle: 'প্রচ্ছদ ও পূর্ণাঙ্গ সূচিপত্র',
      categoryTag: 'কভার পেজ',
      content: (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isColor 
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border-slate-700' 
              : 'bg-white text-black border-2 border-black'
          } shadow-md`}>
            
            <div className="text-center space-y-3 pb-6 border-b border-white/20">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                isColor ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'border border-black'
              }`}>
                <span>জাতীয় বিশ্ববিদ্যালয়</span>
                <span>·</span>
                <span>{subjectInfo.degreeCourse}</span>
                <span>·</span>
                <span>{subjectInfo.examSession} ({subjectInfo.holdingYear})</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-bn">
                বিষয়: {subjectInfo.subjectName}
              </h1>
              <h2 className={`text-xl sm:text-2xl font-bold font-serif-bn ${isColor ? 'text-amber-400' : ''}`}>
                পত্র: {subjectInfo.paperName}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold pt-1">
                <span>বিষয় কোড: <strong className="underline font-mono">{subjectInfo.paperCode}</strong></span>
                <span>·</span>
                <span>সময়: <strong>{subjectInfo.timeLimit}</strong></span>
                <span>·</span>
                <span>পূর্ণমান: <strong>{subjectInfo.fullMarks} নম্বর</strong></span>
              </div>
              <p className={`text-xs max-w-2xl mx-auto pt-1 ${isColor ? 'text-slate-300' : 'text-slate-700'}`}>
                ব্যতিক্রম সর্বশেষ চূড়ান্ত সাজেশনস ও বিগত ২০ বছরের বোর্ড পরীক্ষার শতভাগ নিখুঁত প্রশ্ন-উত্তর সম্ভার
              </p>
            </div>

            {/* Author / Curator Curation Box */}
            <div className={`my-5 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
              isColor 
                ? 'bg-white/10 border border-white/15 backdrop-blur-xs text-amber-200' 
                : 'bg-slate-100 border border-black text-black'
            }`}>
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="block font-semibold opacity-90">পরিকল্পনা ও সার্বিক সমন্বয়ে:</span>
                <span className="text-sm font-bold text-white tracking-wide">
                  মোঃ মেহেদী হাসান / MD Mehedi Hasan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">ফেসবুক প্রোফাইল:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>facebook.com/mehedi3643</span>
                </span>
              </div>
            </div>

            {/* Syllabus Structure & Index Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-lg ${isColor ? 'bg-white/5 border border-white/10' : 'border border-black'}`}>
                <span className="block opacity-75">পূর্ণমান</span>
                <span className="font-bold text-base">{subjectInfo.fullMarks} নম্বর (লিখিত ৮০ + ইনকোর্স ২০)</span>
              </div>
              <div className={`p-3 rounded-lg ${isColor ? 'bg-white/5 border border-white/10' : 'border border-black'}`}>
                <span className="block opacity-75">সময়সীমা</span>
                <span className="font-bold text-base">{subjectInfo.timeLimit}</span>
              </div>
              <div className={`p-3 rounded-lg ${isColor ? 'bg-white/5 border border-white/10' : 'border border-black'}`}>
                <span className="block opacity-75">সিলেবাস কভারেজ</span>
                <span className="font-bold text-base text-emerald-400">১০০% সম্পূর্ণ</span>
              </div>
              <div className={`p-3 rounded-lg ${isColor ? 'bg-white/5 border border-white/10' : 'border border-black'}`}>
                <span className="block opacity-75">গুণগত মান</span>
                <span className="font-bold text-base text-amber-300">পাঠ্যবইয়ের প্রমিত উত্তর</span>
              </div>
            </div>

            {/* Table of Contents Summary */}
            <div className={`mt-5 p-4 rounded-xl text-xs space-y-2.5 ${
              isColor ? 'bg-black/30 border border-white/10' : 'border border-black'
            }`}>
              <div className="font-bold uppercase tracking-wider text-amber-300 flex items-center justify-between">
                <span>📑 সম্পূর্ণ বুকলেটের সূচিপত্র ও বিভাগ বিন্যাস</span>
                <span className="text-[11px] text-slate-300">পৃষ্ঠা ১ থেকে চলমান</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
                <div className="p-2 rounded bg-white/5">• <strong>১. ক-বিভাগ:</strong> অতি সংক্ষিপ্ত প্রশ্নাবলি (৯৭টি প্রশ্ন ও উত্তর)</div>
                <div className="p-2 rounded bg-white/5">• <strong>২. খ-বিভাগ:</strong> সংক্ষিপ্ত প্রশ্নাবলি (৬০টি প্রশ্ন, ভূমিকা, পয়েন্ট ও উপসংহার)</div>
                <div className="p-2 rounded bg-white/5">• <strong>৩. গ-বিভাগ:</strong> রচনামূলক প্রশ্নাবলি (৪৪টি প্রশ্ন, বিস্তারিত বিশ্লেষণ ও ছক)</div>
                <div className="p-2 rounded bg-white/5">• <strong>৪. MCQ ব্যাংক:</strong> বিগত বছরের তথ্যাবলি (৬৪টি প্রশ্ন ও উত্তর)</div>
                <div className="p-2 rounded bg-white/5">• <strong>৫. 🔥 গুরুত্বপূর্ণ প্রশ্নাবলি:</strong> ঐতিহাসিক পরীক্ষার প্রমাণ ও সমাধান</div>
                <div className="p-2 rounded bg-white/5">• <strong>৬. 🎯 দ্রুত রিভিশন চার্ট:</strong> গ্রন্থ, লেখক, মতবাদ ও রাষ্ট্রচিন্তার ছক</div>
              </div>
            </div>
          </div>
        </div>
      )
    });
  }

  // PART A: Divided into 4 distinct A4 pages
  if (includePartA) {
    const partAChunks = [
      { start: 0, end: 25, label: 'প্রশ্ন ১ থেকে ২৫' },
      { start: 25, end: 50, label: 'প্রশ্ন ২৬ থেকে ৫০' },
      { start: 50, end: 75, label: 'প্রশ্ন ৫১ থেকে ৭৫' },
      { start: 75, end: 97, label: 'প্রশ্ন ৭৬ থেকে ৯৭' }
    ];

    partAChunks.forEach((chunk) => {
      const questionsSubset = partAQuestions.slice(chunk.start, chunk.end);
      pages.push({
        id: `partA-${chunk.start}`,
        pageNumber: pageCounter++,
        sectionTitle: `ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি ও উত্তর (${chunk.label})`,
        categoryTag: 'ক-বিভাগ',
        content: (
          <div className="space-y-4">
            <div className={`p-3 rounded-xl flex items-center justify-between ${
              isColor ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                  ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি (মান: ১ নম্বর)
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  {subjectInfo.paperName} — {chunk.label}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-200 font-bold">
                {questionsSubset.length}টি প্রশ্ন
              </span>
            </div>

            <div className={`space-y-2.5 ${sizeClasses.text}`}>
              {questionsSubset.map((q) => (
                <div 
                  key={q.id} 
                  className={`print-break-inside-avoid p-3 rounded-xl border ${
                    isColor 
                      ? 'border-emerald-200 bg-emerald-50/20' 
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-xs shrink-0 ${
                      isColor ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {q.id}
                    </span>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-slate-900 leading-snug">
                        {q.question}
                      </p>
                      
                      <div className={`p-2 rounded-lg font-serif-bn ${
                        isColor 
                          ? 'bg-white border border-emerald-100 text-emerald-950' 
                          : 'bg-slate-50 border border-slate-200 text-slate-900'
                      }`}>
                        <strong className={isColor ? 'text-emerald-800' : 'text-slate-950'}>উঃ </strong>
                        <span>{q.answer}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10px] text-slate-600">
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${
                          isColor ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {q.category}
                        </span>
                        <span>·</span>
                        <span>এসেছে: <strong>{q.appearedCount} বার</strong> ({q.years.join(', ')})</span>
                        <span>·</span>
                        <span className="font-bold text-amber-700">গুরুত্ব: {q.importance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      });
    });
  }

  // PART B: Divided into 5 distinct A4 pages (12 questions each)
  if (includePartB) {
    const partBChunks = [
      { start: 0, end: 12, label: 'প্রশ্ন ১ থেকে ১২' },
      { start: 12, end: 24, label: 'প্রশ্ন ১৩ থেকে ২৪' },
      { start: 24, end: 36, label: 'প্রশ্ন ২৫ থেকে ৩৬' },
      { start: 36, end: 48, label: 'প্রশ্ন ৩৭ থেকে ৪৮' },
      { start: 48, end: 60, label: 'প্রশ্ন ৪৯ থেকে ৬০' }
    ];

    partBChunks.forEach((chunk) => {
      const questionsSubset = partBQuestions.slice(chunk.start, chunk.end);
      pages.push({
        id: `partB-${chunk.start}`,
        pageNumber: pageCounter++,
        sectionTitle: `খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি ও সুবিন্যস্ত সমাধান (${chunk.label})`,
        categoryTag: 'খ-বিভাগ',
        content: (
          <div className="space-y-4">
            <div className={`p-3 rounded-xl flex items-center justify-between ${
              isColor ? 'bg-blue-800 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                  খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি (মান: ৪ নম্বর)
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  {subjectInfo.paperName} — {chunk.label}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-200 font-bold">
                {questionsSubset.length}টি প্রশ্ন
              </span>
            </div>

            <div className={`space-y-4 ${sizeClasses.text}`}>
              {questionsSubset.map((q) => (
                <div 
                  key={q.id} 
                  className={`print-break-inside-avoid p-3.5 rounded-xl border ${
                    isColor ? 'border-blue-200 bg-blue-50/15' : 'border-slate-300 bg-white'
                  } space-y-2`}
                >
                  <div className="flex items-start gap-2.5 pb-1.5 border-b border-slate-200">
                    <span className={`px-2 py-0.5 rounded font-bold text-xs shrink-0 ${
                      isColor ? 'bg-blue-700 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      খ-{q.id}
                    </span>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 text-sm leading-snug">
                        {q.question}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[10px] text-slate-600">
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${
                          isColor ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {q.category}
                        </span>
                        <span>·</span>
                        <span>পুনরাবৃত্তি: <strong>{q.appearedCount} বার</strong> ({q.years.join(', ')})</span>
                        <span>·</span>
                        <span className="font-bold text-amber-700">{q.importance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 font-serif-bn">
                    <div className={`p-2 rounded-lg border-l-4 ${
                      isColor ? 'border-blue-600 bg-blue-50/60' : 'border-black bg-slate-50'
                    }`}>
                      <strong className={`font-sans text-[11px] block ${isColor ? 'text-blue-900' : 'text-black'}`}>
                        [ ভূমিকা ]
                      </strong>
                      <p>{q.intro}</p>
                    </div>

                    <div className="space-y-1 pl-1">
                      <strong className={`font-sans text-[11px] block ${isColor ? 'text-blue-950' : 'text-black'}`}>
                        [ মূল পয়েন্টসমূহ ]:
                      </strong>
                      {q.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5">
                          <span className={`font-sans font-bold text-[10px] px-1 py-0.2 rounded shrink-0 mt-0.5 ${
                            isColor ? 'bg-blue-100 text-blue-900' : 'bg-slate-200'
                          }`}>
                            {pIdx + 1}
                          </span>
                          <div>
                            <strong className={`font-sans text-xs ${isColor ? 'text-blue-900' : 'text-black'}`}>
                              {pt.title}:{' '}
                            </strong>
                            <span className="text-slate-800">{pt.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`p-2 rounded-lg border-l-4 ${
                      isColor ? 'border-amber-500 bg-amber-50/60' : 'border-black bg-slate-50'
                    }`}>
                      <strong className={`font-sans text-[11px] block ${isColor ? 'text-amber-900' : 'text-black'}`}>
                        [ উপসংহার ]
                      </strong>
                      <p>{q.conclusion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      });
    });
  }

  // PART C: Divided into 6 distinct A4 pages
  if (includePartC) {
    const partCChunks = [
      { start: 0, end: 8, label: 'প্রশ্ন ১ থেকে ৮' },
      { start: 8, end: 16, label: 'প্রশ্ন ৯ থেকে ১৬' },
      { start: 16, end: 24, label: 'প্রশ্ন ১৭ থেকে ২৪' },
      { start: 24, end: 32, label: 'প্রশ্ন ২৫ থেকে ৩২' },
      { start: 32, end: 40, label: 'প্রশ্ন ৩৩ থেকে ৪০' },
      { start: 40, end: 44, label: 'প্রশ্ন ৪১ থেকে ৪৪' }
    ];

    partCChunks.forEach((chunk) => {
      const questionsSubset = partCQuestions.slice(chunk.start, chunk.end);
      pages.push({
        id: `partC-${chunk.start}`,
        pageNumber: pageCounter++,
        sectionTitle: `গ-বিভাগ: রচনামূলক প্রশ্নাবলি ও বিশ্লেষণ (${chunk.label})`,
        categoryTag: 'গ-বিভাগ',
        content: (
          <div className="space-y-4">
            <div className={`p-3 rounded-xl flex items-center justify-between ${
              isColor ? 'bg-purple-900 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                  গ-বিভাগ: রচনামূলক প্রশ্নাবলি (মান: ১০ নম্বর)
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  {subjectInfo.paperName} — {chunk.label}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-200 font-bold">
                {questionsSubset.length}টি প্রশ্ন
              </span>
            </div>

            <div className={`space-y-5 ${sizeClasses.text}`}>
              {questionsSubset.map((q) => (
                <div 
                  key={q.id} 
                  className={`print-break-inside-avoid p-4 rounded-xl border ${
                    isColor ? 'border-purple-200 bg-purple-50/15' : 'border-slate-400 bg-white'
                  } space-y-2.5`}
                >
                  <div className="flex items-start gap-2.5 pb-2 border-b border-slate-300">
                    <span className={`px-2.5 py-1 rounded font-bold text-xs shrink-0 ${
                      isColor ? 'bg-purple-800 text-white' : 'bg-slate-900 text-white'
                    }`}>
                      গ-{q.id}
                    </span>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 text-base leading-snug">
                        {q.question}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[10px] text-slate-600">
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${
                          isColor ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {q.category}
                        </span>
                        <span>·</span>
                        <span>এসেছে: <strong>{q.appearedCount} বার</strong> ({q.years.join(', ')})</span>
                        <span>·</span>
                        <span className="font-bold text-amber-700">{q.importance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 font-serif-bn">
                    <div className={`p-2.5 rounded-lg border-l-4 ${
                      isColor ? 'border-purple-600 bg-purple-50/60' : 'border-black bg-slate-50'
                    }`}>
                      <strong className={`font-sans text-[11px] block ${isColor ? 'text-purple-950' : 'text-black'}`}>
                        [ ভূমিকা ও পটভূমি ]
                      </strong>
                      <p>{q.intro}</p>
                    </div>

                    <div className="space-y-2">
                      {q.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <h6 className={`font-sans font-bold text-xs underline underline-offset-2 ${
                            isColor ? 'text-purple-950' : 'text-black'
                          }`}>
                            {sec.heading}
                          </h6>
                          <p className="text-slate-800">{sec.content}</p>

                          {sec.bullets && (
                            <div className="pl-2 space-y-1 border-l-2 border-slate-300 ml-1">
                              {sec.bullets.map((b, bIdx) => (
                                <div key={bIdx} className="text-xs">
                                  <strong className={`font-sans ${isColor ? 'text-purple-900' : 'text-black'}`}>
                                    • {b.title}:{' '}
                                  </strong>
                                  <span className="text-slate-800">{b.desc}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {q.table && (
                      <div className="my-2 p-2 rounded-lg border border-slate-300 bg-white">
                        {q.table.caption && (
                          <div className={`font-sans font-bold text-xs mb-1 ${
                            isColor ? 'text-purple-900' : 'text-black'
                          }`}>
                            📊 {q.table.caption}
                          </div>
                        )}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-[10px]">
                            <thead>
                              <tr className={isColor ? 'bg-purple-900 text-white' : 'bg-slate-200 text-black'}>
                                {q.table.headers.map((h, i) => (
                                  <th key={i} className="border border-slate-400 p-1 font-sans">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {q.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className={rIdx % 2 === 1 && isColor ? 'bg-purple-50/40' : 'bg-white'}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="border border-slate-300 p-1 font-serif-bn align-top">
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

                    <div className={`p-2.5 rounded-lg border-l-4 ${
                      isColor ? 'border-amber-500 bg-amber-50/70' : 'border-black bg-slate-50'
                    }`}>
                      <strong className={`font-sans text-[11px] block ${isColor ? 'text-amber-900' : 'text-black'}`}>
                        [ মূল্যায়ন ও উপসংহার ]
                      </strong>
                      <p>{q.conclusion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      });
    });
  }

  // MCQ & FACT BANK: Divided into 2 distinct A4 pages
  if (includeMcq) {
    const mcqChunks = [
      { start: 0, end: 32, label: 'তথ্য ১ থেকে ৩২' },
      { start: 32, end: 64, label: 'তথ্য ৩৩ থেকে ৬৪' }
    ];

    mcqChunks.forEach((chunk) => {
      const factsSubset = mcqBank.slice(chunk.start, chunk.end);
      pages.push({
        id: `mcq-${chunk.start}`,
        pageNumber: pageCounter++,
        sectionTitle: `৪. MCQ ও তথ্য ব্যাংক (${chunk.label})`,
        categoryTag: 'MCQ ব্যাংক',
        content: (
          <div className="space-y-4">
            <div className={`p-3 rounded-xl flex items-center justify-between ${
              isColor ? 'bg-teal-800 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                  ৪. MCQ ও সাধারণ জ্ঞান মাস্টার ব্যাংক
                </span>
                <h4 className="text-sm sm:text-base font-bold">
                  {subjectInfo.paperName} — {chunk.label}
                </h4>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950/80 text-teal-200 font-bold">
                {factsSubset.length}টি তথ্য
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {factsSubset.map((fact) => (
                <div 
                  key={fact.id}
                  className={`print-break-inside-avoid p-2.5 rounded-xl border flex flex-col justify-between ${
                    isColor ? 'bg-teal-50/20 border-teal-200' : 'bg-white border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 pb-1 border-b border-slate-200 text-[10px]">
                      <span className={`font-bold ${isColor ? 'text-teal-800' : 'text-slate-800'}`}>
                        তথ্য #{fact.id}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-semibold ${
                        isColor ? 'bg-teal-100 text-teal-900' : 'bg-slate-100'
                      }`}>
                        {fact.category}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 mt-1 leading-snug">
                      {fact.question}
                    </p>
                  </div>

                  <div className={`mt-1.5 p-1.5 rounded-lg font-serif-bn text-xs ${
                    isColor ? 'bg-white border border-teal-200 text-teal-950' : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <strong className={isColor ? 'text-teal-800 font-sans' : 'text-black font-sans'}>সঠিক উত্তর: </strong>
                    <span className="font-semibold">{fact.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      });
    });
  }

  // TOP IMPORTANT QUESTIONS: 1 A4 Page with complete answers
  if (includeImportant) {
    pages.push({
      id: 'important',
      pageNumber: pageCounter++,
      sectionTitle: '৫. 🔥 সর্বাধিক গুরুত্বপূর্ণ ও সম্ভাব্য প্রশ্নাবলি (টপ সাজেশন ও উত্তরমালা)',
      categoryTag: 'টপ সাজেশন',
      content: (
        <div className="space-y-4">
          <div className={`p-3 rounded-xl flex items-center justify-between ${
            isColor ? 'bg-amber-700 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                ৫. 🔥 সর্বাধিক গুরুত্বপূর্ণ ও সম্ভাব্য প্রশ্নাবলি (সাজেশন)
              </span>
              <h4 className="text-sm sm:text-base font-bold">
                জাতীয় বিশ্ববিদ্যালয়ের বিগত ২০ বছরের এভিডেন্সভিত্তিক ১৮টি প্রশ্ন ও সম্পূর্ণ উত্তরমালা
              </h4>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-200 font-bold">
              ১৮টি প্রশ্ন
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {mostImportantQuestions.map((item) => (
              <div 
                key={item.id}
                className={`print-break-inside-avoid p-3.5 rounded-xl border ${
                  isColor ? 'bg-amber-50/25 border-amber-200' : 'bg-white border-slate-300'
                } space-y-2`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 pb-1 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isColor ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white'
                    }`}>
                      {item.part}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {item.id}. {item.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isColor ? 'bg-amber-100 text-amber-900' : 'border border-black'
                    }`}>
                      {item.appearedCount} বার পুনরাবৃত্ত
                    </span>
                    <span className="text-amber-600 font-bold">{item.importance}</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg font-serif-bn leading-relaxed ${
                  isColor ? 'bg-white border border-amber-200 text-slate-900' : 'bg-slate-50 border border-slate-200'
                }`}>
                  <strong className={isColor ? 'text-amber-950 font-sans' : 'text-black font-sans'}>
                    পরীক্ষোপযোগী পূর্ণাঙ্গ উত্তর:{' '}
                  </strong>
                  <span>{item.answer}</span>
                </div>

                <p className="text-[10px] text-slate-500 pt-0.5">
                  ঐতিহাসিক প্রমাণ: {item.evidenceReason} (আসার বছরসমূহ: {item.years.join(', ')})
                </p>
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  // REVISION CHARTS: 1 A4 Page
  if (includeRevision) {
    pages.push({
      id: 'revision',
      pageNumber: pageCounter++,
      sectionTitle: '৬. 🎯 পরীক্ষার আগের রাতের এক নজরে রিভিশন ছকসমূহ',
      categoryTag: 'রিভিশন চার্ট',
      content: (
        <div className="space-y-4">
          <div className={`p-3 rounded-xl flex items-center justify-between ${
            isColor ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-black border-b-2 border-black'
          }`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 block">
                ৬. 🎯 পরীক্ষার আগের রাতের এক নজরে রিভিশন চার্ট
              </span>
              <h4 className="text-sm sm:text-base font-bold">
                বিখ্যাত গ্রন্থ ও রচয়িতা এবং চিন্তাবিদ ও মতবাদের দ্রুত সারসংক্ষেপ
              </h4>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-200 font-bold">
              রিভিশন টেবিল
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl border border-slate-300 bg-white space-y-2">
              <h5 className={`font-bold text-xs pb-1 border-b ${isColor ? 'text-indigo-900 border-indigo-200' : 'text-black'}`}>
                📚 বিখ্যাত গ্রন্থ ও রচয়িতা
              </h5>
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className={isColor ? 'bg-indigo-50 text-indigo-900' : 'bg-slate-100'}>
                    <th className="p-1 font-bold">গ্রন্থের নাম</th>
                    <th className="p-1 font-bold">লেখক / রাষ্ট্রবিজ্ঞানী</th>
                  </tr>
                </thead>
                <tbody>
                  {revisionGuideData.booksAndAuthors.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 font-serif-bn">
                      <td className="p-1 font-medium">{row.col1}</td>
                      <td className="p-1 font-semibold">{row.col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl border border-slate-300 bg-white space-y-2">
              <h5 className={`font-bold text-xs pb-1 border-b ${isColor ? 'text-indigo-900 border-indigo-200' : 'text-black'}`}>
                🧠 চিন্তাবিদ ও তাদের মূল মতবাদ
              </h5>
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className={isColor ? 'bg-indigo-50 text-indigo-900' : 'bg-slate-100'}>
                    <th className="p-1 font-bold">চিন্তাবিদ</th>
                    <th className="p-1 font-bold">মূল অবদান ও মতবাদ</th>
                  </tr>
                </thead>
                <tbody>
                  {revisionGuideData.theoriesAndThinkers.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 font-serif-bn">
                      <td className="p-1 font-semibold">{row.col1}</td>
                      <td className="p-1">{row.col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    });
  }

  const totalPages = pages.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible">
      
      {/* Outer Modal Container */}
      <div className="bg-slate-100 rounded-2xl w-full max-w-5xl max-h-[96vh] flex flex-col shadow-2xl border border-slate-300 print:border-none print:shadow-none print:max-h-none print:max-w-none print:w-full print:rounded-none print:bg-white">
        
        {/* ================= STICKY TOP CONTROLS (NO-PRINT) ================= */}
        <div className="p-4 sm:p-5 border-b border-slate-300 flex flex-col gap-3 no-print bg-white rounded-t-2xl shadow-xs shrink-0">
          
          {/* Main Title & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold">
                  <Download className="w-4 h-4" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  রঙিন PDF প্রিন্ট প্রিভিউ (Print Preview with Page Numbers)
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                প্রতিটি পৃষ্ঠার ওপরে ও নিচে স্বয়ংক্রিয় পৃষ্ঠা নম্বর (<strong className="text-slate-900 font-bold">পৃষ্ঠা ১ থেকে {totalPages}</strong>) সক্রিয় রয়েছে
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 hover:from-blue-800 hover:to-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>পিডিএফ ডাউনলোড / প্রিন্ট করুন</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                title="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-snug">
              <strong>💡 অন-স্ক্রিন প্রিভিউ ও পেজ নম্বর:</strong> নিচে প্রতিটি পাতা বাস্তব A4 শিট আকারে প্রদর্শিত হচ্ছে এবং প্রতিটি পাতার উপরে ও নিচে স্পষ্ট <strong>'পৃষ্ঠা X / {totalPages}'</strong> নম্বর দেওয়া আছে। প্রিন্ট করার সময় প্রিন্টার ডায়ালগে <strong>Destination: "Save as PDF"</strong> এবং <strong>"Background graphics"</strong> অন রাখুন।
            </div>
          </div>

          {/* Interactive Customization Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200 text-xs">
            {/* Color Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                কালার থিম:
              </span>
              <div className="inline-flex rounded-lg bg-slate-200 p-0.5">
                <button
                  onClick={() => setColorMode('color')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    colorMode === 'color' 
                      ? 'bg-white text-blue-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🎨 সম্পূর্ণ রঙিন মোড
                </button>
                <button
                  onClick={() => setColorMode('mono')}
                  className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    colorMode === 'mono' 
                      ? 'bg-white text-slate-900 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🖨️ ইকোনমিক সাদাকালো
                </button>
              </div>
            </div>

            {/* Font Size Switcher */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-slate-500" />
                লেখার সাইজ:
              </span>
              <div className="inline-flex rounded-lg bg-slate-200 p-0.5">
                <button
                  onClick={() => setFontSize('compact')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    fontSize === 'compact' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                  title="কম পৃষ্ঠায় সব প্রশ্ন প্রিন্ট করার জন্য"
                >
                  ছোট
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    fontSize === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                  title="প্রমিত আরামদায়ক সাইজ"
                >
                  স্বাভাবিক
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    fontSize === 'large' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                  title="বড় স্পষ্ট লেখার জন্য"
                >
                  বড়
                </button>
              </div>
            </div>

            {/* Page Count Badge */}
            <div className="px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-full font-bold flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-emerald-700" />
              <span>মোট পৃষ্ঠা: {totalPages}টি (প্রশ্ন: {totalQuestionsCount}টি)</span>
            </div>
          </div>

          {/* Page Jumper Navigation Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none border-t border-slate-200">
            <span className="text-xs font-bold text-slate-800 whitespace-nowrap mr-1 flex items-center gap-1">
              <span>পেজ জাম্প:</span>
            </span>
            {pages.map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => scrollToPage(p.pageNumber)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-700 transition-all cursor-pointer shrink-0"
                title={p.sectionTitle}
              >
                পৃষ্ঠা {p.pageNumber}
              </button>
            ))}
          </div>

          {/* Section Selection Checkboxes */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-slate-200 text-xs">
            <span className="font-bold text-slate-800">সেকশন ফিল্টার:</span>
            
            <label className="flex items-center gap-1 cursor-pointer bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <input
                type="checkbox"
                checked={includeCover}
                onChange={(e) => setIncludeCover(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-slate-800 font-medium">প্রচ্ছদ</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <input
                type="checkbox"
                checked={includePartA}
                onChange={(e) => setIncludePartA(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span className="text-emerald-900 font-bold">ক-বিভাগ (৯৭)</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              <input
                type="checkbox"
                checked={includePartB}
                onChange={(e) => setIncludePartB(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-blue-900 font-bold">খ-বিভাগ (৬০)</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              <input
                type="checkbox"
                checked={includePartC}
                onChange={(e) => setIncludePartC(e.target.checked)}
                className="rounded text-purple-600"
              />
              <span className="text-purple-900 font-bold">গ-বিভাগ (৪৪)</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              <input
                type="checkbox"
                checked={includeMcq}
                onChange={(e) => setIncludeMcq(e.target.checked)}
                className="rounded text-teal-600"
              />
              <span className="text-teal-900 font-bold">MCQ (৬৪)</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <input
                type="checkbox"
                checked={includeImportant}
                onChange={(e) => setIncludeImportant(e.target.checked)}
                className="rounded text-amber-600"
              />
              <span className="text-amber-900 font-bold">টপ সাজেশন</span>
            </label>

            <label className="flex items-center gap-1 cursor-pointer bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              <input
                type="checkbox"
                checked={includeRevision}
                onChange={(e) => setIncludeRevision(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span className="text-indigo-900 font-bold">রিভিশন চার্ট</span>
            </label>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => selectAll(true)}
                className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
              >
                সব সিলেক্ট
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => selectAll(false)}
                className="text-[11px] text-slate-500 hover:underline cursor-pointer"
              >
                সব মুছুন
              </button>
            </div>
          </div>
        </div>

        {/* ================= SCROLLABLE PRINTABLE PAGES CONTAINER ================= */}
        <div 
          ref={scrollContainerRef}
          className="p-3 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8 bg-slate-200/70 print:p-0 print:overflow-visible print:bg-white print:space-y-0"
        >
          {pages.map((page) => (
            <div
              key={page.id}
              id={`pdf-page-${page.pageNumber}`}
              className="pdf-page-sheet bg-white rounded-2xl shadow-xl border border-slate-300 p-5 sm:p-8 space-y-5 print:rounded-none print:shadow-none print:border-none print:p-0 print:space-y-4 print:min-h-[1050px] relative transition-all"
            >
              
              {/* ================= AUTHENTIC UNIVERSITY EXAMINATION QUESTION PAPER HEADER (পরীক্ষার হিডিং) ================= */}
              <div className="border-b-2 border-slate-900 pb-3 mb-4 font-serif-bn space-y-1.5 print:pb-2 print:mb-3">
                {/* Top strip: Running Section & Page Counter */}
                <div className="flex items-center justify-between text-[11px] font-sans text-slate-600 pb-1 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-wider uppercase text-slate-900">
                      জাতীয় বিশ্ববিদ্যালয় · চূড়ান্ত পরীক্ষা সংকলন
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="hidden sm:inline font-semibold text-slate-700">
                      {page.sectionTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xs tracking-wide">
                      📄 পৃষ্ঠা {page.pageNumber} / {totalPages}
                    </span>
                  </div>
                </div>

                {/* Central Formal Examination Header */}
                <div className="text-center space-y-0.5 pt-1">
                  <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700">
                    জাতীয় বিশ্ববিদ্যালয় · {subjectInfo.degreeCourse} ({subjectInfo.examSession})
                  </h3>
                  <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-950 font-serif-bn">
                    বিষয়: {subjectInfo.subjectName}
                  </h1>
                  <h2 className="text-sm sm:text-lg font-bold text-indigo-950">
                    পত্র: {subjectInfo.paperName}
                  </h2>
                </div>

                {/* Exam Details Row: Time, Subject Code, Full Marks */}
                <div className="flex items-center justify-between text-xs font-sans font-semibold pt-1 px-1 border-t border-slate-300 text-slate-900">
                  <div className="text-left">
                    <span className="opacity-75 font-normal">সময়: </span>
                    <strong className="font-bold">{subjectInfo.timeLimit}</strong>
                  </div>
                  <div className="text-center font-bold">
                    <span className="opacity-75 font-normal">বিষয় কোড: </span>
                    <strong className="font-mono text-slate-950">{subjectInfo.paperCode}</strong>
                  </div>
                  <div className="text-right">
                    <span className="opacity-75 font-normal">পূর্ণমান: </span>
                    <strong className="font-bold">৮০ (লিখিত)</strong>
                  </div>
                </div>

                {/* Examination Directive Note */}
                <div className="text-[10px] sm:text-[11px] italic text-slate-600 font-sans text-center pt-0.5">
                  [বিশেষ দ্রষ্টব্য: ডানপার্শ্বস্থ সংখ্যা প্রশ্নের পূর্ণমান জ্ঞাপক। প্রতিটি প্রশ্নের পরীক্ষোপযোগী পূর্ণাঙ্গ প্রামাণ্য উত্তর নিচে সংকলিত]
                </div>
              </div>

              {/* PAGE SHEET MAIN CONTENT */}
              <div className="min-h-[700px] print:min-h-0 space-y-4">
                {page.content}
              </div>

              {/* PAGE SHEET RUNNING FOOTER (WITH VISUAL PAGE NUMBER & AUTHOR BRANDING) */}
              <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 font-sans print:pt-2">
                <div className="text-[11px] text-slate-500">
                  ব্যতিক্রম সর্বশেষ চূড়ান্ত সাজেশনস ও বিগত ২০ বছরের বোর্ড প্রশ্ন-উত্তর
                </div>
                
                <div className="text-xs text-slate-800 font-medium">
                  পরিকল্পনা ও সংকলনে: <strong className="font-bold text-slate-950">মোঃ মেহেদী হাসান</strong> · fb.com/mehedi3643
                </div>

                {/* Explicit Page Number Pill at Bottom */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 font-bold text-xs text-slate-900 shadow-2xs">
                  <span>পৃষ্ঠা {page.pageNumber}</span>
                  <span className="text-slate-400 font-normal">/</span>
                  <span className="text-slate-600">{totalPages}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
