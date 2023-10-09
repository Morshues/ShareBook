package com.morshues.shareacctbook.dto

data class AccountBookSharerDTO(
    val id: Long,
    val userId: Long?,
    val userEmail: String?,
    val userName: String?,
    val userImg: String?,
    val accountBookId: Long,
    val role: String,
    val createdAt: Long,
)

data class AccountBookSharerUpdateRoleDTO(
    val id: Long,
    val newRole: String,
)