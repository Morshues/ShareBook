package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
import com.morshues.shareacctbook.model.AccountBookItem

interface AccountBookItemConverter {
    fun toShowDTO(accountBookItem: AccountBookItem): ShowAccountBookItemDTO
}