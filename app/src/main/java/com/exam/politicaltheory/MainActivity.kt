package com.exam.politicaltheory

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.data.Question
import com.exam.politicaltheory.data.QuestionSection
import com.exam.politicaltheory.data.Repository
import com.exam.politicaltheory.ui.components.*
import com.exam.politicaltheory.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PoliticalTheoryTheme {
                MainAppScreen()
            }
        }
    }
}

enum class NavTab(val title: String) {
    HOME("হোম"),
    PART_A("ক-বিভাগ"),
    PART_B("খ-বিভাগ"),
    PART_C("গ-বিভাগ"),
    MCQ("কুইজ"),
    IMPORTANT("৯৯% কমন")
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainAppScreen() {
    var currentTab by remember { mutableStateOf(NavTab.HOME) }
    var searchQuery by remember { mutableStateOf("") }
    val completedIds = remember { mutableStateListOf<Int>() }
    var currentAudioQuestionIndex by remember { mutableStateOf(0) }

    val allQuestions = remember {
        Repository.partAQuestions + Repository.partBQuestions + Repository.partCQuestions
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "রাষ্ট্রবিজ্ঞান ১ম পত্র (রাজনৈতিক তত্ত্ব)",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = "ডিগ্রি ১ম বর্ষ চূড়ান্ত সাজেশনস ও উত্তরমালা",
                            fontSize = 11.sp,
                            color = Amber500
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Navy900
                ),
                actions = {
                    IconButton(onClick = { currentTab = NavTab.IMPORTANT }) {
                        Icon(
                            imageVector = Icons.Default.Star,
                            contentDescription = "Important",
                            tint = Amber500
                        )
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 8.dp
            ) {
                NavigationBarItem(
                    selected = currentTab == NavTab.HOME,
                    onClick = { currentTab = NavTab.HOME },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text(NavTab.HOME.title, fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(selectedIconColor = Indigo600, selectedTextColor = Indigo600)
                )
                NavigationBarItem(
                    selected = currentTab == NavTab.PART_A,
                    onClick = { currentTab = NavTab.PART_A },
                    icon = { Icon(Icons.Default.FormatListNumbered, contentDescription = "Part A") },
                    label = { Text(NavTab.PART_A.title, fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(selectedIconColor = Indigo600, selectedTextColor = Indigo600)
                )
                NavigationBarItem(
                    selected = currentTab == NavTab.PART_B,
                    onClick = { currentTab = NavTab.PART_B },
                    icon = { Icon(Icons.Default.MenuBook, contentDescription = "Part B") },
                    label = { Text(NavTab.PART_B.title, fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(selectedIconColor = Indigo600, selectedTextColor = Indigo600)
                )
                NavigationBarItem(
                    selected = currentTab == NavTab.PART_C,
                    onClick = { currentTab = NavTab.PART_C },
                    icon = { Icon(Icons.Default.Article, contentDescription = "Part C") },
                    label = { Text(NavTab.PART_C.title, fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(selectedIconColor = Indigo600, selectedTextColor = Indigo600)
                )
                NavigationBarItem(
                    selected = currentTab == NavTab.MCQ,
                    onClick = { currentTab = NavTab.MCQ },
                    icon = { Icon(Icons.Default.Psychology, contentDescription = "MCQ") },
                    label = { Text(NavTab.MCQ.title, fontSize = 11.sp) },
                    colors = NavigationBarItemDefaults.colors(selectedIconColor = Indigo600, selectedTextColor = Indigo600)
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .background(Slate50)
        ) {
            when (currentTab) {
                NavTab.HOME -> {
                    HomeScreen(
                        onNavigate = { currentTab = it },
                        completedCountA = Repository.partAQuestions.count { it.id in completedIds },
                        completedCountB = Repository.partBQuestions.count { it.id in completedIds },
                        completedCountC = Repository.partCQuestions.count { it.id in completedIds },
                        allQuestions = allQuestions,
                        currentAudioIndex = currentAudioQuestionIndex,
                        onNextAudio = {
                            currentAudioQuestionIndex = (currentAudioQuestionIndex + 1) % allQuestions.size
                        }
                    )
                }
                NavTab.PART_A -> {
                    QuestionListScreen(
                        title = "ক-বিভাগ: অতি সংক্ষিপ্ত প্রশ্নাবলি (মান ১০)",
                        subtitle = "১২টি প্রশ্ন থেকে যে কোনো ১০টির উত্তর দিতে হবে",
                        questions = Repository.partAQuestions,
                        completedIds = completedIds,
                        onToggleComplete = { id ->
                            if (id in completedIds) completedIds.remove(id) else completedIds.add(id)
                        }
                    )
                }
                NavTab.PART_B -> {
                    QuestionListScreen(
                        title = "খ-বিভাগ: সংক্ষিপ্ত প্রশ্নাবলি (মান ২০)",
                        subtitle = "৮টি প্রশ্ন থেকে যে কোনো ৫টির উত্তর দিতে হবে",
                        questions = Repository.partBQuestions,
                        completedIds = completedIds,
                        onToggleComplete = { id ->
                            if (id in completedIds) completedIds.remove(id) else completedIds.add(id)
                        }
                    )
                }
                NavTab.PART_C -> {
                    QuestionListScreen(
                        title = "গ-বিভাগ: রচনামূলক প্রশ্নাবলি (মান ৫০)",
                        subtitle = "৮টি প্রশ্ন থেকে যে কোনো ৫টির পূর্ণাঙ্গ উত্তর দিতে হবে",
                        questions = Repository.partCQuestions,
                        completedIds = completedIds,
                        onToggleComplete = { id ->
                            if (id in completedIds) completedIds.remove(id) else completedIds.add(id)
                        }
                    )
                }
                NavTab.MCQ -> {
                    McqQuizScreen(questions = Repository.mcqQuestions)
                }
                NavTab.IMPORTANT -> {
                    val importantList = remember { allQuestions.filter { it.isImportant } }
                    QuestionListScreen(
                        title = "⭐ ৯৯% নিশ্চিত কমন সাজেশনস",
                        subtitle = "বিগত বছরের সর্বাধিক বিশ্লেষিত ও স্টার চিহ্নিত প্রশ্নাবলী",
                        questions = importantList,
                        completedIds = completedIds,
                        onToggleComplete = { id ->
                            if (id in completedIds) completedIds.remove(id) else completedIds.add(id)
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun HomeScreen(
    onNavigate: (NavTab) -> Unit,
    completedCountA: Int,
    completedCountB: Int,
    completedCountC: Int,
    allQuestions: List<Question>,
    currentAudioIndex: Int,
    onNextAudio: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            ExamHeaderCard(info = Repository.subjectInfo)
        }

        item {
            MotivationalQuoteCard(quotes = Repository.motivationalQuotes)
        }

        item {
            StudyStatsCard(
                completedA = completedCountA,
                totalA = Repository.partAQuestions.size,
                completedB = completedCountB,
                totalB = Repository.partBQuestions.size,
                completedC = completedCountC,
                totalC = Repository.partCQuestions.size
            )
        }

        item {
            AudioPlayerCard(
                currentQuestion = allQuestions.getOrElse(currentAudioIndex) { allQuestions.first() },
                onNextQuestion = onNextAudio
            )
        }

        item {
            Text(
                text = "সরাসরি অধ্যয়ন সেকশন",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = Navy900,
                modifier = Modifier.padding(top = 4.dp)
            )
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                QuickNavCard(
                    title = "ক-বিভাগ",
                    sub = "অতি সংক্ষিপ্ত",
                    color = Indigo600,
                    modifier = Modifier.weight(1f),
                    onClick = { onNavigate(NavTab.PART_A) }
                )
                QuickNavCard(
                    title = "খ-বিভাগ",
                    sub = "সংক্ষিপ্ত প্রশ্ন",
                    color = Emerald500,
                    modifier = Modifier.weight(1f),
                    onClick = { onNavigate(NavTab.PART_B) }
                )
                QuickNavCard(
                    title = "গ-বিভাগ",
                    sub = "রচনামূলক",
                    color = Color(0xFFD97706),
                    modifier = Modifier.weight(1f),
                    onClick = { onNavigate(NavTab.PART_C) }
                )
            }
        }

        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                QuickNavCard(
                    title = "MCQ কুইজ",
                    sub = "স্ব-মূল্যায়ন",
                    color = Color(0xFF7C3AED),
                    modifier = Modifier.weight(1f),
                    onClick = { onNavigate(NavTab.MCQ) }
                )
                QuickNavCard(
                    title = "⭐ ৯৯% কমন",
                    sub = "টপ সাজেশন",
                    color = Amber500,
                    modifier = Modifier.weight(1f),
                    onClick = { onNavigate(NavTab.IMPORTANT) }
                )
            }
        }
    }
}

@Composable
fun QuickNavCard(
    title: String,
    sub: String,
    color: Color,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(containerColor = color)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = title, color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            Text(text = sub, color = Color.White.copy(alpha = 0.85f), fontSize = 11.sp)
        }
    }
}

@Composable
fun QuestionListScreen(
    title: String,
    subtitle: String,
    questions: List<Question>,
    completedIds: List<Int>,
    onToggleComplete: (Int) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    val filtered = remember(searchQuery, questions) {
        if (searchQuery.isBlank()) questions
        else questions.filter {
            it.questionBn.contains(searchQuery, ignoreCase = true) ||
            it.answerBn.contains(searchQuery, ignoreCase = true)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Section header
        Text(text = title, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Navy900)
        Text(text = subtitle, fontSize = 12.sp, color = Color.Gray)

        Spacer(modifier = Modifier.height(10.dp))

        // Search Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("প্রশ্ন বা উত্তর অনুসন্ধান করুন...", fontSize = 13.sp) },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = "Search", tint = Color.Gray) },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp),
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = Color.White,
                unfocusedContainerColor = Color.White
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            items(filtered, key = { it.id }) { question ->
                QuestionCard(
                    question = question,
                    isCompleted = question.id in completedIds,
                    onToggleComplete = { onToggleComplete(question.id) }
                )
            }
        }
    }
}
