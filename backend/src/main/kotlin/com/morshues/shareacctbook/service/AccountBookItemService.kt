package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.dto.CreateAccountBookItemDTO
import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
import com.morshues.shareacctbook.dto.converter.AccountBookItemConverter
import com.morshues.shareacctbook.model.*
import com.morshues.shareacctbook.repository.AccountBookItemRepository
import com.morshues.shareacctbook.repository.AccountBookRepository
import com.morshues.shareacctbook.util.TimeUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AccountBookItemService(
    private val accountBookRepository: AccountBookRepository,
    private val accountBookItemRepository: AccountBookItemRepository,
    private val accountBookItemConverter: AccountBookItemConverter,
) {

    @Transactional
    fun createAccountBookItem(user: User, accountBookItemDTO: CreateAccountBookItemDTO): ShowAccountBookItemDTO {
        val accountBook = accountBookRepository.findById(accountBookItemDTO.accountBookId)

        val accountBookItem = AccountBookItem(
            accountBook = accountBook.get(),
            name = accountBookItemDTO.name,
            description = accountBookItemDTO.description,
            value = accountBookItemDTO.value,
            purchasedAt = TimeUtils.timestampToZonedDateTime(accountBookItemDTO.purchasedAt?: System.currentTimeMillis()),
            purchasedPlace = accountBookItemDTO.purchasedPlace,
        )
        val savedItem = accountBookItemRepository.save(accountBookItem)
        return accountBookItemConverter.toShowDTO(savedItem)
    }


}