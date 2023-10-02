package com.morshues.shareacctbook.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.ZonedDateTime

@Entity
@Table(name = "account_book_items")
data class AccountBookItem(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "account_book_id")
    val accountBook: AccountBook,

    val name: String,

    val description: String,

    val value: BigDecimal,

    @Column(name = "created_at")
    val createdAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_at")
    val purchasedAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_place")
    val purchasedPlace: String?,

)