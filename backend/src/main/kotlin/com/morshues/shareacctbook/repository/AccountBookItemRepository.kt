package com.morshues.shareacctbook.repository

import com.morshues.shareacctbook.model.AccountBookItem
import org.springframework.data.jpa.repository.JpaRepository

interface AccountBookItemRepository : JpaRepository<AccountBookItem, Long> {
}