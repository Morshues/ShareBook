package com.morshues.shareacctbook.repository

import com.morshues.shareacctbook.model.AccountBook
import org.springframework.data.jpa.repository.JpaRepository

interface AccountBookRepository : JpaRepository<AccountBook, Long> {

}