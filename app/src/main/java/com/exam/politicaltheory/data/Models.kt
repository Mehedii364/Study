package com.exam.politicaltheory.data

enum class QuestionSection(val labelBn: String, val fullMarks: Int, val passMarksDesc: String) {
    PART_A("ক-বিভাগ (অতি সংক্ষিপ্ত)", 10, "১০টি প্রশ্নের উত্তর (প্রতিটি ১ নম্বর)"),
    PART_B("খ-বিভাগ (সংক্ষিপ্ত প্রশ্ন)", 20, "৫টি প্রশ্নের উত্তর (প্রতিটি ৪ নম্বর)"),
    PART_C("গ-বিভাগ (রচনামূলক প্রশ্ন)", 50, "৫টি প্রশ্নের উত্তর (প্রতিটি ১০ নম্বর)")
}

data class Question(
    val id: Int,
    val questionNumber: String,
    val section: QuestionSection,
    val questionBn: String,
    val answerBn: String,
    val keyPoints: List<String> = emptyList(),
    val yearsExamined: List<String> = emptyList(),
    val isImportant: Boolean = false,
    val repeatCount: Int = 1,
    val starRating: Int = 3
)

data class McqQuestion(
    val id: Int,
    val questionBn: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanationBn: String
)

data class MotivationalQuote(
    val id: Int,
    val quoteBn: String,
    val quoteEn: String,
    val author: String,
    val context: String
)

data class SubjectExamInfo(
    val titleBn: String = "রাষ্ট্রবিজ্ঞান (Political Science)",
    val paperBn: String = "রাজনৈতিক তত্ত্ব (Political Theory) - প্রথম পত্র",
    val paperCode: String = "১১১৯০১ (111901)",
    val degreeYear: String = "বিএ / বিএসএস ডিগ্রি (পাস) প্রথম বর্ষ",
    val session: String = "পরীক্ষা-২০২৫ (অনুষ্ঠিতব্য-২০২৬/২৭)",
    val fullMarks: Int = 80,
    val timeLimit: String = "৩ ঘণ্টা ৩০ মিনিট"
)
