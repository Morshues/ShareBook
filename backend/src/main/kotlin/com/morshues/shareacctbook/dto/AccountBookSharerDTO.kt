package com.morshues.shareacctbook.dto

data class AccountBookSharerDTO(
    val id: Long,
    val displayName: String?,
    val userId: Long?,
    val userEmail: String?,
    val userName: String?,
    val userImg: String?,
    val accountBookId: Long,
    val role: String,
    val createdAt: Long,
)

data class AccountBookSharerCreateDTO(
    val accountBookId: Long,
    val displayName: String?,
    val role: String,
)

data class AccountBookSharerUpdateRoleDTO(
    val id: Long,
    val newRole: String,
)