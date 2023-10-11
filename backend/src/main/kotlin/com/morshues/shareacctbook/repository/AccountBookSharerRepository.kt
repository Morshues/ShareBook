package com.morshues.shareacctbook.repository

import com.morshues.shareacctbook.model.AccountBook
import com.morshues.shareacctbook.model.AccountBookSharer
import com.morshues.shareacctbook.model.User
import org.springframework.data.repository.CrudRepository

interface AccountBookSharerRepository : CrudRepository<AccountBookSharer, Long> {

    fun findByUserAndAccountBook(user: User?, accountBook: AccountBook): AccountBookSharer?

    fun deleteAllByAccountBook(accountBook: AccountBook)

    fun save(accountBookSharer: AccountBookSharer): AccountBookSharer

}