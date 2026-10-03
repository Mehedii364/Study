package com.exam.politicaltheory.ui.components

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.FormatQuote
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.exam.politicaltheory.data.MotivationalQuote
import com.exam.politicaltheory.ui.theme.Amber500
import com.exam.politicaltheory.ui.theme.Navy900
import com.exam.politicaltheory.ui.theme.Navy800

@Composable
fun MotivationalQuoteCard(
    quotes: List<MotivationalQuote>,
    modifier: Modifier = Modifier
) {
    var currentIndex by remember { mutableStateOf(0) }
    val currentQuote = quotes.getOrElse(currentIndex) { quotes.first() }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp)),
        colors = CardDefaults.cardColors(containerColor = Navy900),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Box(
            modifier = Modifier
                .background(
                    Brush.verticalGradient(
                        colors = listOf(Navy900, Navy800)
                    )
                )
                .padding(16.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.FormatQuote,
                            contentDescription = "Quote",
                            tint = Amber500,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "দার্শনিকদের অনুপ্রেরণামূলক উক্তি",
                            color = Amber500,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    IconButton(
                        onClick = {
                            currentIndex = (currentIndex + 1) % quotes.size
                        },
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Next Quote",
                            tint = Color.White.copy(alpha = 0.8f),
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                AnimatedContent(
                    targetState = currentQuote,
                    transitionSpec = { fadeIn() togetherWith fadeOut() },
                    label = "QuoteAnimation"
                ) { quote ->
                    Column {
                        Text(
                            text = "“${quote.quoteBn}”",
                            color = Color.White,
                            fontSize = 14.sp,
                            lineHeight = 22.sp,
                            fontWeight = FontWeight.Medium
                        )

                        Spacer(modifier = Modifier.height(6.dp))

                        Text(
                            text = quote.quoteEn,
                            color = Color.White.copy(alpha = 0.65f),
                            fontSize = 11.sp,
                            fontStyle = FontStyle.Italic,
                            lineHeight = 16.sp
                        )

                        Spacer(modifier = Modifier.height(10.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "— ${quote.author}",
                                color = Amber500,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = quote.context,
                                color = Color.White.copy(alpha = 0.5f),
                                fontSize = 10.sp
                            )
                        }
                    }
                }
            }
        }
    }
}
