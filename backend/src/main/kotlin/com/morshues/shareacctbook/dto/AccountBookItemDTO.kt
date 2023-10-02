package com.morshues.shareacctbook.dto

import java.math.BigDecimal

data class CreateAccountBookItemDTO(
    val accountBookId: Long,
    val name: String,
    val description: String,
    val value: BigDecimal,
    val purchasedAt: Long?,
    val purchasedPlace: String?,
)

data class ShowAccountBookItemDTO(
    val id: Long,
    val accountBookId: Long,
    val name: String,
    val description: String,
    val value: BigDecimal,
    val purchasedAt: Long?,
    val purchasedPlace: String?,
    val createdAt: Long,
)