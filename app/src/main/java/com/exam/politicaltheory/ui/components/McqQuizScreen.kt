package com.exam.politicaltheory.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.data.McqQuestion
import com.exam.politicaltheory.ui.theme.*

@Composable
fun McqQuizScreen(
    questions: List<McqQuestion>,
    modifier: Modifier = Modifier
) {
    val selectedOptions = remember { mutableStateMapOf<Int, Int>() }
    var score by remember { mutableStateOf(0) }

    fun calculateScore(): Int {
        var currentScore = 0
        questions.forEach { q ->
            if (selectedOptions[q.id] == q.correctIndex) {
                currentScore++
            }
        }
        return currentScore
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Top Score Header
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = Navy900)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "MCQ কুইজ ও আত্মযাচাই",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        text = "স্কোর: ${calculateScore()} / ${questions.size}",
                        fontSize = 13.sp,
                        color = Amber500,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                Button(
                    onClick = {
                        selectedOptions.clear()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Indigo600),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Icon(imageVector = Icons.Default.Refresh, contentDescription = "Reset", modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(text = "রিসেট", fontSize = 12.sp)
                }
            }
        }

        Spacer(modifier = Modifier.height(14.dp))

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(14.dp),
            modifier = Modifier.fillMaxSize()
        ) {
            itemsIndexed(questions) { index, q ->
                val selected = selectedOptions[q.id]
                val isAnswered = selected != null

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    border = BorderStroke(1.dp, Slate200)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = "${index + 1}. ${q.questionBn}",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = Navy900
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        q.options.forEachIndexed { optIndex, optionText ->
                            val isSelectedOption = selected == optIndex
                            val isCorrectOption = optIndex == q.correctIndex

                            val backgroundColor = when {
                                !isAnswered -> if (isSelectedOption) Indigo100 else Slate50
                                isCorrectOption -> Emerald100
                                isSelectedOption -> Color(0xFFFFE4E6)
                                else -> Slate50
                            }

                            val borderColor = when {
                                !isAnswered -> if (isSelectedOption) Indigo600 else Slate200
                                isCorrectOption -> Emerald500
                                isSelectedOption -> Rose500
                                else -> Slate200
                            }

                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(backgroundColor)
                                    .clickable(enabled = !isAnswered) {
                                        selectedOptions[q.id] = optIndex
                                    }
                                    .padding(horizontal = 12.dp, vertical = 10.dp)
                            ) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = optionText,
                                        fontSize = 13.sp,
                                        color = Navy900,
                                        fontWeight = if (isSelectedOption) FontWeight.Bold else FontWeight.Normal
                                    )

                                    if (isAnswered) {
                                        if (isCorrectOption) {
                                            Icon(
                                                imageVector = Icons.Default.Check,
                                                contentDescription = "Correct",
                                                tint = Emerald500,
                                                modifier = Modifier.size(18.dp)
                                            )
                                        } else if (isSelectedOption) {
                                            Icon(
                                                imageVector = Icons.Default.Close,
                                                contentDescription = "Incorrect",
                                                tint = Rose500,
                                                modifier = Modifier.size(18.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }

                        // Explanation
                        AnimatedVisibility(visible = isAnswered) {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(top = 10.dp)
                                    .background(Color(0xFFF8FAFC), RoundedCornerShape(8.dp))
                                    .padding(10.dp)
                            ) {
                                Text(
                                    text = "ব্যাখ্যা: ${q.explanationBn}",
                                    fontSize = 12.sp,
                                    color = Color(0xFF475569)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
