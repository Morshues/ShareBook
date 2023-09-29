package com.morshues.shareacctbook.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.ZonedDateTime

@Entity
@Table(name = "item_flows")
data class ItemFlow(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "item_id")
    val item: AccountBookItem,

    @ManyToOne
    @JoinColumns(JoinColumn(name = "user_id"), JoinColumn(name = "account_book_id"))
    val sharer: AccountBookSharer,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),

    val value: BigDecimal,

    )