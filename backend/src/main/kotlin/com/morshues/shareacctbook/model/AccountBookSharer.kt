package com.morshues.shareacctbook.model

import jakarta.persistence.*
import java.io.Serializable
import java.time.ZonedDateTime

@Embeddable
data class AccountBookSharerId(
    @Column(name = "user_id")
    var userId: Long = 0,
    @Column(name = "account_book_id")
    var accountBookId: Long = 0,
) : Serializable

enum class SharerRole {
    VIEWER,
    EDITOR,
    OWNER,
}

val EditableRole = listOf(SharerRole.EDITOR, SharerRole.OWNER)
val ViewableRole = listOf(SharerRole.VIEWER, SharerRole.EDITOR, SharerRole.OWNER)

@Entity
@Table(name = "account_book_sharers")
data class AccountBookSharer(
    @EmbeddedId
    val id: AccountBookSharerId,

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    val user: User,

    @ManyToOne
    @MapsId("account_bookId")
    @JoinColumn(name = "account_book_id")
    val accountBook: AccountBook,

    @Enumerated(EnumType.STRING)
    val role: SharerRole = SharerRole.VIEWER,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),
) {

    fun hasRole(roles: List<SharerRole>): Boolean {
        return roles.contains(this.role)
    }

}