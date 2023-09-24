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

val EditableRole = listOf(SharerRole.EDITOR, SharerRole.OWNER)
val ViewableRole = listOf(SharerRole.VIEWER, SharerRole.EDITOR, SharerRole.OWNER)

@Entity
@Table(name = "booksharers")
data class BookSharer(
    @EmbeddedId
    val id: BookSharerId,

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    val user: User,

    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    val book: Book,

    @Enumerated(EnumType.STRING)
    val role: SharerRole = SharerRole.VIEWER,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),
) {

    fun hasRole(roles: List<SharerRole>): Boolean {
        return roles.contains(this.role)
    }

}