import React, { useState, useEffect } from 'react';
import { partAQuestions } from '../data/partAQuestions';
import { partBQuestions } from '../data/partBQuestions';
import { partCQuestions } from '../data/partCQuestions';
import { subjectInfo } from '../data/subjectInfo';
import { ActiveTab } from './Navbar';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Target, 
  Flame, 
  BookOpen, 
  ArrowRight, 
  Award, 
  AlertCircle,
  RotateCcw,
  Sparkles,
  Download,
  Check
} from 'lucide-react';
import { toBnDigit } from './PomodoroTimer';

interface StudyStatisticsViewProps {
  completedIdsA: number[];
  completedIdsB: number[];
  completedIdsC: number[];
  onNavigateToTab: (tab: ActiveTab) => void;
  onOpenPrint?: () => void;
  onResetProgress?: () => void;
}

export const StudyStatisticsView: React.FC<StudyStatisticsViewProps> = ({
  completedIdsA,
  completedIdsB,
  completedIdsC,
  onNavigateToTab,
  onOpenPrint,
  onResetProgress
}) => {
  const [chartType, setChartType] = useState<'vertical' | 'horizontal'>('vertical');
  const [activeMetricHover, setActiveMetricHover] = useState<string | null>(null);

  // Load Pomodoro stats from localStorage
  const [pomoSessions, setPomoSessions] = useState(0);
  const [pomoMinutes, setPomoMinutes] = useState(0);

  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem('nu_pomo_completed_sessions');
      const savedMinutes = localStorage.getItem('nu_pomo_total_minutes');
      if (savedSessions) setPomoSessions(parseInt(savedSessions, 10));
      if (savedMinutes) setPomoMinutes(parseInt(savedMinutes, 10));
    } catch {
      // ignore
    }
  }, []);

  const totalA = partAQuestions.length;
  const countA = completedIdsA.length;
  const percentA = totalA > 0 ? Math.round((countA / totalA) * 100) : 0;

  const totalB = partBQuestions.length;
  const countB = completedIdsB.length;
  const percentB = totalB > 0 ? Math.round((countB / totalB) * 100) : 0;

  const totalC = partCQuestions.length;
  const countC = completedIdsC.length;
  const percentC = totalC > 0 ? Math.round((countC / totalC) * 100) : 0;

  const totalQuestions = totalA + totalB + totalC;
  const totalCompleted = countA + countB + countC;
  const overallPercent = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  // Weighted Exam Readiness (Part A = 10 marks, Part B = 20 marks, Part C = 50 marks => Total 80)
  // Weighted percentage = ( (percentA * 10) + (percentB * 20) + (percentC * 50) ) / 80
  const weightedReadiness = Math.round(
    ((percentA * 10) + (percentB * 20) + (percentC * 50)) / 80
  );

  // Bar chart data specification
  const sectionMetrics = [
    {
      id: 'partA' as ActiveTab,
      label: 'ক-বিভাগ',
      sublabel: 'অতি সংক্ষিপ্ত (১ নম্বর)',
      fullName: 'ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি',
      completed: countA,
      total: totalA,
      remaining: totalA - countA,
      percentage: percentA,
      examMarks: '১০ নম্বর',
      color: 'emerald',
      barColor: 'bg-emerald-500',
      barHoverColor: 'hover:bg-emerald-600',
      bgLight: 'bg-emerald-50',
      borderLight: 'border-emerald-200',
      textColor: 'text-emerald-800',
      gradient: 'from-emerald-500 to-teal-600',
      accentHex: '#059669',
      advice: 'প্রতিদিন ১০-১৫টি করে নিয়মিত মুখস্থ ও লিখে রিভিশন দিন।'
    },
    {
      id: 'partB' as ActiveTab,
      label: 'খ-বিভাগ',
      sublabel: 'সংক্ষিপ্ত (৪ নম্বর)',
      fullName: 'খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি',
      completed: countB,
      total: totalB,
      remaining: totalB - countB,
      percentage: percentB,
      examMarks: '২০ নম্বর',
      color: 'sky',
      barColor: 'bg-sky-500',
      barHoverColor: 'hover:bg-sky-600',
      bgLight: 'bg-sky-50',
      borderLight: 'border-sky-200',
      textColor: 'text-sky-800',
      gradient: 'from-sky-500 to-blue-600',
      accentHex: '#0284c7',
      advice: 'পয়েন্টভিত্তিক কাঠামো ও প্রামাণ্য সংজ্ঞা মুখস্থ রাখুন।'
    },
    {
      id: 'partC' as ActiveTab,
      label: 'গ-বিভাগ',
      sublabel: 'রচনামূলক (১০ নম্বর)',
      fullName: 'গ-বিভাগ: রচনামূলক প্রশ্নাবলি',
      completed: countC,
      total: totalC,
      remaining: totalC - countC,
      percentage: percentC,
      examMarks: '৫০ নম্বর',
      color: 'indigo',
      barColor: 'bg-indigo-500',
      barHoverColor: 'hover:bg-indigo-600',
      bgLight: 'bg-indigo-50',
      borderLight: 'border-indigo-200',
      textColor: 'text-indigo-800',
      gradient: 'from-indigo-500 to-purple-600',
      accentHex: '#6366f1',
      advice: 'ভূমিকা, তুলনামূলক ছক ও উপসংহারসহ পূর্ণাঙ্গ বিশ্লেষণ আয়ত্ত করুন।'
    },
  ];

  // Identify strength vs focus areas
  const sortedByPercent = [...sectionMetrics].sort((a, b) => b.percentage - a.percentage);
  const strongest = sortedByPercent[0];
  const weakest = sortedByPercent[sortedByPercent.length - 1];

  // Get status level badge
  const getReadinessLevel = (pct: number) => {
    if (pct >= 85) return { text: 'চমৎকার প্রস্তুতি (A+ প্রত্যাশী)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (pct >= 60) return { text: 'সন্তোষজনক প্রস্তুতি (প্রথম শ্রেণি)', color: 'text-blue-700 bg-blue-100 border-blue-300' };
    if (pct >= 30) return { text: 'চলমান অগ্রগতি (নিয়মিত অধ্যয়ন আবশ্যক)', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    return { text: 'প্রাথমিক পর্যায় (পড়া শুরু করুন)', color: 'text-slate-700 bg-slate-100 border-slate-300' };
  };

  const status = getReadinessLevel(weightedReadiness);

  return (
    <div className="space-y-8 py-2">
      
      {/* ================= HERO HEADER ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>রিয়েল-টাইম রিভিশন ট্র্যাকার</span>
              <span>·</span>
              <span>{subjectInfo.paperCode}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-bn">
              স্টাডি পরিসংখ্যান ও প্রগ্রেস ড্যাশবোর্ড
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              ক, খ ও গ-বিভাগের প্রশ্ন পড়া এবং রিভিশন সমাপ্তির হারের তুলনামূলক বার চার্ট অ্যানালিটিক্স। কোনো বিভাগে পিছিয়ে থাকলে এখনই লক্ষ্য নির্ধারণ করুন।
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenPrint && (
              <button
                onClick={onOpenPrint}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/20"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>রঙিন PDF ডাউনলোড</span>
              </button>
            )}
            <button
              onClick={() => onNavigateToTab('overview')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all cursor-pointer"
            >
              বিষয় পরিচিতি
            </button>
          </div>
        </div>

        {/* Subtle Background Glow */}
        <div className="absolute right-0 bottom-0 -mb-12 -mr-12 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      </div>

      {/* ================= 4 TOP KPI SUMMARY CARDS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Overall Question Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">মোট সমাপ্ত প্রশ্ন</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {toBnDigit(totalCompleted)} <span className="text-xs font-normal text-slate-500">/ {toBnDigit(totalQuestions)}টি</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-emerald-600">{toBnDigit(overallPercent)}% সম্পন্ন</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{toBnDigit(totalQuestions - totalCompleted)}টি বাকি</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Weighted Exam Readiness */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">লিখিত পরীক্ষার প্রস্তুতি স্কোর</span>
            <Target className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
              {toBnDigit(weightedReadiness)}%
            </div>
            <div className="mt-1 text-xs">
              <span className="text-slate-600 font-medium">৮০ নম্বরের লিখিত মান অনুযায়ী</span>
            </div>
          </div>
          <div className="mt-2.5">
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.color}`}>
              {status.text}
            </span>
          </div>
        </div>

        {/* KPI 3: Pomodoro Sessions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">পোমোডোরো রিভিশন সেশন</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {toBnDigit(pomoSessions)} <span className="text-xs font-normal text-slate-500">টি সেশন</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-600">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>মোট পড়াশোনা: <strong>{toBnDigit(pomoMinutes)}</strong> মিনিট</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500">
            {pomoSessions > 0 ? 'নিয়মিত ধারাবাহিকতা অব্যাহত রাখুন!' : 'নিচের ফ্লোটিং টাইমার দিয়ে রিভিশন শুরু করুন'}
          </div>
        </div>

        {/* KPI 4: Recommendation Highlight */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">অগ্রাধিকার পরামর্শ</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{weakest.percentage < 50 ? `মনোযোগ দিন: ${weakest.label}` : 'সব বিভাগেই চমৎকার গতি'}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-2">
              {weakest.advice}
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab(weakest.id)}
            className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>{weakest.label} অনুশীলন করুন</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* ================= PRIMARY BAR CHART VISUALIZATION SECTION ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Chart Header & Toggle Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif-bn">
                বিভাগভিত্তিক সমাপ্তির হার (Completion Rates by Section)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ক-বিভাগ (৯৭টি), খ-বিভাগ (৬০টি) ও গ-বিভাগ (৪৪টি)-এর পড়া সম্পন্ন হওয়ার ভিজ্যুয়াল বার চার্ট
            </p>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">চার্ট ভিউ:</span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setChartType('vertical')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  chartType === 'vertical'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 উল্লম্ব বার চার্ট
              </button>
              <button
                onClick={() => setChartType('horizontal')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  chartType === 'horizontal'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📋 অনুভূমিক প্রগ্রেস
              </button>
            </div>
          </div>
        </div>

        {/* -------------------- VIEW 1: VERTICAL COLUMN / BAR CHART -------------------- */}
        {chartType === 'vertical' && (
          <div className="space-y-4">
            
            {/* Chart Grid Canvas */}
            <div className="relative h-64 sm:h-72 w-full pt-8 pb-4 flex items-end justify-around border-b border-l border-slate-300">
              
              {/* Y-Axis Horizontal Gridlines & Percentage Labels */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between text-[11px] text-slate-400 pl-1 pr-2">
                <div className="w-full flex items-center">
                  <span className="w-10 text-right pr-2">১০০%</span>
                  <div className="flex-1 border-b border-dashed border-slate-200"></div>
                </div>
                <div className="w-full flex items-center">
                  <span className="w-10 text-right pr-2">৭৫%</span>
                  <div className="flex-1 border-b border-dashed border-slate-200"></div>
                </div>
                <div className="w-full flex items-center">
                  <span className="w-10 text-right pr-2">৫০%</span>
                  <div className="flex-1 border-b border-dashed border-slate-200"></div>
                </div>
                <div className="w-full flex items-center">
                  <span className="w-10 text-right pr-2">২৫%</span>
                  <div className="flex-1 border-b border-dashed border-slate-200"></div>
                </div>
                <div className="w-full flex items-center">
                  <span className="w-10 text-right pr-2">০%</span>
                  <div className="flex-1 border-b border-slate-300"></div>
                </div>
              </div>

              {/* 3 Section Columns */}
              {sectionMetrics.map((sec) => {
                // Ensure minimum height so even 0% shows a small baseline block
                const barHeight = Math.max(sec.percentage, 4);

                return (
                  <div 
                    key={sec.id}
                    className="relative z-10 flex flex-col items-center w-20 sm:w-28 h-full justify-end group cursor-pointer"
                    onClick={() => onNavigateToTab(sec.id)}
                    onMouseEnter={() => setActiveMetricHover(sec.id)}
                    onMouseLeave={() => setActiveMetricHover(null)}
                  >
                    {/* Top Floating Badge on Bar */}
                    <div className="mb-2 transition-all transform group-hover:-translate-y-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r ${sec.gradient}`}>
                        {toBnDigit(sec.percentage)}%
                      </span>
                    </div>

                    {/* The Visual Animated Bar Column */}
                    <div className="w-12 sm:w-16 bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end border border-slate-200 shadow-inner">
                      <div
                        className={`w-full bg-gradient-to-t ${sec.gradient} rounded-t-xl transition-all duration-700 ease-out group-hover:brightness-110 shadow-sm`}
                        style={{ height: `${barHeight}%` }}
                      >
                        {/* Shimmer effect inside bar */}
                        <div className="w-full h-full bg-white/10 opacity-50"></div>
                      </div>
                    </div>

                    {/* Question Count Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-semibold pointer-events-none whitespace-nowrap shadow-lg z-20">
                      {toBnDigit(sec.completed)} / {toBnDigit(sec.total)} সমাপ্ত
                    </div>
                  </div>
                );
              })}

            </div>

            {/* X-Axis Labels & Detail Pills */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              {sectionMetrics.map((sec) => (
                <div 
                  key={sec.id} 
                  onClick={() => onNavigateToTab(sec.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeMetricHover === sec.id ? `${sec.bgLight} ${sec.borderLight} shadow-sm` : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-center gap-1">
                    <span>{sec.label}</span>
                    <span className="text-[10px] font-medium text-slate-500">({sec.examMarks})</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                    {toBnDigit(sec.completed)}/{toBnDigit(sec.total)} সমাপ্ত
                  </div>
                  <div className="mt-1">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${sec.bgLight} ${sec.textColor} border ${sec.borderLight}`}>
                      {toBnDigit(sec.percentage)}% শেষ
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* -------------------- VIEW 2: DETAILED HORIZONTAL PROGRESS BARS -------------------- */}
        {chartType === 'horizontal' && (
          <div className="space-y-5">
            {sectionMetrics.map((sec) => (
              <div 
                key={sec.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all space-y-3"
              >
                {/* Section Title and Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${sec.gradient}`}></span>
                    <h3 className="font-bold text-slate-900">
                      {sec.fullName}
                    </h3>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 font-semibold">{sec.examMarks}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-600 font-medium">
                      সম্পন্ন: <strong className="text-slate-900">{toBnDigit(sec.completed)}</strong>/{toBnDigit(sec.total)}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">
                      বাকি: <strong>{toBnDigit(sec.remaining)}</strong>টি
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${sec.bgLight} ${sec.textColor} border ${sec.borderLight}`}>
                      {toBnDigit(sec.percentage)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner flex">
                  <div
                    className={`h-full bg-gradient-to-r ${sec.gradient} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${sec.percentage}%` }}
                  />
                </div>

                {/* Guidance Footer */}
                <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                  <span className="text-[11px] text-slate-600 italic">
                    💡 {sec.advice}
                  </span>
                  <button
                    onClick={() => onNavigateToTab(sec.id)}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer text-xs shrink-0 ml-2"
                  >
                    <span>অনুশীলন করুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= 3 SECTION DEEP-DIVE CARDS WITH PROGRESS ACTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectionMetrics.map((sec) => (
          <div 
            key={sec.id}
            className={`rounded-2xl border ${sec.borderLight} bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${sec.bgLight} ${sec.textColor} border ${sec.borderLight}`}>
                  {sec.label}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {sec.examMarks}
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {sec.sublabel}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {sec.advice}
                </p>
              </div>

              {/* Progress dial & stats */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">সমাপ্তি অগ্রগতি</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {toBnDigit(sec.percentage)}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px]">প্রশ্ন পরিসংখ্যান</span>
                  <span className="font-semibold text-slate-700">
                    {toBnDigit(sec.completed)} / {toBnDigit(sec.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => onNavigateToTab(sec.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${sec.gradient} hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <span>{sec.label} পড়তে যান</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= STUDY STRATEGY & BALANCED REVISION GUIDE ================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif-bn">
            ফার্স্ট ক্লাস (A / A+) অর্জনে সমতাভিত্তিক পড়াশোনার ফর্মুলা
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>১. ক-বিভাগে ১০-এ ১০ নিশ্চিত করুন</span>
            </div>
            <p className="text-emerald-800/90 leading-relaxed">
              ক-বিভাগের ৯৭টি প্রশ্নের উত্তর ছোট ও নিখুঁত। এখানে পূর্ণ ১০ নম্বর পাওয়া সবচেয়ে সহজ এবং এটি পরীক্ষকের ওপর ইতিবাচক প্রভাব ফেলে।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1.5">
            <div className="font-bold text-sky-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-sky-600" />
              <span>২. খ-বিভাগে পয়েন্ট ও সংজ্ঞা কাঠামো</span>
            </div>
            <p className="text-sky-800/90 leading-relaxed">
              প্রতিটি ৪ নম্বরের প্রশ্নের জন্য ভূমিকা, ৪-৫টি স্পষ্ট পয়েন্ট এবং সংক্ষিপ্ত উপসংহার লিখুন। অপ্রাসঙ্গিক গল্প এড়িয়ে মূল বিষয় উপস্থাপন করুন।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
            <div className="font-bold text-indigo-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-indigo-600" />
              <span>৩. গ-বিভাগে ৫০ নম্বরের তুলনামূলক বিশ্লেষণ</span>
            </div>
            <p className="text-indigo-800/90 leading-relaxed">
              পরীক্ষার অর্ধেক নম্বরের বেশি (৫০ নম্বর) গ-বিভাগে। প্লেটো, এরিস্টটল, ম্যাকিয়াভেলি ও রুশোর তত্ত্বের জন্য তুলনামূলক ছক ও অ্যাকাডেমিক উদ্ধৃতি ব্যবহার করুন।
            </p>
          </div>
        </div>

        {/* Global Progress Reset Warning / Action */}
        {totalCompleted > 0 && onResetProgress && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>আপনি কি নতুন করে প্রস্তুতি যাচাই করতে চান?</span>
            <button
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-rose-600 underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>সকল প্রশ্নের চেকমার্ক রিসেট করুন</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
