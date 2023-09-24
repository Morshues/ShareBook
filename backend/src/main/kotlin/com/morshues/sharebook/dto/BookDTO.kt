package com.morshues.sharebook.dto

data class CreateBookDTO(
    val name: String,
    val description: String,
)

data class EditBookDTO(
    val id: Long,
    val name: String,
    val description: String,
)

data class ShowBookDTO(
    val id: Long,
    val name: String,
    val description: String,
    val createdAt: Long,
)