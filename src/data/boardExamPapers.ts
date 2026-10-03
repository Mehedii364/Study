export interface BoardExamPaper {
  year: number;
  examTitle: string;
  examDate: string;
  code: string;
  subject: string;
  partAQuestions: { qNo: string; question: string; answer: string; matchedPartAId?: number }[];
  partBQuestions: { qNo: string; question: string; matchedPartBId?: number }[];
  partCQuestions: { qNo: string; question: string; matchedPartCId?: number }[];
}

export const boardExamPapers: BoardExamPaper[] = [
  {
    year: 2019,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০১৯",
    examDate: "২৮/১১/২০১৯",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "'সদগুণই জ্ঞান'—উক্তিটি কার?", answer: "গ্রিক দার্শনিক সক্রেটিস এর।", matchedPartAId: 57 },
      { qNo: "(খ)", question: "\"রাষ্ট্রবিজ্ঞান হলো সর্বশ্রেষ্ঠ বিজ্ঞান\"—উক্তিটি কার?", answer: "এরিস্টটল।", matchedPartAId: 8 },
      { qNo: "(গ)", question: "রাষ্ট্রের সর্বাপেক্ষা গুরুত্বপূর্ণ উপাদান কোনটি?", answer: "সার্বভৌমত্ব।", matchedPartAId: 14 },
      { qNo: "(ঘ)", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত সঠিক মতবাদ কোনটি?", answer: "ঐতিহাসিক বা বিবর্তনমূলক মতবাদ।", matchedPartAId: 21 },
      { qNo: "(ঙ)", question: "সংসদীয় পদ্ধতির সরকার প্রধান কে?", answer: "প্রধানমন্ত্রী।", matchedPartAId: 17 },
      { qNo: "(চ)", question: "সার্বভৌমত্বের একত্ববাদী ধারণার প্রবক্তা কে?", answer: "জন অস্টিন।", matchedPartAId: 26 },
      { qNo: "(ছ)", question: "সরকারের চতুর্থ অঙ্গ কোনটি?", answer: "নির্বাচকমণ্ডলী।", matchedPartAId: 18 },
      { qNo: "(জ)", question: "এরিস্টটলের মতে উত্তম সরকার কোনটি?", answer: "পলিটি (Polity) বা মধ্যতন্ত্র।", matchedPartAId: 69 },
      { qNo: "(ঝ)", question: "আইনের দুটি উৎসের নাম লিখ।", answer: "(ক) প্রথা বা আইনসভা; (খ) ধর্ম বা বিচারকের রায়।", matchedPartAId: 31 },
      { qNo: "(ঞ)", question: "'The Republic' গ্রন্থের লেখক কে?", answer: "প্লেটো।", matchedPartAId: 59 },
      { qNo: "(ট)", question: "'City of God' গ্রন্থটির লেখক কে?", answer: "সেন্ট অগাস্টিন।", matchedPartAId: 97 },
      { qNo: "(ঠ)", question: "'The Prince' গ্রন্থের লেখক কে?", answer: "নিকোলো ম্যাকিয়াভেলি।", matchedPartAId: 81 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাষ্ট্র ও সমাজের মধ্যে পার্থক্য কী?", matchedPartBId: 9 },
      { qNo: "৩", question: "যুক্তরাষ্ট্রীয় সরকার কী?", matchedPartBId: 11 },
      { qNo: "৪", question: "জাতীয়তাবাদের উপাদানসমূহ কী কী?", matchedPartBId: 27 },
      { qNo: "৫", question: "প্লেটোর দার্শনিক রাজার গুণাবলি আলোচনা কর।", matchedPartBId: 39 },
      { qNo: "৬", question: "এরিস্টটলের মতে বিপ্লবের কারণ কী?", matchedPartBId: 44 },
      { qNo: "৭", question: "ম্যাকিয়াভেলিবাদ কী?", matchedPartBId: 53 },
      { qNo: "৮", question: "জন লকের সম্পত্তি তত্ত্বের মূল বক্তব্য কি?", matchedPartBId: 58 },
      { qNo: "৯", question: "রুশোর সাধারণ ইচ্ছা কী?", matchedPartBId: 59 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "রাষ্ট্রবিজ্ঞান অধ্যয়নের পদ্ধতিসমূহ আলোচনা কর।", matchedPartCId: 3 },
      { qNo: "১১", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত সামাজিক চুক্তি মতবাদটি সমালোচনাসহকারে আলোচনা কর।", matchedPartCId: 9 },
      { qNo: "১২", question: "স্বাধীনতা কি? গণতান্ত্রিক রাষ্ট্রে স্বাধীনতার রক্ষাকবচসমূহ আলোচনা কর।", matchedPartCId: 15 },
      { qNo: "১৩", question: "জন অস্টিনের সার্বভৌম তত্ত্বটি সমালোচনাসহকারে ব্যাখ্যা কর।", matchedPartCId: 12 },
      { qNo: "১৪", question: "সমালোচনাসহ প্লেটোর ন্যায়বিচার তত্ত্বটি আলোচনা কর।", matchedPartCId: 23 },
      { qNo: "১৫", question: "রাষ্ট্রচিন্তায় এরিস্টটলের অবদান আলোচনা কর।", matchedPartCId: 27 },
      { qNo: "১৬", question: "জন লককে কেন সংসদীয় গণতন্ত্রের জনক বলা হয়? আলোচনা কর।", matchedPartCId: 39 },
      { qNo: "১৭", question: "মানব প্রকৃতি এবং প্রকৃতির রাজ্য সম্পর্কে টমাস হবসের ধারণা আলোচনা কর।", matchedPartCId: 37 }
    ]
  },
  {
    year: 2020,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০২০",
    examDate: "০৮/০১/২০২২",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "রাষ্ট্রবিজ্ঞানের জনক কে?", answer: "এরিস্টটল।", matchedPartAId: 2 },
      { qNo: "(খ)", question: "\"রাষ্ট্রের চূড়ান্ত ইচ্ছাই হচ্ছে সার্বভৌমত্ব\"—ইহা কার উক্তি?", answer: "অধ্যাপক উইলোবির উক্তি।", matchedPartAId: 25 },
      { qNo: "(গ)", question: "'Natio' বা 'Natus' শব্দের অর্থ কী?", answer: "'জন্ম' বা 'বংশ'।", matchedPartAId: 49 },
      { qNo: "(ঘ)", question: "অধিকারের সর্বশ্রেষ্ঠ রক্ষাকবচ কোনটি?", answer: "আইন।", matchedPartAId: 44 },
      { qNo: "(ঙ)", question: "'রেনেসাঁ' অর্থ কী?", answer: "রেনেসাঁ অর্থ নবজাগরণ বা পুনর্জন্ম।", matchedPartAId: 83 },
      { qNo: "(চ)", question: "প্লেটো কোন দুটি ক্ষেত্রে সাম্যবাদের কথা বলেছেন?", answer: "(ক) পারিবারিক সাম্যবাদ ও (খ) সম্পত্তির সাম্যবাদ।", matchedPartAId: 58 },
      { qNo: "(ছ)", question: "'The Politics' গ্রন্থের রচয়িতা কে?", answer: "এরিস্টটল।", matchedPartAId: 65 },
      { qNo: "(জ)", question: "'দুই তরবারি' তত্ত্বের প্রবক্তা কে?", answer: "সেন্ট অগাস্টিন।", matchedPartAId: 73 },
      { qNo: "(ঝ)", question: "হল্যান্ডের মতে আইনের উৎস কয়টি?", answer: "৬টি।", matchedPartAId: 32 },
      { qNo: "(ঞ)", question: "'Leviathan' গ্রন্থটির লেখক কে?", answer: "টমাস হবস।", matchedPartAId: 85 },
      { qNo: "(ট)", question: "আধুনিক গণতন্ত্রের জনক কে?", answer: "জন লক।", matchedPartAId: 86 },
      { qNo: "(ঠ)", question: "ইংরেজি 'Liberty' শব্দের বাংলা প্রতিশব্দ কী?", answer: "স্বাধীনতা।", matchedPartAId: 39 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাষ্ট্রবিজ্ঞানকে কেন বিজ্ঞান বলা হয়?", matchedPartBId: 2 },
      { qNo: "৩", question: "আইন মান্য করার কারণ লিখ।", matchedPartBId: 30 },
      { qNo: "৪", question: "জাতি ও জাতীয়তার মধ্যে পার্থক্য নির্দেশ কর।", matchedPartBId: 28 },
      { qNo: "৫", question: "স্বাধীনতার রক্ষাকবচগুলো কি?", matchedPartBId: 19 },
      { qNo: "৬", question: "প্লেটোর শিক্ষাব্যবস্থা আধুনিককালে কতটুকু গ্রহণযোগ্য?", matchedPartBId: 38 },
      { qNo: "৭", question: "দাসপ্রথার পক্ষে এরিস্টটলের যুক্তিগুলো কী?", matchedPartBId: 41 },
      { qNo: "৮", question: "সেন্ট টমাস একুইনাসকে মধ্যযুগের এরিস্টটল বলা হয় কেন?", matchedPartBId: 51 },
      { qNo: "৯", question: "রুশোকে কেন সর্বাত্মকবাদী দার্শনিক বলা হয়?", matchedPartBId: 60 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "আধুনিক রাষ্ট্রের কার্যাবলি আলোচনা কর।", matchedPartCId: 6 },
      { qNo: "১১", question: "\"জাতীয়তাবাদ আধুনিক সভ্যতার প্রতি হুমকিস্বরূপ\"—ব্যাখ্যা কর।", matchedPartCId: 18 },
      { qNo: "১২", question: "যুক্তরাষ্ট্রীয় সরকারের সফলতার শর্তাবলি আলোচনা কর।", matchedPartCId: 7 },
      { qNo: "১৩", question: "সেন্ট অগাস্টিনের রাষ্ট্রদর্শন আলোচনা কর।", matchedPartCId: 33 },
      { qNo: "১৪", question: "সমালোচনাসহ প্লেটোর সাম্যবাদ তত্ত্বটি ব্যাখ্যা কর।", matchedPartCId: 22 },
      { qNo: "১৫", question: "এরিস্টটলের বিপ্লবতত্ত্ব সম্পর্কে আলোচনা কর।", matchedPartCId: 26 },
      { qNo: "১৬", question: "ধর্ম, নৈতিকতা ও রাজনীতি সম্পর্কে ম্যাকিয়াভেলির ধারণা আলোচনা কর।", matchedPartCId: 35 },
      { qNo: "১৭", question: "রুশোর সাধারণ ইচ্ছা তত্ত্বটি আলোচনা কর।", matchedPartCId: 40 }
    ]
  },
  {
    year: 2021,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০২১",
    examDate: "১৭/০১/২০২৩",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "'Polis' শব্দের অর্থ কী?", answer: "নগর বা নগররাষ্ট্র।", matchedPartAId: 3 },
      { qNo: "(খ)", question: "রাষ্ট্রের উপাদান কয়টি ও কী কী?", answer: "৪টি: নির্দিষ্ট ভূখণ্ড, জনসমষ্টি, সরকার ও সার্বভৌমত্ব।", matchedPartAId: 13 },
      { qNo: "(গ)", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত সঠিক মতবাদ কোনটি?", answer: "ঐতিহাসিক বা বিবর্তনমূলক মতবাদ।", matchedPartAId: 21 },
      { qNo: "(ঘ)", question: "'The Politics' গ্রন্থটির রচয়িতা কে?", answer: "এরিস্টটল।", matchedPartAId: 65 },
      { qNo: "(ঙ)", question: "\"সদগুণই জ্ঞান\"—উক্তিটি কার?", answer: "সক্রেটিস-এর।", matchedPartAId: 57 },
      { qNo: "(চ)", question: "এরিস্টটলের মতে উত্তম সরকার কোনটি?", answer: "পলিটি (Polity) বা মধ্যতন্ত্র।", matchedPartAId: 69 },
      { qNo: "(ছ)", question: "মধ্যযুগের এরিস্টটল বলা হয় কাকে?", answer: "সেন্ট টমাস একুইনাসকে।", matchedPartAId: 77 },
      { qNo: "(জ)", question: "সংসদীয় ব্যবস্থায় সরকার প্রধান কে?", answer: "প্রধানমন্ত্রী।", matchedPartAId: 17 },
      { qNo: "(ঝ)", question: "সরকারের চতুর্থ অঙ্গ কোনটি?", answer: "নির্বাচকমণ্ডলী।", matchedPartAId: 18 },
      { qNo: "(ঞ)", question: "আধুনিক রাষ্ট্রচিন্তার জনক কে?", answer: "নিকোলো ম্যাকিয়াভেলি।", matchedPartAId: 82 },
      { qNo: "(ট)", question: "\"Law is the command of sovereign\"—উক্তিটি কার?", answer: "জন অস্টিনের।", matchedPartAId: 28 },
      { qNo: "(ঠ)", question: "'The Social Contract' গ্রন্থটির লেখক কে?", answer: "জাঁ জ্যাক রুশো।", matchedPartAId: 94 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাষ্ট্রবিজ্ঞানের সংজ্ঞা দাও।", matchedPartBId: 1 },
      { qNo: "৩", question: "স্বাধীনতা বলতে কী বুঝ?", matchedPartBId: 18 },
      { qNo: "৪", question: "অধিকার বলতে কী বুঝ?", matchedPartBId: 23 },
      { qNo: "৫", question: "জাতীয়তাবাদের উপাদানসমূহ কী কী?", matchedPartBId: 27 },
      { qNo: "৬", question: "প্লেটোর দার্শনিক রাজার গুণাবলি আলোচনা কর।", matchedPartBId: 39 },
      { qNo: "৭", question: "মধ্যযুগের রাষ্ট্রচিন্তার বৈশিষ্ট্য লেখ।", matchedPartBId: 47 },
      { qNo: "৮", question: "ম্যাকিয়াভেলিবাদ কী?", matchedPartBId: 53 },
      { qNo: "৯", question: "রুশোর সাধারণ ইচ্ছা কী?", matchedPartBId: 59 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "রাষ্ট্রবিজ্ঞানের প্রকৃতি ও পরিধি আলোচনা কর।", matchedPartCId: 1 },
      { qNo: "১১", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত বিবর্তনমূলক মতবাদটি আলোচনা কর।", matchedPartCId: 10 },
      { qNo: "১২", question: "আইন কী? আইনের উৎসসমূহ আলোচনা কর।", matchedPartCId: 13 },
      { qNo: "১৩", question: "\"অনিয়ন্ত্রিত আমলাতন্ত্র গণতন্ত্রের জন্য হুমকিস্বরূপ\"—উক্তিটি ব্যাখ্যা কর।", matchedPartCId: 16 },
      { qNo: "১৪", question: "প্লেটোর শিক্ষাতত্ত্ব আলোচনা কর।", matchedPartCId: 24 },
      { qNo: "১৫", question: "রাষ্ট্রচিন্তায় এরিস্টটলের অবদান আলোচনা কর।", matchedPartCId: 27 },
      { qNo: "১৬", question: "জন লককে কেন আধুনিক গণতন্ত্রের জনক বলা হয়? আলোচনা কর।", matchedPartCId: 39 },
      { qNo: "১৭", question: "মানব প্রকৃতি ও প্রকৃতির রাজ্য সম্পর্কে টমাস হবসের ধারণা আলোচনা কর।", matchedPartCId: 37 }
    ]
  },
  {
    year: 2022,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০২২",
    examDate: "০৫/০৬/২০২৪",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "রাষ্ট্রবিজ্ঞান অধ্যয়নের দুটি পদ্ধতির নাম লেখ।", answer: "তুলনামূলক পদ্ধতি ও দার্শনিক পদ্ধতি।", matchedPartAId: 9 },
      { qNo: "(খ)", question: "\"রাষ্ট্রবিজ্ঞান হলো সর্বশ্রেষ্ঠ বিজ্ঞান\"—উক্তিটি কার?", answer: "এরিস্টটল।", matchedPartAId: 8 },
      { qNo: "(গ)", question: "সার্বভৌমত্বের একত্ববাদী ধারণার প্রবক্তা কে?", answer: "জন অস্টিন।", matchedPartAId: 26 },
      { qNo: "(ঘ)", question: "আইনের দুটি উৎসের নাম লেখ।", answer: "আইনসভা ও প্রচলিত রীতিনীতি।", matchedPartAId: 31 },
      { qNo: "(ঙ)", question: "ভোটাধিকার নাগরিকদের কোন ধরনের অধিকার?", answer: "রাজনৈতিক অধিকার।", matchedPartAId: 45 },
      { qNo: "(চ)", question: "স্বাধীনতার দুটি রক্ষাকবচের নাম লেখ।", answer: "আইনের অনুশাসন ও স্বাধীন বিচার বিভাগ।", matchedPartAId: 40 },
      { qNo: "(ছ)", question: "প্লেটো কোন দুটি ক্ষেত্রে সাম্যবাদের কথা বলেছেন?", answer: "পারিবারিক সাম্যবাদ ও সম্পত্তির সাম্যবাদ।", matchedPartAId: 58 },
      { qNo: "(জ)", question: "এরিস্টটল কর্তৃক প্রতিষ্ঠিত শিক্ষা প্রতিষ্ঠানের নাম কী?", answer: "লাইসিয়াম (Lyceum)।", matchedPartAId: 63 },
      { qNo: "(ঝ)", question: "'দুই তরবারি' তত্ত্বের প্রবক্তা কে?", answer: "সেন্ট অগাস্টিন।", matchedPartAId: 73 },
      { qNo: "(ঞ)", question: "'Summa Theologica' গ্রন্থটি কার লেখা?", answer: "সেন্ট টমাস একুইনাস।", matchedPartAId: 78 },
      { qNo: "(ট)", question: "রেনেসাঁ অর্থ কী?", answer: "রেনেসাঁ অর্থ পুনর্জাগরণ বা নবজাগরণ।", matchedPartAId: 83 },
      { qNo: "(ঠ)", question: "সামাজিক চুক্তি মতবাদের তিনজন প্রবক্তার নাম লেখ।", answer: "টমাস হবস, জন লক ও জঁ জ্যাক রুশো।", matchedPartAId: 22 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাষ্ট্রের সংজ্ঞা দাও।", matchedPartBId: 7 },
      { qNo: "৩", question: "জনগণ আইন মান্য করে কেন?", matchedPartBId: 30 },
      { qNo: "৪", question: "সার্বভৌমত্ব কী?", matchedPartBId: 15 },
      { qNo: "৫", question: "সাম্য ও স্বাধীনতার মধ্যে সম্পর্ক দেখাও।", matchedPartBId: 21 },
      { qNo: "৬", question: "যুক্তরাষ্ট্রীয় সরকার কী?", matchedPartBId: 11 },
      { qNo: "৭", question: "প্লেটোর শিক্ষাব্যবস্থা আধুনিককালে কতটুকু গ্রহণযোগ্য?", matchedPartBId: 38 },
      { qNo: "৮", question: "সেন্ট টমাস একুইনাসকে মধ্যযুগের এরিস্টটল বলা হয় কেন?", matchedPartBId: 51 },
      { qNo: "৯", question: "গণতন্ত্র সম্পর্কে জন লকের ধারণা ব্যাখ্যা কর।", matchedPartBId: 57 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "রাষ্ট্রবিজ্ঞান পাঠের গুরুত্ব আলোচনা কর।", matchedPartCId: 4 },
      { qNo: "১১", question: "\"জাতীয়তাবাদ আধুনিক সভ্যতার প্রতি হুমকিস্বরূপ\"—ব্যাখ্যা কর।", matchedPartCId: 18 },
      { qNo: "১২", question: "জন অস্টিনের সার্বভৌম তত্ত্বটি সমালোচনাসহ ব্যাখ্যা কর।", matchedPartCId: 12 },
      { qNo: "১৩", question: "জাতি কাকে বলে? জাতি ও জাতীয়তাবাদের মধ্যে পার্থক্য নির্ণয় কর।", matchedPartCId: 19 },
      { qNo: "১৪", question: "সমালোচনাসহ প্লেটোর ন্যায়বিচার তত্ত্বটি আলোচনা কর।", matchedPartCId: 23 },
      { qNo: "১৫", question: "এরিস্টটলের মতে বিপ্লবের কারণ ও প্রতিকারের উপায়সমূহ আলোচনা কর।", matchedPartCId: 28 },
      { qNo: "১৬", question: "ম্যাকিয়াভেলিকে আধুনিক রাষ্ট্রবিজ্ঞানের জনক বলা হয় কেন? আলোচনা কর।", matchedPartCId: 44 },
      { qNo: "১৭", question: "রুশোর 'সাধারণ ইচ্ছা' তত্ত্বটি ব্যাখ্যা কর।", matchedPartCId: 40 }
    ]
  },
  {
    year: 2023,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০২৩",
    examDate: "১৭/০২/২০২৫",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "রাষ্ট্রবিজ্ঞানের জনক কে?", answer: "এরিস্টটল।", matchedPartAId: 2 },
      { qNo: "(খ)", question: "\"Virtue is knowledge\"—উক্তিটি কার?", answer: "সক্রেটিস-এর।", matchedPartAId: 57 },
      { qNo: "(গ)", question: "রাষ্ট্রের সর্বাপেক্ষা গুরুত্বপূর্ণ উপাদান কোনটি?", answer: "সার্বভৌমত্ব।", matchedPartAId: 14 },
      { qNo: "(ঘ)", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত সঠিক মতবাদ কোনটি?", answer: "ঐতিহাসিক বা বিবর্তনমূলক মতবাদ।", matchedPartAId: 21 },
      { qNo: "(ঙ)", question: "আধুনিক গণতন্ত্রের জনক কে?", answer: "জন লক।", matchedPartAId: 86 },
      { qNo: "(চ)", question: "হল্যান্ডের মতে আইনের উৎস কয়টি?", answer: "৬টি।", matchedPartAId: 32 },
      { qNo: "(ছ)", question: "সরকারের চতুর্থ অঙ্গ কোনটি?", answer: "নির্বাচকমণ্ডলী।", matchedPartAId: 18 },
      { qNo: "(জ)", question: "'The Prince' গ্রন্থের রচয়িতা কে?", answer: "নিকোলো ম্যাকিয়াভেলি।", matchedPartAId: 81 },
      { qNo: "(ঝ)", question: "সাধারণ ইচ্ছা তত্ত্বের প্রবক্তা কে?", answer: "জাঁ জ্যাক রুশো।", matchedPartAId: 96 },
      { qNo: "(ঞ)", question: "সংসদীয় সরকার ব্যবস্থায় সরকার প্রধান কে?", answer: "প্রধানমন্ত্রী।", matchedPartAId: 17 },
      { qNo: "(ট)", question: "মধ্যযুগের এরিস্টটল বলা হয় কাকে?", answer: "সেন্ট টমাস একুইনাসকে।", matchedPartAId: 77 },
      { qNo: "(ঠ)", question: "\"বিধাতার রাষ্ট্র\" ধারণাটি কে দিয়েছেন?", answer: "সেন্ট অগাস্টিন।", matchedPartAId: 75 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাষ্ট্রবিজ্ঞানের সংজ্ঞা দাও।", matchedPartBId: 1 },
      { qNo: "৩", question: "রাষ্ট্র ও সরকারের মধ্যে পার্থক্য কী?", matchedPartBId: 12 },
      { qNo: "৪", question: "জাতি ও জাতীয়তার মধ্যে পার্থক্য লেখ।", matchedPartBId: 28 },
      { qNo: "৫", question: "প্লেটোর দার্শনিক রাজার গুণাবলি উল্লেখ কর।", matchedPartBId: 39 },
      { qNo: "৬", question: "সাম্যের সংজ্ঞা দাও।", matchedPartBId: 20 },
      { qNo: "৭", question: "এরিস্টটলের সরকারের শ্রেণিবিভাগ ব্যাখ্যা কর।", matchedPartBId: 45 },
      { qNo: "৮", question: "ম্যাকিয়াভেলিবাদ কী?", matchedPartBId: 53 },
      { qNo: "৯", question: "জন লকের সম্পত্তি তত্ত্বের মূল ধারণা কী?", matchedPartBId: 58 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "রাষ্ট্রবিজ্ঞানের প্রকৃতি ও পরিধি আলোচনা কর।", matchedPartCId: 1 },
      { qNo: "১১", question: "আধুনিক রাষ্ট্রের কার্যাবলি আলোচনা কর।", matchedPartCId: 6 },
      { qNo: "১২", question: "রাষ্ট্রের উৎপত্তি সংক্রান্ত বিবর্তনমূলক মতবাদ আলোচনা কর।", matchedPartCId: 10 },
      { qNo: "১৩", question: "আইন কী? আইনের উৎসসমূহ আলোচনা কর।", matchedPartCId: 13 },
      { qNo: "১৪", question: "প্লেটোর শিক্ষাতত্ত্ব আলোচনা কর।", matchedPartCId: 24 },
      { qNo: "১৫", question: "রাষ্ট্রচিন্তায় এরিস্টটলের অবদান বর্ণনা কর।", matchedPartCId: 27 },
      { qNo: "১৬", question: "মানব প্রকৃতি ও প্রকৃতির রাজ্য সম্পর্কে টমাস হবসের ধারণা আলোচনা কর।", matchedPartCId: 37 },
      { qNo: "১৭", question: "জন লককে সংসদীয় গণতন্ত্রের জনক বলা হয় কেন? ব্যাখ্যা কর।", matchedPartCId: 39 }
    ]
  },
  {
    year: 2024,
    examTitle: "ডিগ্রি পাস ও সার্টিফিকেট কোর্স প্রথম বর্ষ পরীক্ষা-২০২৪",
    examDate: "৩০/১১/২০২৫",
    code: "১১১৯০১",
    subject: "রাষ্ট্রবিজ্ঞান (প্রথম পত্র - রাজনৈতিক তত্ত্ব)",
    partAQuestions: [
      { qNo: "(ক)", question: "নগররাষ্ট্র প্রথম কোথায় গড়ে উঠেছিল?", answer: "প্রাচীন গ্রিসে।", matchedPartAId: 4 },
      { qNo: "(খ)", question: "রাষ্ট্রের মস্তিষ্ক বলা হয় কোন উপাদানকে?", answer: "সরকারকে।", matchedPartAId: 12 },
      { qNo: "(গ)", question: "\"Man is born free but everywhere he is in chain\"—উক্তিটি কার?", answer: "রুশো (Rousseau)।", matchedPartAId: 91 },
      { qNo: "(ঘ)", question: "'Lag' শব্দের অর্থ কী?", answer: "স্থির বা সমভাবে প্রযোজ্য (পশ্চাৎপদতা)।", matchedPartAId: 52 },
      { qNo: "(ঙ)", question: "\"Democracy is the government of the people, by the people, for the people\"—উক্তিটি কার?", answer: "আব্রাহাম লিংকনের।", matchedPartAId: 42 },
      { qNo: "(চ)", question: "সরকারের চতুর্থ অঙ্গ কোনটি?", answer: "নির্বাচকমণ্ডলী।", matchedPartAId: 18 },
      { qNo: "(ছ)", question: "'Two Treatises on Civil Government' কার লেখা গ্রন্থ?", answer: "জন লক (John Locke)।", matchedPartAId: 87 },
      { qNo: "(জ)", question: "এরিস্টটলের মতে উত্তম সরকার কোনটি?", answer: "পলিটি (Polity) বা মধ্যতন্ত্র।", matchedPartAId: 69 },
      { qNo: "(ঝ)", question: "'The Art of War' গ্রন্থটির লেখক কে?", answer: "নিকোলো ম্যাকিয়াভেলি।", matchedPartAId: 95 },
      { qNo: "(ঞ)", question: "প্লেটো প্রতিষ্ঠিত শিক্ষা প্রতিষ্ঠানের নাম কী?", answer: "একাডেমি (Academy)।", matchedPartAId: 54 },
      { qNo: "(ট)", question: "মধ্যযুগের এরিস্টটল বলা হয় কাকে?", answer: "সেন্ট টমাস একুইনাসকে।", matchedPartAId: 77 },
      { qNo: "(ঠ)", question: "'Sovereignty' শব্দের উৎপত্তি কোন শব্দ থেকে?", answer: "ল্যাটিন শব্দ Superanus থেকে।", matchedPartAId: 24 }
    ],
    partBQuestions: [
      { qNo: "২", question: "রাজনৈতিক তত্ত্ব বলতে কী বুঝ?", matchedPartBId: 6 },
      { qNo: "৩", question: "\"বল নয় সম্মতিই রাষ্ট্রের ভিত্তি\"—উক্তিটি ব্যাখ্যা কর।", matchedPartBId: 13 },
      { qNo: "৪", question: "মানুষ কেন আইন মান্য করে?", matchedPartBId: 30 },
      { qNo: "৫", question: "এরিস্টটলের মতানুসারে 'পলিটি' কী?", matchedPartBId: 42 },
      { qNo: "৬", question: "মৌলিক অধিকার ও মানবাধিকারের মধ্যে পার্থক্য লেখ।", matchedPartBId: 31 },
      { qNo: "৭", question: "জাতীয়তাবাদ কীভাবে সাম্রাজ্যবাদের আশঙ্কা সৃষ্টি করে?", matchedPartBId: 29 },
      { qNo: "৮", question: "জাতি রাষ্ট্র বলতে কী বুঝ?", matchedPartBId: 14 },
      { qNo: "৯", question: "সার্বজনীন ভোটাধিকার কী?", matchedPartBId: 32 }
    ],
    partCQuestions: [
      { qNo: "১০", question: "রাষ্ট্রবিজ্ঞানের প্রকৃতি ও বিষয়বস্তু সাপেক্ষে বলা যায় এটি রাষ্ট্র সম্পর্কিত বিজ্ঞান—ব্যাখ্যা কর।", matchedPartCId: 5 },
      { qNo: "১১", question: "\"কর্তব্যের মাঝেই অধিকার নিহিত\"—উক্তিটির স্বপক্ষে যুক্তি দাও।", matchedPartCId: 20 },
      { qNo: "১২", question: "এরিস্টটলের মতানুসারে বিপ্লবের সাধারণ কারণ ও প্রতিকারসমূহ আলোচনা কর।", matchedPartCId: 28 },
      { qNo: "১৩", question: "রাজনৈতিক দর্শনে প্লেটো ও এরিস্টটলের তুলনামূলক আলোচনা কর।", matchedPartCId: 29 },
      { qNo: "১৪", question: "ধর্মের প্রভাবেই ইউরোপে মধ্যযুগ ছিল অরাজনৈতিক—ব্যাখ্যা কর।", matchedPartCId: 31 },
      { qNo: "১৫", question: "জন লকের সামাজিক চুক্তি মতবাদ আলোচনা কর।", matchedPartCId: 43 },
      { qNo: "১৬", question: "ম্যাকিয়াভেলিকে আধুনিক রাষ্ট্রচিন্তার জনক বলা হয় কেন? আলোচনা কর।", matchedPartCId: 44 },
      { qNo: "১৭", question: "সেন্ট অগাস্টিনের রাষ্ট্রদর্শন আলোচনা কর।", matchedPartCId: 33 }
    ]
  }
];
