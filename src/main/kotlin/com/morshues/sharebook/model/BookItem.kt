package com.morshues.sharebook.model

import jakarta.persistence.*
import java.time.ZonedDateTime
import java.util.*

@Entity
@Table(name = "bookitems")
data class BookItem(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "book_id")
    val book: Book,

    val value: Double,

    val description: String,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),

    @Column(name = "purchased_at")
    val purchasedAt: Date,

    @Column(name = "purchased_store")
    val purchasedStore: String,

    )