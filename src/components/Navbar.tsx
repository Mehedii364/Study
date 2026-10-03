import React from 'react';
import { Search, Printer, Download, BookOpen, CheckSquare, Sparkles, BarChart3 } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export type ActiveTab = 
  | 'overview' 
  | 'partA' 
  | 'partB' 
  | 'partC' 
  | 'mcq' 
  | 'important' 
  | 'repeated' 
  | 'revision' 
  | 'statistics'
  | 'pastPapers'
  | 'warnings' 
  | 'qualityCheck';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenPrint: () => void;
  completedCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenPrint,
  completedCount,
  totalCount
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const navItems: { id: ActiveTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'বিষয় পরিচিতি' },
    { id: 'statistics', label: '📊 পরিসংখ্যান', badge: `${percent}%` },
    { id: 'partA', label: '১. ক-বিভাগ', badge: '৯৭' },
    { id: 'partB', label: '২. খ-বিভাগ', badge: '৬০' },
    { id: 'partC', label: '৩. গ-বিভাগ', badge: '৪৪' },
    { id: 'mcq', label: '৪. MCQ ব্যাংক', badge: '৬৪' },
    { id: 'important', label: '৫. 🔥 গুরুত্বপূর্ণ', badge: 'টপ' },
    { id: 'repeated', label: '৬. 🔁 পুনরাবৃত্তি' },
    { id: 'revision', label: '৭. 🎯 রিভিশন' },
    { id: 'pastPapers', label: 'বিগত প্রশ্নপত্র', badge: '৬ বছর' },
    { id: 'warnings', label: '৮. ⚠️ সতর্কতা' },
    { id: 'qualityCheck', label: '৯. ✅ কোয়ালিটি চেক' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print transition-all">
      {/* Zone 1, 2, 3 Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('overview')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                রাষ্ট্রবিজ্ঞান ১ম পত্র
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium ml-2">
                রাজনৈতিক তত্ত্ব · কোড ১১১৯০১
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line with scroll) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium whitespace-nowrap rounded-md transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    activeTab === item.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative w-36 sm:w-52">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="প্রশ্ন, সাল বা বিষয় খুঁজুন..."
                className="w-full pl-8 pr-2 py-1.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>

            {/* Live Online Learners Indicator */}
            <div className="hidden lg:flex items-center">
              <VisitorCounter compact />
            </div>

            {/* Study Progress Statistics Button */}
            <button
              onClick={() => setActiveTab('statistics')}
              title="স্টাডি পরিসংখ্যান ও প্রগ্রেস চার্ট দেখুন"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'statistics'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{percent}% সমাপ্ত</span>
            </button>

            {/* Color PDF Download Action */}
            <button
              onClick={onOpenPrint}
              title="সম্পূর্ণ রঙিন PDF ডাউনলোড ও প্রিন্ট"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-lg shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">রঙিন PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Author Facebook Link */}
            <a
              href="https://www.facebook.com/mehedi3643"
              target="_blank"
              rel="noopener noreferrer"
              title="মোঃ মেহেদী হাসান / MD Mehedi Hasan (Facebook Profile)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="hidden md:inline">মেহেদী হাসান</span>
            </a>
          </div>
        </div>

        {/* Mobile secondary navigation scroller */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap rounded-md shrink-0 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-1 text-[10px] opacity-80">({item.badge})</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
