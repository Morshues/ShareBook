package com.morshues.sharebook.model

import jakarta.persistence.*
import java.io.Serializable
import java.time.ZonedDateTime

@Embeddable
data class BookSharerId(
    @Column(name = "user_id")
    var userId: Long = 0,
    @Column(name = "book_id")
    var bookId: Long = 0,
) : Serializable

enum class SharerRole {
    VIEWER,
    EDITOR,
    OWNER,
}

@Entity
@Table(name = "booksharers")
data class BookSharer(
    @EmbeddedId
    val id: BookSharerId,

    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "user_id")
    val user: User,

    @ManyToOne
    @MapsId("id")
    @JoinColumn(name = "book_id")
    val book: Book,

    @Enumerated(EnumType.STRING)
    val role: SharerRole = SharerRole.VIEWER,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),
) {
    fun canEdit(): Boolean {
        return role == SharerRole.EDITOR || role == SharerRole.OWNER
    }
}