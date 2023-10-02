package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
import com.morshues.shareacctbook.model.AccountBookItem
import org.springframework.stereotype.Component

@Component
class AccountBookItemConverterImpl : AccountBookItemConverter {
    override fun toShowDTO(accountBookItem: AccountBookItem): ShowAccountBookItemDTO {
        return ShowAccountBookItemDTO(
            id = accountBookItem.id!!,
            accountBookId = accountBookItem.accountBook.id!!,
            name = accountBookItem.name,
            description = accountBookItem.description,
            value = accountBookItem.value,
            purchasedAt = accountBookItem.purchasedAt.toInstant().toEpochMilli(),
            purchasedPlace = accountBookItem.purchasedPlace,
            createdAt = accountBookItem.createdAt.toInstant().toEpochMilli(),
        )
    }
}