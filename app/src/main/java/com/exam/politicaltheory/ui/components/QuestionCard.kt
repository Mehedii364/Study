package com.exam.politicaltheory.ui.components

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.data.Question
import com.exam.politicaltheory.ui.theme.*

@Composable
fun QuestionCard(
    question: Question,
    isCompleted: Boolean,
    onToggleComplete: () -> Unit,
    modifier: Modifier = Modifier
) {
    var expanded by remember { mutableStateOf(false) }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .clickable { expanded = !expanded },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isCompleted) Color(0xFFF0FDF4) else Color.White
        ),
        border = BorderStroke(
            1.dp,
            if (isCompleted) Emerald500.copy(alpha = 0.5f) else Slate200
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            // Header Row: Question number, Important badge, Years, Completion toggle
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(24.dp)
                            .background(
                                if (isCompleted) Emerald500 else Navy900,
                                CircleShape
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = question.questionNumber,
                            color = Color.White,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.width(8.dp))

                    if (question.isImportant) {
                        Surface(
                            color = Amber500.copy(alpha = 0.15f),
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Star,
                                    contentDescription = "Star",
                                    tint = Amber500,
                                    modifier = Modifier.size(12.dp)
                                )
                                Spacer(modifier = Modifier.width(2.dp))
                                Text(
                                    text = "৯৯% কমন",
                                    color = Amber500,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    if (question.yearsExamined.isNotEmpty()) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "বোর্ড: ${question.yearsExamined.take(2).joinToString(", ")}",
                            fontSize = 10.sp,
                            color = Color.Gray
                        )
                    }
                }

                // Completion Toggle Button
                IconButton(
                    onClick = onToggleComplete,
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        imageVector = if (isCompleted) Icons.Default.CheckCircle else Icons.Outlined.CheckCircle,
                        contentDescription = "Mark Complete",
                        tint = if (isCompleted) Emerald500 else Color.LightGray,
                        modifier = Modifier.size(22.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // Question Text
            Text(
                text = question.questionBn,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Navy900,
                lineHeight = 22.sp
            )

            // Preview or toggle icon
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = if (expanded) "উত্তর সংক্ষেপ করুন" else "পূর্ণাঙ্গ উত্তর দেখুন...",
                    fontSize = 11.sp,
                    color = Indigo600,
                    fontWeight = FontWeight.Medium
                )
                Icon(
                    imageVector = if (expanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                    contentDescription = "Toggle",
                    tint = Indigo600,
                    modifier = Modifier.size(20.dp)
                )
            }

            // Expandable Detailed Answer
            AnimatedVisibility(
                visible = expanded,
                enter = expandVertically(),
                exit = shrinkVertically()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 10.dp)
                        .background(Slate100, RoundedCornerShape(8.dp))
                        .padding(12.dp)
                ) {
                    Text(
                        text = "পরীক্ষোপযোগী উত্তর:",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Navy800
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = question.answerBn,
                        fontSize = 14.sp,
                        color = Color(0xFF1E293B),
                        lineHeight = 22.sp
                    )

                    if (question.keyPoints.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = "মুখ্য বুলেট পয়েন্টসমূহ:",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Indigo600
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        question.keyPoints.forEach { point ->
                            Row(modifier = Modifier.padding(vertical = 2.dp)) {
                                Text(text = "• ", color = Indigo600, fontWeight = FontWeight.Bold)
                                Text(text = point, fontSize = 13.sp, color = Navy800)
                            }
                        }
                    }
                }
            }
        }
    }
}
