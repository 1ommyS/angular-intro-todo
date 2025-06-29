package ru.itpark.lessons.tododemoback.dto

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class ResponseContainer(
    val message: String,
    val data: Any? = null,
)
