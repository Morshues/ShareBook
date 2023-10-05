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
    @JoinColumn(name = "account_book_id", nullable = false)
    val accountBook: AccountBook,

    var name: String,

    var description: String,

    var value: BigDecimal,

    @Column(name = "created_at")
    val createdAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_at")
    var purchasedAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_place")
    var purchasedPlace: String?,

)