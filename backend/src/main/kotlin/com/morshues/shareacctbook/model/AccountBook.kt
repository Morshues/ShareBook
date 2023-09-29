package com.morshues.shareacctbook.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import java.time.ZonedDateTime

@Entity
@Table(name = "account_books")
data class AccountBook(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @field:NotBlank(message = "Name must not be blank")
    var name: String,

    var description: String,

    @Column(name = "created_at")
    val createdAt: ZonedDateTime = ZonedDateTime.now(),

) {
    @ManyToMany(mappedBy = "accountBooks")
    val users: Set<User> = HashSet()
}