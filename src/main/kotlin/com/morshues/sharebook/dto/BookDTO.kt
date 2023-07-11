package com.morshues.sharebook.dto

data class CreateBookDTO(
    val name: String,
    val description: String,
)

data class UpdateBookDTO(
    val id: Long,
    val name: String,
    val description: String,
)