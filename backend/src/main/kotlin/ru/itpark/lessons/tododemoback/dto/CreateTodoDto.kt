package ru.itpark.lessons.tododemoback.dto

data class CreateTodoDto(
    val title: String,
    val description: String,
    val status: String,
    val category: String,
)
