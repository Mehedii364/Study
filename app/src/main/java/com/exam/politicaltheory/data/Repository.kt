package com.exam.politicaltheory.data

object Repository {

    val subjectInfo = SubjectExamInfo()

    val motivationalQuotes = listOf(
        MotivationalQuote(
            id = 1,
            quoteBn = "মানুষ স্বভাবতই সামাজিক ও রাজনৈতিক জীব; যে সমাজে বাস করে না সে হয় দেবতা, না হয় পশু।",
            quoteEn = "Man is by nature a social and political animal.",
            author = "অ্যারিস্টটল (Aristotle)",
            context = "রাষ্ট্রবিজ্ঞানের জনক · Politics গ্রন্থ"
        ),
        MotivationalQuote(
            id = 2,
            quoteBn = "যে রাষ্ট্রে দার্শনিকরা রাজা নন অথবা রাজারা দর্শনের জ্ঞানে আলোকিত নন, সেখানে মানবতার দুঃখের অবসান হবে না।",
            quoteEn = "Until philosophers are kings, cities will never have rest from their evils.",
            author = "প্লেটো (Plato)",
            context = "আদর্শ রাষ্ট্র তত্ত্ব · The Republic"
        ),
        MotivationalQuote(
            id = 3,
            quoteBn = "শাসককে হতে হবে সিংহের মতো সাহসী এবং শেয়ালের মতো চতুর ও কৌশলী।",
            quoteEn = "A prince must imitate the fox and the lion.",
            author = "নিকোলো ম্যাকিয়াভেলি (Niccolò Machiavelli)",
            context = "আধুনিক রাষ্ট্রচিন্তা · The Prince"
        ),
        MotivationalQuote(
            id = 4,
            quoteBn = "মানুষ স্বাধীন হয়ে জন্মগ্রহণ করে, কিন্তু সর্বত্রই সে শৃঙ্খলিত।",
            quoteEn = "Man is born free, and everywhere he is in chains.",
            author = "জঁ জ্যাক রুশো (Jean-Jacques Rousseau)",
            context = "সামাজিক চুক্তি মতবাদ · The Social Contract"
        ),
        MotivationalQuote(
            id = 5,
            quoteBn = "সকল মানুষের জীবন, স্বাধীনতা ও সম্পত্তির অধিকার হলো জন্মগত প্রাকৃতিক অবিচ্ছেদ্য অধিকার।",
            quoteEn = "Life, Liberty, and Property are natural inalienable rights.",
            author = "জন লক (John Locke)",
            context = "উদারনৈতিক গণতন্ত্রের জনক · Two Treatises of Government"
        ),
        MotivationalQuote(
            id = 6,
            quoteBn = "ন্যায্যতা ও আইনের শাসনই একটি রাষ্ট্রের অস্তিত্বের ভিত্তি; ন্যায়বিচারহীন রাষ্ট্র কেবল ডাকাতের দল ছাড়া আর কিছুই নয়।",
            quoteEn = "Justice is the bond of men in states.",
            author = "সেন্ট অগাস্টিন (St. Augustine)",
            context = "মধ্যযুগীয় রাষ্ট্রচিন্তা · The City of God"
        )
    )

