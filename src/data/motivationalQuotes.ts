export interface PhilosophyQuote {
  id: number;
  author: string;
  authorEn: string;
  era: string;
  title: string;
  quoteBn: string;
  quoteEn: string;
  context: string;
  bookRef?: string;
  category: "রাজনৈতিক দর্শন" | "জ্ঞান ও নীতিশাস্ত্র" | "স্বাধীনতা ও অধিকার" | "রাষ্ট্রচিন্তা" | "অধ্যয়ন ও সাধনা";
}

export const motivationalQuotesList: PhilosophyQuote[] = [
  {
    id: 1,
    author: "অ্যারিস্টটল",
    authorEn: "Aristotle (384–322 BC)",
    era: "প্রাচীন গ্রিক রাষ্ট্রদর্শন",
    title: "রাষ্ট্রবিজ্ঞানের জনক",
    quoteBn: "মানুষ স্বভাবতই একটি রাজনৈতিক জীব; যে ব্যক্তি সমাজে বসবাস করে না, সে হয় পশু না হয় দেবতা।",
    quoteEn: "Man is by nature a political animal, and he who by nature and not by mere circumstance is without a state is either bad or above humanity.",
    context: "রাষ্ট্রের স্বাভাবিক ও অনিবার্য প্রয়োজনীয়তা বোঝাতে অ্যারিস্টটল এই কালজয়ী তত্ত্ব দেন।",
    bookRef: "Politics (Book I)",
    category: "রাষ্ট্রচিন্তা"
  },
  {
    id: 2,
    author: "সক্রেটিস",
    authorEn: "Socrates (470–399 BC)",
    era: "গ্রিক দর্শন",
    title: "পশ্চিমা দর্শনের প্রবক্তা",
    quoteBn: "জ্ঞানই পুণ্য, আর অজ্ঞতাই পাপ। অপরীক্ষিত জীবন বেঁচে থাকার যোগ্য নয়।",
    quoteEn: "Knowledge is virtue. An unexamined life is not worth living.",
    context: "সত্যিকারের প্রজ্ঞা অর্জনের জন্য আত্মজিজ্ঞাসা ও নিরবচ্ছিন্ন অনুশীলনের গুরুত্ব তুলে ধরেছেন।",
    category: "জ্ঞান ও নীতিশাস্ত্র"
  },
  {
    id: 3,
    author: "প্লেটো",
    authorEn: "Plato (427–347 BC)",
    era: "প্রাচীন গ্রিক রাষ্ট্রদর্শন",
    title: "আদর্শ রাষ্ট্রের প্রবক্তা",
    quoteBn: "যতক্ষণ না দার্শনিকরা রাজা হন অথবা এ পৃথিবীর রাজারা দর্শনের প্রেরণায় উদ্দীপিত হন, ততক্ষণ রাষ্ট্রসমূহের দুর্ভোগ শেষ হবে না।",
    quoteEn: "Until philosophers rule as kings or those who are now called kings and leading men genuinely and adequately philosophise, cities will have no rest from evils.",
    context: "প্লেটোর 'দার্শনিক রাজা' (Philosopher King) এবং প্রজ্ঞাবান নেতৃত্বের রূপরেখা।",
    bookRef: "The Republic (Book V)",
    category: "রাজনৈতিক দর্শন"
  },
  {
    id: 4,
    author: "জঁ-জ্যাক রুশো",
    authorEn: "Jean-Jacques Rousseau (1712–1778)",
    era: "ফরাসি বিপ্লবের তাত্ত্বিক ভিত্তি",
    title: "সামাজিক চুক্তি মতবাদের জনক",
    quoteBn: "মানুষ জন্মগতভাবে স্বাধীন, অথচ সর্বত্রই সে আজ শৃঙ্খলিত।",
    quoteEn: "Man is born free, and everywhere he is in chains.",
    context: "স্বৈরাচারী শাসন থেকে মুক্ত হয়ে জনগণের সাধারণ ইচ্ছা (General Will) অনুযায়ী রাষ্ট্র পরিচালনার আহ্বান।",
    bookRef: "The Social Contract (1762)",
    category: "স্বাধীনতা ও অধিকার"
  },
  {
    id: 5,
    author: "জন লক",
    authorEn: "John Locke (1632–1704)",
    era: "ইংল্যান্ডের উদারনৈতিক দর্শন",
    title: "সংসদীয় গণতন্ত্র ও ব্যক্তিস্বাতন্ত্র্যের জনক",
    quoteBn: "যেখানে আইন নেই, সেখানে স্বাধীনতা থাকতে পারে না। জীবনের অধিকার, স্বাধীনতার অধিকার এবং সম্পত্তির অধিকার মানুষের জন্মগত অবিচ্ছেদ্য অধিকার।",
    quoteEn: "Where there is no law, there is no freedom. All mankind being all equal and independent, no one ought to harm another in his life, health, liberty, or possessions.",
    context: "আইনের শাসন ও সরকারের ক্ষমতা সীমিতকরণের আধুনিক সাংবিধানিক ভিত্তি।",
    bookRef: "Two Treatises of Government (1689)",
    category: "স্বাধীনতা ও অধিকার"
  },
  {
    id: 6,
    author: "নিকোলো মেকিয়াভেলি",
    authorEn: "Niccolò Machiavelli (1469–1527)",
    era: "ইতালীয় রেনেসাঁ",
    title: "আধুনিক রাষ্ট্রবিজ্ঞানের জনক",
    quoteBn: "শাসককে হতে হবে সিংহের মতো পরাক্রমশালী ও হিংস্র, এবং শিয়ালের মতো ধূর্ত ও সতর্ক।",
    quoteEn: "A prince ought to have two manners of conflict: by the law and by force. The first is proper to men, the second to beasts... a prince must know how to choose the beast.",
    context: "রাজনৈতিক বাস্তবতাবাদ (Political Realism) ও রাষ্ট্ররক্ষার কৌশলগত দৃষ্টিভঙ্গি।",
    bookRef: "The Prince (1513)",
    category: "রাজনৈতিক দর্শন"
  },
  {
    id: 7,
    author: "জন স্টুয়ার্ট মিল",
    authorEn: "John Stuart Mill (1806–1873)",
    era: "ব্রিটিশ উপযোগবাদ ও উদারনীতি",
    title: "বাক-স্বাধীনতার মহান প্রবক্তা",
    quoteBn: "যদি সমগ্র মানবজাতি একমত হয় এবং কেবল একজন ব্যক্তি ভিন্ন মত পোষণ করে, তবে সেই একজনকে স্তব্ধ করার অধিকার সমগ্র মানবজাতিরও নেই।",
    quoteEn: "If all mankind minus one were of one opinion, mankind would be no more justified in silencing that one person than he, if he had the power, would be justified in silencing mankind.",
    context: "গণতন্ত্রে বাকস্বাধীনতা ও ভিন্নমত প্রকাশের পরম অধিকার।",
    bookRef: "On Liberty (1859)",
    category: "স্বাধীনতা ও অধিকার"
  },
  {
    id: 8,
    author: "কার্ল মার্কস",
    authorEn: "Karl Marx (1818–1883)",
    era: "সমাজতান্ত্রিক ও ঐতিহাসিক দ্বন্দ্ববাদ",
    title: "বৈজ্ঞানিক সমাজতন্ত্রের জনক",
    quoteBn: "দার্শনিকরা এতদিন কেবল বিশ্বকে বিভিন্নভাবে ব্যাখ্যা করেছেন; কিন্তু আসল কাজ হলো একে পরিবর্তন করা।",
    quoteEn: "The philosophers have only interpreted the world in various ways; the point, however, is to change it.",
    context: "তাত্ত্বিক ভাববাদের ঊর্ধ্বে উঠে সামাজিক ও অর্থনৈতিক মুক্তির বাস্তব সংগ্রামের দর্শন।",
    bookRef: "Theses on Feuerbach (1845)",
    category: "রাজনৈতিক দর্শন"
  },
  {
    id: 9,
    author: "অধ্যাপক হ্যারল্ড লাস্কি",
    authorEn: "Harold J. Laski (1893–1950)",
    era: "আধুনিক গণতান্ত্রিক সমাজতন্ত্র",
    title: "লন্ডন স্কুল অব ইকোনমিক্স",
    quoteBn: "অধিকার ব্যতীত মানুষের ব্যক্তিত্বের পূর্ণ বিকাশ অসম্ভব। নাগরিকের অধিকারসমূহই একটি রাষ্ট্রের গণতান্ত্রিক চরিত্রের প্রকৃত পরিচয় দেয়।",
    quoteEn: "Rights are those conditions of social life without which no man can seek, in general, to be himself at his best.",
    context: "সামাজিক ন্যায়বিচার ও রাষ্ট্র কর্তৃক নাগরিকের মৌলিক সুযোগ-সুবিধা নিশ্চিত করার দায়িত্ব।",
    bookRef: "A Grammar of Politics (1925)",
    category: "স্বাধীনতা ও অধিকার"
  },
  {
    id: 10,
    author: "টমাস হবস",
    authorEn: "Thomas Hobbes (1588–1679)",
    era: "ইংল্যান্ডের সপ্তদশ শতক",
    title: "সার্বভৌম ক্ষমতার তাত্ত্বিক",
    quoteBn: "আইনহীন প্রাকৃতিক রাজ্যে মানুষের জীবন ছিল নিঃসঙ্গ, দীন, ঘৃণ্য, পাশবিক এবং ক্ষণস্থায়ী। শান্তি প্রতিষ্ঠার একমাত্র উপায় একটি শক্তিশালী সার্বভৌম রাষ্ট্র।",
    quoteEn: "The life of man, solitary, poor, nasty, brutish, and short. Covenants without the sword are but words.",
    context: "আইনশৃঙ্খলার প্রয়োজনীয়তা এবং সামাজিক শান্তি বজায় রাখতে রাষ্ট্রের চূড়ান্ত ক্ষমতার গুরুত্ব।",
    bookRef: "Leviathan (1651)",
    category: "রাষ্ট্রচিন্তা"
  },
  {
    id: 11,
    author: "কনফুসিয়াস",
    authorEn: "Confucius (551–479 BC)",
    era: "প্রাচীন প্রাচ্য দর্শন",
    title: "নৈতিক শাসনের প্রবক্তা",
    quoteBn: "যে জেনেও শেখার চেষ্টা করে না সে অজ্ঞ, আর যে শিখেও চিন্তা করে না সে বিভ্রান্ত। নৈতিক চরিত্রই সুশাসনের প্রথম সোপান।",
    quoteEn: "Learning without thought is labor lost; thought without learning is perilous.",
    context: "জ্ঞানার্জন এবং অধ্যয়ন প্রক্রিয়ায় আত্মচিন্তা ও শৃঙ্খলার গুরুত্ব।",
    category: "অধ্যয়ন ও সাধনা"
  },
  {
    id: 12,
    author: "ব্যারন ডি মন্টেস্কু",
    authorEn: "Baron de Montesquieu (1689–1755)",
    era: "ফরাসি আলোকিত যুগ",
    title: "ক্ষমতা স্বতন্ত্রীকরণ নীতির জনক",
    quoteBn: "যখন আইন প্রণয়ন ও শাসন ক্ষমতা একই হাতে ন্যস্ত হয়, তখন স্বাধীনতার অবসান ঘটে। স্বাধীনতা রক্ষার জন্য ক্ষমতা দিয়েই ক্ষমতাকে নিয়ন্ত্রণ করতে হয়।",
    quoteEn: "There is as yet no liberty if the power of judging be not separated from legislative and executive powers.",
    context: "আধুনিক সংবিধানসমূহের ক্ষমতা স্বতন্ত্রীকরণ (Separation of Powers) ব্যবস্থার মূলভিত্তি।",
    bookRef: "The Spirit of the Laws (1748)",
    category: "রাষ্ট্রচিন্তা"
  }
];
