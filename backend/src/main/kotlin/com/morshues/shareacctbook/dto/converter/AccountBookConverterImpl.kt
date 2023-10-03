package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ShowAccountBookDTO
import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
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

    override fun toShowWithItemsDTO(accountBook: AccountBook): ShowAccountBookDTO {
        return ShowAccountBookDTO(
            id = accountBook.id!!,
            name = accountBook.name,
            description = accountBook.description,
            createdAt = accountBook.createdAt.toInstant().toEpochMilli(),
            items = accountBook.items.map { item -> ShowAccountBookItemDTO(
                id = item.id!!,
                accountBookId = accountBook.id,
                name = item.name,
                description = item.description,
                value = item.value,
                purchasedAt = item.purchasedAt.toInstant().toEpochMilli(),
                purchasedPlace = item.purchasedPlace,
                createdAt = item.createdAt.toInstant().toEpochMilli()
            )}
        )
    }
}