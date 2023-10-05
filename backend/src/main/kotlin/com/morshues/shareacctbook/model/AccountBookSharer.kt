package com.morshues.shareacctbook.model

import jakarta.persistence.*
import java.time.ZonedDateTime

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
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @JoinColumn(name = "user_id")
    val user: User? = null,

    @ManyToOne
    @JoinColumn(name = "account_book_id", nullable = false)
    val accountBook: AccountBook,

    @Enumerated(EnumType.STRING)
    val role: SharerRole = SharerRole.VIEWER,

    @Column(name = "created_at")
    val createdAt: ZonedDateTime = ZonedDateTime.now(),
) {

    fun hasRole(roles: List<SharerRole>): Boolean {
        return roles.contains(this.role)
    }

}