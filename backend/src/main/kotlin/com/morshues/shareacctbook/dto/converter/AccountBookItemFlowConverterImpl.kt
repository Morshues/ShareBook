package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ItemFlowEditDTO
import com.morshues.shareacctbook.dto.ItemFlowShowDTO
import com.morshues.shareacctbook.model.AccountBookItem
import com.morshues.shareacctbook.model.ItemFlow
import com.morshues.shareacctbook.repository.AccountBookSharerRepository
import org.springframework.stereotype.Component

@Component
class AccountBookItemFlowConverterImpl(
    private val accountBookSharerRepository: AccountBookSharerRepository,
) : AccountBookItemFlowConverter {
    override fun toShowDTO(itemFlow: ItemFlow): ItemFlowShowDTO {
        return ItemFlowShowDTO(
            id = itemFlow.id!!,
            itemId = itemFlow.item.id!!,
            sharerId = itemFlow.sharer.id!!,
            value = itemFlow.value,
            createdAt = itemFlow.createdAt.toInstant().toEpochMilli(),
        )
    }

    override fun toItemFlow(item: AccountBookItem, dto: ItemFlowEditDTO): ItemFlow {
        val sharer = accountBookSharerRepository.findById(dto.sharerId).orElse(null)
        return ItemFlow(
            item = item,
            sharer = sharer,
            value = dto.value,
        )
    }
}