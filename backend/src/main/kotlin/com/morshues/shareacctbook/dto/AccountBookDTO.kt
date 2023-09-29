package com.morshues.shareacctbook.dto

data class CreateAccountBookDTO(
    val name: String,
    val description: String,
)

data class EditAccountBookDTO(
    val id: Long,
    val name: String,
    val description: String,
)

data class ShowAccountBookDTO(
    val id: Long,
    val name: String,
    val description: String,
    val createdAt: Long,
)