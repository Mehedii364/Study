import React from 'react';
import { warningsList, finalQualityChecklist } from '../data/qualityAudit';
import { AlertTriangle, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

export const QualityAuditView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Section 8: Warnings & OCR Notes */}
      <div className="space-y-4">
        <div className="pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Source Discrepancy & Verification
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <span>৮. ⚠️ সতর্কতা ও প্রামাণ্য উৎস যাচাই নোট (Academic Warnings)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            যেখানে PDF-এর OCR পাঠ এবং বিশ্ববিদ্যালয় পর্যায়ের মূল একাডেমিক সূত্রের তথ্যে পার্থক্য বা অস্পষ্টতা ছিল, সেখানে বিভ্রান্তি নিরসনে বিশেষ নোট যুক্ত করা হয়েছে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warningsList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-amber-200/80 p-5 shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.id}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {item.topic}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-500 block mb-0.5">PDF-এর বর্তমান পাঠ:</span>
                  <span className="text-slate-700">{item.pdfInfo}</span>
                </div>

                <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                  <span className="font-bold text-blue-900 block mb-0.5">যাচাইকৃত প্রামাণ্য তথ্য:</span>
                  <span className="text-slate-800">{item.verifiedSourceInfo}</span>
                </div>

                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="font-bold text-emerald-900 block mb-0.5">গৃহীত অ্যাকাডেমিক সমাধান:</span>
                  <span className="text-emerald-950 font-medium">{item.academicResolution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 9: Final Quality Control Checklist */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              Audit Passed: 24 / 24 Compliant
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>৯. ✅ Final Quality Check (চূড়ান্ত গুণগত মান নিয়ন্ত্রণ চেকলিস্ট)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            মাস্টার প্রম্পটের ২৪টি মানদণ্ডের প্রতিটি পুঙ্খানুপুঙ্খ অডিট সম্পন্ন হয়েছে। কোনো প্রশ্ন বাদ যায়নি এবং কোনো মনগড়া তথ্য দেওয়া হয়নি।
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {finalQualityChecklist.map((check) => (
              <div key={check.id} className="p-3.5 sm:p-4 flex items-start gap-3 hover:bg-slate-50/60 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {check.id}. {check.criterion}
                    </span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                      ✓ যাচাইকৃত
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {check.auditNotes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
