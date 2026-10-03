import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { SubjectHeader } from './components/SubjectHeader';
import { PartAView } from './components/PartAView';
import { PartBView } from './components/PartBView';
import { PartCView } from './components/PartCView';
import { McqBankView } from './components/McqBankView';
import { ImportantQuestionsView } from './components/ImportantQuestionsView';
import { RepeatedQuestionsView } from './components/RepeatedQuestionsView';
import { RevisionGuideView } from './components/RevisionGuideView';
import { QualityAuditView } from './components/QualityAuditView';
import { PastPapersView } from './components/PastPapersView';
import { PrintBookletModal } from './components/PrintBookletModal';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AudioStudyPlayer } from './components/AudioStudyPlayer';
import { VisitorCounter } from './components/VisitorCounter';
import { StudyStatisticsView } from './components/StudyStatisticsView';
import { partAQuestions } from './data/partAQuestions';
import { partBQuestions } from './data/partBQuestions';
import { partCQuestions } from './data/partCQuestions';
import { subjectInfo } from './data/subjectInfo';
import { BookOpen, CheckCircle, Flame, ArrowUp, Download } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Mastered / Completed questions tracker
  const [completedIdsA, setCompletedIdsA] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('deg_pol_completed_a');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedIdsB, setCompletedIdsB] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('deg_pol_completed_b');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedIdsC, setCompletedIdsC] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('deg_pol_completed_c');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deg_pol_completed_a', JSON.stringify(completedIdsA));
    } catch {}
  }, [completedIdsA]);

  useEffect(() => {
    try {
      localStorage.setItem('deg_pol_completed_b', JSON.stringify(completedIdsB));
    } catch {}
  }, [completedIdsB]);

  useEffect(() => {
    try {
      localStorage.setItem('deg_pol_completed_c', JSON.stringify(completedIdsC));
    } catch {}
  }, [completedIdsC]);

  const toggleCompleteA = (id: number) => {
    setCompletedIdsA((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCompleteB = (id: number) => {
    setCompletedIdsB((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCompleteC = (id: number) => {
    setCompletedIdsC((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('আপনি কি সত্যিই ক, খ ও গ-বিভাগের সকল সমাপ্তির চেকমার্ক রিসেট করতে চান?')) {
      setCompletedIdsA([]);
      setCompletedIdsB([]);
      setCompletedIdsC([]);
    }
  };

  const totalQuestions = partAQuestions.length + partBQuestions.length + partCQuestions.length;
  const completedTotal = completedIdsA.length + completedIdsB.length + completedIdsC.length;
  const progressPercent = Math.round((completedTotal / totalQuestions) * 100);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Primary Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        completedCount={completedTotal}
        totalCount={totalQuestions}
      />

      {/* Main Content Viewport */}
      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isPrintModalOpen ? 'no-print' : ''}`}>
        {/* Quick Search Active Banner */}
        {searchQuery.trim() && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <span className="text-xs sm:text-sm text-amber-900">
              অনুসন্ধান করা হচ্ছে: <strong>"{searchQuery}"</strong> (সব সেকশনে ফলাফল পাওয়া যাবে)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-800 underline font-semibold cursor-pointer"
            >
              অনুসন্ধান মুছুন
            </button>
          </div>
        )}

        {/* View Switcher based on Active Tab */}
        {activeTab === 'overview' && (
          <SubjectHeader 
            onSelectTab={setActiveTab} 
            completedPercent={progressPercent}
            onOpenPrint={() => setIsPrintModalOpen(true)}
          />
        )}

        {activeTab === 'partA' && (
          <PartAView
            completedIds={completedIdsA}
            onToggleComplete={toggleCompleteA}
            globalSearchQuery={searchQuery}
          />
        )}

        {activeTab === 'partB' && (
          <PartBView
            completedIds={completedIdsB}
            onToggleComplete={toggleCompleteB}
            globalSearchQuery={searchQuery}
          />
        )}

        {activeTab === 'partC' && (
          <PartCView
            completedIds={completedIdsC}
            onToggleComplete={toggleCompleteC}
            globalSearchQuery={searchQuery}
          />
        )}

        {activeTab === 'mcq' && (
          <McqBankView globalSearchQuery={searchQuery} />
        )}

        {activeTab === 'important' && (
          <ImportantQuestionsView />
        )}

        {activeTab === 'repeated' && (
          <RepeatedQuestionsView />
        )}

        {activeTab === 'revision' && (
          <RevisionGuideView />
        )}

        {activeTab === 'statistics' && (
          <StudyStatisticsView
            completedIdsA={completedIdsA}
            completedIdsB={completedIdsB}
            completedIdsC={completedIdsC}
            onNavigateToTab={setActiveTab}
            onOpenPrint={() => setIsPrintModalOpen(true)}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeTab === 'pastPapers' && (
          <PastPapersView onNavigateToTab={setActiveTab} />
        )}

        {(activeTab === 'warnings' || activeTab === 'qualityCheck') && (
          <QualityAuditView />
        )}
      </main>

      {/* Floating Bottom Preparation Progress, Audio Player, Pomodoro Timer & Scroll To Top */}
      <aside aria-label="Progress and Navigation Controls" className="fixed bottom-4 right-4 z-30 flex items-center gap-2 no-print">
        {/* Study Ambient Audio Player & Read-Aloud */}
        <AudioStudyPlayer />

        {/* Pomodoro Revision Study Timer */}
        <PomodoroTimer />

        <button
          onClick={() => setIsPrintModalOpen(true)}
          title="এক ক্লিকে সম্পূর্ণ রঙিন PDF ডাউনলোড ও প্রিন্ট"
          className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 hover:from-blue-800 hover:to-amber-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg border border-white/20 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">রঙিন PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        {/* Clickable Study Progress Badge */}
        <button
          onClick={() => setActiveTab('statistics')}
          title="স্টাডি পরিসংখ্যান ও প্রগ্রেস চার্ট ড্যাশবোর্ড দেখুন"
          className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-lg border border-slate-700 items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>পড়া শেষ: {completedTotal}/{totalQuestions} ({progressPercent}%)</span>
        </button>
        <button
          onClick={scrollToTop}
          title="উপরে যান"
          className="p-2.5 bg-white text-slate-800 hover:text-slate-950 rounded-xl shadow-lg border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </aside>

      {/* Print Booklet Modal */}
      <PrintBookletModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Clean Editorial Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 no-print text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Visitor and Online Readers Bar */}
          <VisitorCounter />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center sm:text-left">
            <span className="font-bold text-slate-900 block text-sm">
              {subjectInfo.degreeCourse} — {subjectInfo.paperName}
            </span>
            <span className="block text-slate-600">
              ব্যতিক্রম চূড়ান্ত সাজেশনস ও বিগত ২০ বছরের বোর্ড পরীক্ষার প্রামাণ্য অ্যাকাডেমিক সমাধান সম্ভার
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-slate-700">
              <span>পরিকল্পনা ও সার্বিক তত্ত্বাবধানে:</span>
              <a
                href="https://www.facebook.com/mehedi3643"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1.5 underline underline-offset-2 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>মোঃ মেহেদী হাসান / MD Mehedi Hasan</span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('warnings')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              সতর্কতা ও উৎস যাচাই
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('qualityCheck')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              কোয়ালিটি অডিট
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              প্রিন্ট ভিউ
            </button>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