    val partAQuestions = listOf(
        Question(
            id = 101,
            questionNumber = "১",
            section = QuestionSection.PART_A,
            questionBn = "রাষ্ট্রবিজ্ঞানের জনক কে?",
            answerBn = "গ্রিক দার্শনিক অ্যারিস্টটল (Aristotle) রাষ্ট্রবিজ্ঞানের জনক। তাঁর বিখ্যাত অমর গ্রন্থটির নাম 'Politics' (পলিটিক্স)।",
            yearsExamined = listOf("২০২২", "২০২০", "২০১৮", "২০১৬"),
            isImportant = true,
            repeatCount = 5,
            starRating = 5
        ),
        Question(
            id = 102,
            questionNumber = "২",
            section = QuestionSection.PART_A,
            questionBn = "‘The Republic’ গ্রন্থের রচয়িতা কে?",
            answerBn = "প্রাচীন গ্রিসের মহান দার্শনিক প্লেটো (Plato) হলেন ‘The Republic’ (রিপাবলিক) গ্রন্থের রচয়িতা।",
            yearsExamined = listOf("২০২১", "২০১৯", "২০১৭"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 103,
            questionNumber = "৩",
            section = QuestionSection.PART_A,
            questionBn = "‘The Prince’ গ্রন্থের রচয়িতা কে?",
            answerBn = "আধুনিক রাষ্ট্রবিজ্ঞানের অন্যতম পথিকৃৎ ইতালীয় দার্শনিক নিকোলো ম্যাকিয়াভেলি (Niccolò Machiavelli)।",
            yearsExamined = listOf("২০২২", "২০২০", "২০১৭"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 104,
            questionNumber = "৪",
            section = QuestionSection.PART_A,
            questionBn = "সার্বভৌমত্বের বহুত্ববাদী প্রবক্তা কারা?",
            answerBn = "অধ্যাপক হ্যারল্ড লাস্কি (Harold Laski), ম্যাকাইভার (MacIver), আর্নেস্ট বার্কার এবং ডুগুই প্রমুখ সার্বভৌমত্বের বহুত্ববাদী মতবাদের প্রধান প্রবক্তা।",
            yearsExamined = listOf("২০২০", "২০১৮"),
            isImportant = true,
            repeatCount = 3,
            starRating = 4
        ),
        Question(
            id = 105,
            questionNumber = "৫",
            section = QuestionSection.PART_A,
            questionBn = "প্লেটোর মতে আদর্শ রাষ্ট্রের জনসংখ্যা কত ছিল?",
            answerBn = "প্লেটোর তাঁর 'The Laws' গ্রন্থে আদর্শ রাষ্ট্রের নাগরিক বা পরিবারের সংখ্যা নির্ধারণ করেছিলেন ৫০৪০ জন।",
            yearsExamined = listOf("২০২১", "২০১৯"),
            isImportant = true,
            repeatCount = 3,
            starRating = 4
        ),
        Question(
            id = 106,
            questionNumber = "৬",
            section = QuestionSection.PART_A,
            questionBn = "রাষ্ট্রের উপাদান কয়টি ও কী কী?",
            answerBn = "রাষ্ট্রের উপাদান ৪টি: ১. নির্দিষ্ট ভূখণ্ড, ২. জনসমষ্টি, ৩. সরকার, এবং ৪. সার্বভৌমত্ব (সর্বোচ্চ ও চরম ক্ষমতা)।",
            yearsExamined = listOf("২০২২", "২০১৯", "২০১৭", "২০১৫"),
            isImportant = true,
            repeatCount = 5,
            starRating = 5
        ),
        Question(
            id = 107,
            questionNumber = "৭",
            section = QuestionSection.PART_A,
            questionBn = "‘পলিটিক্স’ (Politics) শব্দের উৎপত্তি কোন শব্দ থেকে?",
            answerBn = "গ্রিক শব্দ ‘Polis’ (পোলিস) থেকে ‘Politics’ শব্দের উৎপত্তি, যার আক্ষরিক অর্থ হলো ‘নগর-রাষ্ট্র’ (City-State)।",
            yearsExamined = listOf("২০২১", "২০১৮", "২০১৬"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 108,
            questionNumber = "৮",
            section = QuestionSection.PART_A,
            questionBn = "‘সাধারণ ইচ্ছা’ (General Will) তত্ত্বের প্রবক্তা কে?",
            answerBn = "ফরাসি দার্শনিক জঁ জ্যাক রুশো (Jean-Jacques Rousseau) সাধারণ ইচ্ছা তত্ত্বের জনক।",
            yearsExamined = listOf("২০২২", "২০২০", "২০১৮"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 109,
            questionNumber = "৯",
            section = QuestionSection.PART_A,
            questionBn = "‘আইনের শাসন’ (Rule of Law) ধারণার মূল প্রবক্তা কে?",
            answerBn = "ব্রিটিশ সংবিধান বিশেষজ্ঞ অধ্যাপক এ. ভি. ডাইসি (A. V. Dicey)।",
            yearsExamined = listOf("২০২১", "২০১৭"),
            isImportant = false,
            repeatCount = 2,
            starRating = 3
        ),
        Question(
            id = 110,
            questionNumber = "১০",
            section = QuestionSection.PART_A,
            questionBn = "ক্ষমতা স্বতন্ত্রীকরণ নীতির প্রধান প্রবক্তা কে?",
            answerBn = "ফরাসি দার্শনিক মন্টেস্কু (Montesquieu) তাঁর 'The Spirit of the Laws' গ্রন্থে ক্ষমতা স্বতন্ত্রীকরণ নীতির পূর্ণাঙ্গ ব্যাখ্যা দেন।",
            yearsExamined = listOf("২০২২", "২০২০", "২০১৯"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 111,
            questionNumber = "১১",
            section = QuestionSection.PART_A,
            questionBn = "‘Leviathan’ (লেভিয়াথান) গ্রন্থের রচয়িতা কে?",
            answerBn = "ইংরেজ দার্শনিক টমাস হব্‌স (Thomas Hobbes), ১৬৫১ সালে গ্রন্থটি রচিত হয়।",
            yearsExamined = listOf("২০২১", "২০১৯", "২০১৬"),
            isImportant = true,
            repeatCount = 3,
            starRating = 4
        ),
        Question(
            id = 112,
            questionNumber = "১২",
            section = QuestionSection.PART_A,
            questionBn = "আইনের প্রাচীনতম উৎস কোনটি?",
            answerBn = "প্রথা ও রীতিনীতি (Customs and Traditions) হলো আইনের প্রাচীনতম ও ঐতিহাসিক উৎস।",
            yearsExamined = listOf("২০২০", "২০১৮"),
            isImportant = false,
            repeatCount = 2,
            starRating = 3
        )
    )

    val partBQuestions = listOf(
        Question(
            id = 201,
            questionNumber = "১",
            section = QuestionSection.PART_B,
            questionBn = "রাষ্ট্রবিজ্ঞানের সংজ্ঞা দাও এবং রাষ্ট্রবিজ্ঞান পাঠের দুটি প্রয়োজনীয়তা উল্লেখ কর।",
            answerBn = "ভূমিকা: রাষ্ট্রবিজ্ঞান সমাজবিজ্ঞানের একটি অন্যতম মৌলিক ও গতিশীল শাখা যা রাষ্ট্র, সরকার, সংবিধান, নাগরিকের অধিকার ও আন্তর্জাতিক সম্পর্ক নিয়ে সামগ্রিক আলোচনা করে।\n\nসংজ্ঞা:\n• পল জ্যানেটের মতে: 'রাষ্ট্রবিজ্ঞান হলো সমাজবিজ্ঞানের সেই অংশ যা রাষ্ট্রের ভিত্তি ও সরকারের মূলনীতি নিয়ে আলোচনা করে।'\n• গার্নারের মতে: 'রাষ্ট্রবিজ্ঞানের শুরু ও সমাপ্তি রাষ্ট্রকে নিয়ে।'\n\nপাঠের প্রয়োজনীয়তা:\n১. আদর্শ নাগরিকত্ব ও অধিকার-কর্তব্য সম্পর্কে পূর্ণাঙ্গ জ্ঞান অর্জন।\n২. রাষ্ট্র পরিচালনার রূপরেখা, শাসনব্যবস্থার ত্রুটি-বিচ্যুতি ও গণতান্ত্রিক সচেতনতা বৃদ্ধি।",
            keyPoints = listOf("পল জ্যানেট ও গার্নারের সুনির্দিষ্ট সংজ্ঞা", "অধিকার ও নাগরিক কর্তব্যের সচেতনতা", "সুশাসনের শর্তাবলী নিরূপণ"),
            yearsExamined = listOf("২০২২", "২০২০", "২০১৮"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 202,
            questionNumber = "২",
            section = QuestionSection.PART_B,
            questionBn = "সার্বভৌমত্ব কী? সার্বভৌমত্বের প্রধান বৈশিষ্ট্যসমূহ সংক্ষেপে লেখ।",
            answerBn = "ভূমিকা: সার্বভৌমত্ব (Sovereignty) হলো রাষ্ট্রের চরম, চূড়ান্ত ও অবিভাজ্য সর্বোচ্চ ক্ষমতা, যার বলে রাষ্ট্র অভ্যন্তরীণ সকল ব্যক্তি ও প্রতিষ্ঠানের ওপর নির্দেশ জারি করে এবং বহিঃশত্রুর নিয়ন্ত্রণমুক্ত থাকে।\n\nপ্রধান বৈশিষ্ট্যসমূহ:\n১. চরমতা ও পরমতা: রাষ্ট্রের এই ক্ষমতার ঊর্ধ্বে কোনো মানবীয় কর্তৃত্ব নেই।\n২. সার্বজনীনতা: ভৌগোলিক সীমানার অভ্যন্তরে প্রতিটি নাগরিক ও প্রতিষ্ঠান এই ক্ষমতার অধীন।\n৩. স্থায়িত্ব: সরকার পরিবর্তন হলেও সার্বভৌমত্ব অক্ষুণ্ণ থাকে।\n৪. অবিভাজ্যতা: সার্বভৌমত্বকে খণ্ড খণ্ড করা যায় না; খণ্ড করলে রাষ্ট্রের বিলুপ্তি ঘটে।\n৫. হস্তান্তর-অযোগ্যতা: এটি হস্তান্তর করলে রাষ্ট্রের আত্মাহুতি ঘটে।",
            keyPoints = listOf("আভ্যন্তরীণ ও বাহ্যিক দুই রূপ", "জঁ বোদাঁ ও অস্টিনের তত্ত্ব", "অবিভাজ্য ও স্থায়ী চরিত্র"),
            yearsExamined = listOf("২০২১", "২০১৯", "২০১৭"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        ),
        Question(
            id = 203,
            questionNumber = "৩",
            section = QuestionSection.PART_B,
            questionBn = "প্লেটোর সাম্যবাদ এবং আধুনিক সাম্যবাদের মধ্যে পার্থক্য কী?",
            answerBn = "ভূমিকা: প্লেটোর সাম্যবাদ আদর্শ রাষ্ট্রের অভিভাবক শ্রেণীর জন্য নির্ধারিত ছিল, পক্ষান্তরে আধুনিক সাম্যবাদ (মার্কসবাদ) হলো অর্থনৈতিক শোষণমুক্ত সর্বহারার সমাজ প্রতিষ্ঠার বিজ্ঞান।\n\nপ্রধান পার্থক্যসমূহ:\n১. পরিধি: প্লেটোর সাম্যবাদ কেবল শাসক ও সৈনিক শ্রেণীর জন্য প্রযোজ্য ছিল; আধুনিক সাম্যবাদ গোটা মানবসমাজের জন্য।\n২. প্রকৃতি: প্লেটোর সাম্যবাদ মূলত নৈতিক ও পারিবারিক ত্যাগের ওপর ভিত্তি করে সম্পত্তি ও পরিবারবর্জিত; আধুনিক সাম্যবাদ অর্থনৈতিক উপায়ের সামষ্টিক মালিকানা।\n৩. উৎপাদন ব্যবস্থা: প্লেটো কৃষক ও কারিগরদের ব্যক্তিগত সম্পত্তিতে হাত দেননি; মার্কসীয় সাম্যবাদে উৎপাদনের সকল উপকরণের ব্যক্তিগত মালিকানা বিলুপ্ত করা হয়।",
            keyPoints = listOf("অভিভাবক শ্রেণী বনাম সর্বহারা শ্রেণী", "নৈতিক আত্মত্যাগ বনাম অর্থনৈতিক শ্রেণীসংগ্রাম", "উৎপাদনের উপায়ের মালিকানা বিশ্লেষণ"),
            yearsExamined = listOf("২০২২", "২০১৯", "২০১৬"),
            isImportant = true,
            repeatCount = 3,
            starRating = 4
        ),
        Question(
            id = 204,
            questionNumber = "৪",
            section = QuestionSection.PART_B,
            questionBn = "ম্যাকিয়াভেলিবাদ (Machiavellism) বলতে কী বোঝায়?",
            answerBn = "ভূমিকা: রেনেসাঁ যুগের রাজনৈতিক তাত্ত্বিক নিকোলো ম্যাকিয়াভেলি রাষ্ট্র পরিচালনায় নৈতিকতা ও ধর্মের প্রভাব থেকে রাজনীতিকে সম্পূর্ণ মুক্ত করার যে বাস্তববাদী কূটনীতি উপস্থাপন করেন, তাকে ম্যাকিয়াভেলিবাদ বলা হয়।\n\nমূল বৈশিষ্ট্য:\n১. উদ্দেশ্যই উপায়কে বৈধ করে (The end justifies the means): রাষ্ট্রের স্বার্থ ও ক্ষমতা রক্ষা করতে যে কোনো প্রতারণা বা কঠোরতা প্রয়োগ সমর্থনযোগ্য।\n২. দ্বৈত নৈতিকতা: সাধারণ মানুষের নৈতিকতা এবং শাসকের রাষ্ট্রীয় নৈতিকতা সম্পূর্ণ ভিন্ন।\n৩. শক্তি ও শঠতার সমন্বয়: শাসককে একই সাথে সিংহের শৌর্য এবং শেয়ালের ধূর্ততা অর্জন করতে হবে।",
            keyPoints = listOf("ধর্ম ও রাজনীতির সুস্পষ্ট পৃথকীকরণ", "উদ্দেশ্যই উপায়ের নির্ধারক", "বাস্তবধর্মী রাষ্ট্রদর্শন"),
            yearsExamined = listOf("২০২১", "২০২০", "২০১৮"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        )
    )

    val partCQuestions = listOf(
        Question(
            id = 301,
            questionNumber = "১",
            section = QuestionSection.PART_C,
            questionBn = "প্লেটোর 'আদর্শ রাষ্ট্র' (Ideal State) তত্ত্বটি বিস্তারিত আলোচনা কর। এই তত্ত্ব কি বাস্তবে সম্ভব?",
            answerBn = "ভূমিকা:\nপ্রাচীন গ্রিক দার্শনিক প্লেটোর অমর দর্শনগ্রন্থ ‘The Republic’-এর কেন্দ্রীয় বিষয়বস্তু হলো আদর্শ রাষ্ট্রের রূপরেখা। তৎকালীন এথেন্সের অদক্ষ গণতান্ত্রিক বিশৃঙ্খলা ও দুর্নীতি দূর করে একটি নিখুঁত ন্যায়ভিত্তিক সমাজ প্রতিষ্ঠাই ছিল প্লেটোর মূল লক্ষ্য।\n\n১. আত্মার ত্রিগুণ ও সমাজের তিন শ্রেণী:\nপ্লেটো মানুষের আত্মাকে তিনটি গুণাবলির ভিত্তিতে বিভক্ত করেছেন এবং এর সাথে সামঞ্জস্য রেখে সমাজে তিনটি শ্রেণী নির্দেশ করেছেন:\n• জ্ঞান/প্রজ্ঞা (Reason) -> দার্শনিক রাজা (Philosopher King / শাসক শ্রেণী)\n• সাহস/তেজ (Spirit) -> সৈনিক ও রক্ষক শ্রেণী (Auxiliaries)\n• প্রবৃত্তি/ক্ষুধা (Appetite) -> উৎপাদক ও কৃষক শ্রেণী (Producers)\n\n২. দার্শনিক রাজার শাসন:\nপ্লেটোর মতে, আদর্শ রাষ্ট্রের কর্ণধার হবেন সত্য ও দর্শনের জ্ঞানে ভাস্বর একজন দার্শনিক। তিনি কোনো আইনের দাস হবেন না; কারণ জ্ঞানই হবে তাঁর সর্বোচ্চ আইন।\n\n৩. বিশেষায়িত কর্মবণ্টন ও ন্যায়বিচার:\nপ্রত্যেক শ্রেণী কেবল নিজের নির্ধারিত দায়িত্ব সততার সাথে পালন করবে এবং অপরের কাজে হস্তক্ষেপ করবে না। এই পারস্পরিক ভারসাম্যই হলো প্লেটোর ‘ন্যায়বিচার’ (Justice)।\n\n৪. অভিভাবক শ্রেণীর জন্য দ্বিবিধ ব্যবস্থা:\nশাসক ও সৈনিক শ্রেণী যাতে পার্থিব মোহে অন্ধ না হয়, সেজন্য প্লেটো দুটি মৌলিক ব্যবস্থার বিধান দেন:\nক) সম্পত্তি ও পরিবারের সাম্যবাদ (Communism of property and wives)\nখ) রাষ্ট্রীয় তত্ত্বাবধানে ৫০ বছরব্যাপী কঠোর শিক্ষা ব্যবস্থা।\n\nবাস্তবতা ও মূল্যায়ন:\nপ্লেটোর শিষ্য অ্যারিস্টটল স্বয়ং এই তত্ত্বকে 'ইউটোপিয়া' বা কাল্পনিক আকাশকুসুম কল্পনা বলে সমালোচনা করেছেন। ব্যক্তি পরিবার ও ব্যক্তিগত সম্পত্তি বর্জন মানবিক স্বভাবের পরিপন্থী। তবুও রাষ্ট্র পরিচালনায় যোগ্য ও শিক্ষিত নেতৃত্বের অপরিহার্যতা বোঝাতে প্লেটোর আদর্শ রাষ্ট্রের গুরুত্ব আজও অনস্বীকার্য।",
            keyPoints = listOf(
                "আত্মার তিন গুণ ও সমাজের ত্রি-শ্রেণী বিভাজন",
                "দার্শনিক রাজার অনন্য নেতৃত্ব ও প্রজ্ঞা",
                "ন্যায়বিচার ও অহস্তক্ষেপ নীতি",
                "শিক্ষা ব্যবস্থা ও কঠোর সাম্যবাদী অনুশাসন",
                "অ্যারিস্টটলের বাস্তবধর্মী সমালোচনা ও সার্বিক মূল্যায়ন"
            ),
            yearsExamined = listOf("২০২২", "২০২০", "২০১৭", "২০১৫"),
            isImportant = true,
            repeatCount = 5,
            starRating = 5
        ),
        Question(
            id = 302,
            questionNumber = "২",
            section = QuestionSection.PART_C,
            questionBn = "রাষ্ট্রের উৎপত্তি সংক্রান্ত 'সামাজিক চুক্তি মতবাদ' আলোচনা কর। হব্‌স ও লকের মতামতের তুলনামূলক বিশ্লেষণ দাও।",
            answerBn = "ভূমিকা:\nরাষ্ট্র কোনো ঐশ্বরিক সৃষ্টি নয়, বরং আদিম মানুষ পারস্পরিক চুক্তির মাধ্যমে রাষ্ট্র ও সমাজ গঠন করেছে—এই যুক্তির ওপর প্রতিষ্ঠিত মতবাদই হলো ‘সামাজিক চুক্তি মতবাদ’ (Social Contract Theory)।\n\n১. টমাস হব্‌সের সামাজিক চুক্তি (১৬৫১):\n• প্রকৃতির রাজ্য: হব্‌সের মতে প্রকৃতির রাজ্য ছিল অরাজক, বিভীষিকাময় এবং 'মানুষের জীবন ছিল নিঃসঙ্গ, দরিদ্র, ঘৃণ্য, পাশবিক ও স্বল্পস্থায়ী'।\n• চুক্তি: মানুষ নিজেদের আত্মরক্ষার তাগিদে সর্বময় ক্ষমতা একক সার্বভৌম শাসক (লেভিয়াথান)-এর হাতে নিঃশর্তভাবে সমর্পণ করে।\n• সরকারের রূপ: চরম ও নিরঙ্কুশ রাজতন্ত্র (Absolute Monarchy)।\n\n২. জন লকের সামাজিক চুক্তি (১৬৯০):\n• প্রকৃতির রাজ্য: লকের প্রকৃতির রাজ্য ছিল শান্তিপূর্ণ ও যুক্তিশাসিত, যেখানে মানুষ জীবন, স্বাধীনতা ও সম্পত্তির প্রাকৃতিক অধিকার ভোগ করত।\n• চুক্তি: অধিকারের সুরক্ষা নিশ্চিত করার জন্য মানুষ দুটি চুক্তি করে—প্রথমটি দ্বারা নাগরিক সমাজ এবং দ্বিতীয়টি দ্বারা নিয়মতান্ত্রিক সরকার গঠন।\n• সরকারের রূপ: সীমিত ও গণতান্ত্রিক সংসদীয় সরকার (Limited Government)। যদি শাসক অধিকার রক্ষায় ব্যর্থ হয়, তবে জনগণের বিদ্রোহ করার অধিকার রয়েছে।\n\nতুলনামূলক বিশ্লেষণ ও মূল্যায়ন:\nহব্‌স যেখানে স্বৈরাচারী রাজতন্ত্রের ভিত্তি স্থাপন করেন, লক সেখানে আধুনিক সাংবিধানিক গণতন্ত্র ও মানবাধিকারের পথ উন্মোচন করেন।",
            keyPoints = listOf(
                "প্রকৃতির রাজ্যের মনস্তাত্ত্বিক তফাত",
                "হব্‌সের নিরঙ্কুশ লেভিয়াথান বনাম লকের নিয়মতান্ত্রিক সরকার",
                "প্রাকৃতিক অধিকার ও বিদ্রোহ করার বৈধতা",
                "আধুনিক রাষ্ট্রবিজ্ঞানে চুক্তিবাদী চিন্তার প্রভাব"
            ),
            yearsExamined = listOf("২০২১", "২০১৯", "২০১৮", "২০১৬"),
            isImportant = true,
            repeatCount = 4,
            starRating = 5
        )
    )

    val mcqQuestions = listOf(
        McqQuestion(
            id = 1,
            questionBn = "রাষ্ট্রবিজ্ঞানের জনক হিসেবে কাকে স্বীকৃতি দেওয়া হয়?",
            options = listOf("প্লেটো", "অ্যারিস্টটল", "সক্রেটিস", "ম্যাকিয়াভেলি"),
            correctIndex = 1,
            explanationBn = "অ্যারিস্টটল তাঁর বিখ্যাত 'পলিটিক্স' গ্রন্থের মাধ্যমে প্রথম বিজ্ঞানসম্মত উপায়ে রাষ্ট্র নিয়ে বিশদ আলোচনা করেন।"
        ),
        McqQuestion(
            id = 2,
            questionBn = "‘The Republic’ গ্রন্থটি কত সালে রচিত হয় বলে ধারণা করা হয়?",
            options = listOf("খ্রিস্টপূর্ব প্রায় ৩৭৫ অব্দে", "খ্রিস্টপূর্ব ৫০ অব্দে", "১৫১৩ খ্রিস্টাব্দে", "১৬৫১ খ্রিস্টাব্দে"),
            correctIndex = 0,
            explanationBn = "গ্রিক দার্শনিক প্লেটো আনুমানিক খ্রিস্টপূর্ব ৩৭৫ অব্দে তাঁর অমর সৃষ্টি 'The Republic' রচনা করেন।"
        ),
        McqQuestion(
            id = 3,
            questionBn = "কোন রাষ্ট্রচিন্তাবিদ ধর্ম ও নৈতিকতাকে রাজনীতি থেকে সম্পূর্ণ আলাদা করেন?",
            options = listOf("জন লক", "টমাস হব্‌স", "নিকোলো ম্যাকিয়াভেলি", "জঁ জ্যাক রুশো"),
            correctIndex = 2,
            explanationBn = "ম্যাকিয়াভেলি আধুনিক ধর্মনিরপেক্ষ ও বাস্তববাদী রাজনীতির গোড়াপত্তন করে নৈতিকতা থেকে রাষ্ট্রস্বার্থকে পৃথক করেন।"
        ),
        McqQuestion(
            id = 4,
            questionBn = "সার্বভৌমত্বের সবচেয়ে গ্রহণযোগ্য ৪টি উপাদানের মধ্যে প্রধান উপাদান কোনটি?",
            options = listOf("নির্দিষ্ট ভূখণ্ড", "জনসমষ্টি", "সরকার", "সার্বভৌমত্ব"),
            correctIndex = 3,
            explanationBn = "সার্বভৌমত্ব হলো রাষ্ট্রের প্রাণ ও চরম কর্তৃত্ব, যার অনুপস্থিতিতে কোনো মানবসমাজ রাষ্ট্র হতে পারে না।"
        ),
        McqQuestion(
            id = 5,
            questionBn = "‘Man is born free, and everywhere he is in chains’—উক্তিটি কার?",
            options = listOf("ভলতেয়ার", "মন্টেস্কু", "রুশো", "হেগেল"),
            correctIndex = 2,
            explanationBn = "ফরাসি দার্শনিক জঁ জ্যাক রুশো তাঁর বিখ্যাত 'The Social Contract' গ্রন্থের প্রথম অধ্যায়ে এ কালজয়ী ঘোষণা দেন।"
        )
    )
}
