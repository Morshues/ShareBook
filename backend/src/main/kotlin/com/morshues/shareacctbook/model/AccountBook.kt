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
    @OneToMany(mappedBy = "accountBook", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val sharers: List<AccountBookSharer> = listOf()

    @OneToMany(mappedBy = "accountBook", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val items: List<AccountBookItem> = listOf()

}