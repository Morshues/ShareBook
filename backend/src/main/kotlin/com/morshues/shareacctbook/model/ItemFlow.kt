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
    @JoinColumn(name = "item_id", nullable = false)
    val item: AccountBookItem,

    @ManyToOne
    @JoinColumn(name = "sharer_id")
    val sharer: AccountBookSharer,

    @Column(name = "created_at")
    val createdAt: ZonedDateTime = ZonedDateTime.now(),

    var value: BigDecimal,
)