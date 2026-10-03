package com.exam.politicaltheory.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.ui.theme.Emerald500
import com.exam.politicaltheory.ui.theme.Indigo600
import com.exam.politicaltheory.ui.theme.Navy900
import com.exam.politicaltheory.ui.theme.Slate200

@Composable
fun StudyStatsCard(
    completedA: Int,
    totalA: Int,
    completedB: Int,
    totalB: Int,
    completedC: Int,
    totalC: Int,
    modifier: Modifier = Modifier
) {
    val totalDone = completedA + completedB + completedC
    val totalAll = totalA + totalB + totalC
    val overallPercent = if (totalAll > 0) ((totalDone.toFloat() / totalAll) * 100).toInt() else 0

    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "স্টাডি প্রগ্রেস ও পরিসংখ্যান",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Navy900
                    )
                    Text(
                        text = "মোট পড়া শেষ: $totalDone / $totalAll টি প্রশ্ন",
                        fontSize = 12.sp,
                        color = Color.Gray
                    )
                }

                Surface(
                    color = Emerald500.copy(alpha = 0.15f),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "$overallPercent% সম্পন্ন",
                        color = Emerald500,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            SectionProgressRow(label = "ক-বিভাগ (অতি সংক্ষিপ্ত)", done = completedA, total = totalA, color = Indigo600)
            Spacer(modifier = Modifier.height(8.dp))
            SectionProgressRow(label = "খ-বিভাগ (সংক্ষিপ্ত)", done = completedB, total = totalB, color = Emerald500)
            Spacer(modifier = Modifier.height(8.dp))
            SectionProgressRow(label = "গ-বিভাগ (রচনামূলক)", done = completedC, total = totalC, color = Color(0xFFD97706))
        }
    }
}

@Composable
private fun SectionProgressRow(
    label: String,
    done: Int,
    total: Int,
    color: Color
) {
    val progress = if (total > 0) (done.toFloat() / total) else 0f
    val percent = (progress * 100).toInt()

    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = label, fontSize = 11.sp, color = Color(0xFF334155), fontWeight = FontWeight.Medium)
            Text(text = "$done/$total ($percent%)", fontSize = 11.sp, color = color, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.height(4.dp))
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            color = color,
            trackColor = Slate200,
        )
    }
}
