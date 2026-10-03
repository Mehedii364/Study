package com.exam.politicaltheory.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Indigo500,
    secondary = Emerald500,
    tertiary = Amber500,
    background = Navy900,
    surface = Navy800,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Navy900,
    onBackground = Slate50,
    onSurface = Slate50
)

private val LightColorScheme = lightColorScheme(
    primary = Indigo600,
    secondary = Emerald600,
    tertiary = Amber500,
    background = Slate50,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Navy900,
    onBackground = Navy900,
    onSurface = Navy900
)

@Composable
fun PoliticalTheoryTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
