package ru.itpark.lessons.tododemoback.dto

import java.util.*

data class Todo(
    val id: UUID,
    val title: String,
    val description: String,
    val status: String,
    val category: String,
)
