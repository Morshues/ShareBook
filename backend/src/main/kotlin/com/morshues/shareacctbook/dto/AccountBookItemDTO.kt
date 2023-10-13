package com.morshues.shareacctbook.dto

import java.math.BigDecimal

data class AccountBookItemCreateDTO(
    val accountBookId: Long,
    val name: String,
    val description: String,
    val value: BigDecimal,
    val purchasedAt: Long?,
    val purchasedPlace: String?,
    val flows: List<ItemFlowEditDTO>,
)

data class AccountBookItemEditDTO(
    val id: Long,
    val name: String,
    val description: String,
    val value: BigDecimal,
    val purchasedAt: Long?,
    val purchasedPlace: String?,
    val flows: List<ItemFlowEditDTO>,
)

data class AccountBookItemShowDTO(
    val id: Long,
    val accountBookId: Long,
    val name: String,
    val description: String,
    val value: BigDecimal,
    val purchasedAt: Long?,
    val purchasedPlace: String?,
    val createdAt: Long,
    val flows: List<ItemFlowShowDTO>,
)

data class ItemFlowEditDTO(
    val id: Long?,
    val sharerId: Long,
    val value: BigDecimal,
)

data class ItemFlowShowDTO(
    val id: Long,
    val sharerId: Long,
    val itemId: Long,
    val value: BigDecimal,
    val createdAt: Long,
)