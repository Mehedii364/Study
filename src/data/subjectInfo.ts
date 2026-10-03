export interface SubjectInfo {
  subjectName: string;
  paperName: string;
  paperCode: string;
  degreeCourse: string;
  examSession: string;
  holdingYear: string;
  fullMarks: number;
  timeLimit: string;
  structure: {
    partA: { name: string; marksPerQuestion: number; totalAnswer: number; totalMarks: number; desc: string };
    partB: { name: string; marksPerQuestion: number; totalAnswer: number; totalMarks: number; desc: string };
    partC: { name: string; marksPerQuestion: number; totalAnswer: number; totalMarks: number; desc: string };
  };
}

export const subjectInfo: SubjectInfo = {
  subjectName: "রাষ্ট্রবিজ্ঞান (Political Science)",
  paperName: "রাজনৈতিক তত্ত্ব (Political Theory) - প্রথম পত্র",
  paperCode: "১১১৯০১ (111901)",
  degreeCourse: "বিএ / বিএসএস ডিগ্রি (পাস) প্রথম বর্ষ",
  examSession: "পরীক্ষা-২০২৫",
  holdingYear: "অনুষ্ঠিতব্য-২০২৬/২৭",
  fullMarks: 80,
  timeLimit: "৩ ঘণ্টা ৩০ মিনিট",
  structure: {
    partA: {
      name: "ক-বিভাগ (অতি সংক্ষিপ্ত প্রশ্নাবলি)",
      marksPerQuestion: 1,
      totalAnswer: 10,
      totalMarks: 10,
      desc: "১২টি প্রশ্ন থেকে যে কোনো ১০টির উত্তর দিতে হবে। উত্তর ১-২ লাইনের মধ্যে সুনির্দিষ্ট হতে হবে।"
    },
    partB: {
      name: "খ-বিভাগ (সংক্ষিপ্ত প্রশ্নাবলি)",
      marksPerQuestion: 4,
      totalAnswer: 5,
      totalMarks: 20,
      desc: "৮টি প্রশ্ন থেকে যে কোনো ৫টির উত্তর দিতে হবে। ভূমিকা, মূল পয়েন্ট ও উপসংহারসহ পরীক্ষোপযোগী উত্তর।"
    },
    partC: {
      name: "গ-বিভাগ (রচনামূলক প্রশ্নাবলি)",
      marksPerQuestion: 10,
      totalAnswer: 5,
      totalMarks: 50,
      desc: "৮টি প্রশ্ন থেকে যে কোনো ৫টির পূর্ণাঙ্গ উত্তর দিতে হবে। তাত্ত্বিক প্রেক্ষাপট, তুলনামূলক ছক, বিস্তারিত পয়েন্ট ও মূল্যায়ন।"
    }
  }
};
