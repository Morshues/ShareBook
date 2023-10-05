package com.morshues.shareacctbook.dto

data class AccountBookSharerDTO(
    val id: Long,
    val userId: Long?,
    val accountBookId: Long,
    val role: String,
    val createdAt: Long,
)
