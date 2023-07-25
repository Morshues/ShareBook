package com.morshues.sharebook.model

import jakarta.persistence.*
import java.time.ZonedDateTime

@Entity
@Table(name = "itemflows")
data class ItemFlow(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "item_id")
    val item: BookItem,

    @ManyToOne
    @JoinColumns(JoinColumn(name = "user_id"), JoinColumn(name = "book_id"))
    val sharer: BookSharer,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),

    val value: Double,

)