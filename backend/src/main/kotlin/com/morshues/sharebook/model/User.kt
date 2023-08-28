package com.morshues.sharebook.model

import jakarta.persistence.*
import java.time.ZonedDateTime

enum class AuthProvider {
    LOCAL,
    GOOGLE
}

@Entity
@Table(name = "users")
data class User(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Enumerated(EnumType.STRING)
    val provider: AuthProvider = AuthProvider.LOCAL,

    @Column(name = "provider_id")
    private val providerId: String? = null,

    val email: String,

    var username: String,

    val password: String = "",

    @Column(name = "profile_picture_url")
    var profilePictureUrl: String? = null,

    @Column(name = "created_at")
    private val createdAt: ZonedDateTime = ZonedDateTime.now(),
) {
    @ManyToMany
    @JoinTable(
        name = "booksharers",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "book_id")]
    )
    val books: Set<Book> = HashSet()
}