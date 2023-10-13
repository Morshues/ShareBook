package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ItemFlowEditDTO
import com.morshues.shareacctbook.dto.ItemFlowShowDTO
import com.morshues.shareacctbook.model.AccountBookItem
import com.morshues.shareacctbook.model.ItemFlow

interface AccountBookItemFlowConverter {
    fun toShowDTO(itemFlow: ItemFlow): ItemFlowShowDTO
    fun toItemFlow(item: AccountBookItem, dto: ItemFlowEditDTO): ItemFlow
}