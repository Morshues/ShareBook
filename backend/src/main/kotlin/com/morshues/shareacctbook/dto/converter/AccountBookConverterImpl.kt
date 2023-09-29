package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ShowAccountBookDTO
import com.morshues.shareacctbook.model.AccountBook
import org.springframework.stereotype.Component

@Component
class AccountBookConverterImpl : AccountBookConverter {
    override fun toShowDTO(accountBook: AccountBook): ShowAccountBookDTO {
        return ShowAccountBookDTO(
            id = accountBook.id!!,
            name = accountBook.name,
            description = accountBook.description,
            createdAt = accountBook.createdAt.toInstant().toEpochMilli(),
        )
    }
}