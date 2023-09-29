package com.morshues.shareacctbook.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.ZonedDateTime
import java.util.*

@Entity
@Table(name = "account_book_items")
data class AccountBookItem(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "book_id")
    val accountBook: AccountBook,

    val value: BigDecimal,

    val description: String,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_at")
    val purchasedAt: Date,

    @Column(name = "purchased_store")
    val purchasedStore: String,

    )