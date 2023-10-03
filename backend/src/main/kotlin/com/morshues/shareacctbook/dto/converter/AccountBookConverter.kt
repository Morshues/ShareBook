package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.ShowAccountBookDTO
import com.morshues.shareacctbook.model.AccountBook

interface AccountBookConverter {
    fun toShowDTO(accountBook: AccountBook): ShowAccountBookDTO
    fun toShowWithItemsDTO(accountBook: AccountBook): ShowAccountBookDTO
}