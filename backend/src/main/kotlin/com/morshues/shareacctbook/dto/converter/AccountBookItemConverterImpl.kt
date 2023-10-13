package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.AccountBookItemShowDTO
import com.morshues.shareacctbook.dto.ItemFlowShowDTO
import com.morshues.shareacctbook.model.AccountBookItem
import org.springframework.stereotype.Component

@Component
class AccountBookItemConverterImpl : AccountBookItemConverter {
    override fun toShowDTO(accountBookItem: AccountBookItem): AccountBookItemShowDTO {
        return AccountBookItemShowDTO(
            id = accountBookItem.id!!,
            accountBookId = accountBookItem.accountBook.id!!,
            name = accountBookItem.name,
            description = accountBookItem.description,
            value = accountBookItem.value,
            purchasedAt = accountBookItem.purchasedAt.toInstant().toEpochMilli(),
            purchasedPlace = accountBookItem.purchasedPlace,
            createdAt = accountBookItem.createdAt.toInstant().toEpochMilli(),
            flows = accountBookItem.flows.map { flow -> ItemFlowShowDTO(
                id = flow.id!!,
                itemId = flow.item.id!!,
                sharerId = flow.sharer.id!!,
                value = flow.value,
                createdAt = flow.createdAt.toInstant().toEpochMilli(),
            )},
        )
    }
}