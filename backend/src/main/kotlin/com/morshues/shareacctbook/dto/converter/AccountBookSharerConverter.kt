package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.AccountBookSharerDTO
import com.morshues.shareacctbook.model.AccountBookSharer

interface AccountBookSharerConverter {
    fun toShowDTO(sharer: AccountBookSharer): AccountBookSharerDTO
}