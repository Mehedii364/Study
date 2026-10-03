package com.exam.politicaltheory.ui.components

import androidx.compose.foundation.BorderStroke
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.data.SubjectExamInfo
import com.exam.politicaltheory.ui.theme.Amber500
import com.exam.politicaltheory.ui.theme.Navy900
import com.exam.politicaltheory.ui.theme.Slate200

@Composable
fun ExamHeaderCard(
    info: SubjectExamInfo,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = BorderStroke(1.dp, Slate200),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Surface(
                color = Navy900,
                shape = RoundedCornerShape(6.dp),
                modifier = Modifier.padding(bottom = 6.dp)
            ) {
                Text(
                    text = "জাতীয় বিশ্ববিদ্যালয় বাংলাদেশ",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 3.dp)
                )
            }

            Text(
                text = info.degreeYear,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF334155),
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(2.dp))

            Text(
                text = info.titleBn,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Navy900,
                textAlign = TextAlign.Center
            )

            Text(
                text = "${info.paperBn} · ${info.paperCode}",
                fontSize = 12.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF4F46E5),
                textAlign = TextAlign.Center
            )

            Divider(
                modifier = Modifier.padding(vertical = 10.dp),
                thickness = 1.dp,
                color = Slate200
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceAround
            ) {
                InfoBadge(label = "পূর্ণমান", value = "${info.fullMarks}")
                InfoBadge(label = "সময়", value = info.timeLimit)
                InfoBadge(label = "সেশন", value = "২০২৫-২৬")
            }
        }
    }
}

@Composable
private fun InfoBadge(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = label, fontSize = 10.sp, color = Color.Gray)
        Text(text = value, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Navy900)
    }
}
