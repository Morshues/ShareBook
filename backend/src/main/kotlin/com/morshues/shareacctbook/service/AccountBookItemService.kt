package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.dto.CreateAccountBookItemDTO
import com.morshues.shareacctbook.dto.EditAccountBookItemDTO
import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
import com.morshues.shareacctbook.dto.converter.AccountBookItemConverter
import com.morshues.shareacctbook.handler.NoPermissionException
import com.morshues.shareacctbook.handler.NotFoundException
import com.morshues.shareacctbook.model.*
import com.morshues.shareacctbook.repository.AccountBookItemRepository
import com.morshues.shareacctbook.repository.AccountBookRepository
import com.morshues.shareacctbook.repository.AccountBookSharerRepository
import com.morshues.shareacctbook.util.TimeUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AccountBookItemService(
    private val accountBookRepository: AccountBookRepository,
    private val accountBookSharerRepository: AccountBookSharerRepository,
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

    @Transactional
    fun updateAccountBookItem(user: User, accountBookItemDTO: EditAccountBookItemDTO): ShowAccountBookItemDTO {
        val item = accountBookItemRepository.findById(accountBookItemDTO.id)
            .orElseThrow { NotFoundException("Account book item not found") }

        checkPermission(user, item, EditableRole)

        item.name = accountBookItemDTO.name
        item.description = accountBookItemDTO.description
        item.value = accountBookItemDTO.value
        item.purchasedPlace = accountBookItemDTO.purchasedPlace
        item.purchasedAt = TimeUtils.timestampToZonedDateTime(accountBookItemDTO.purchasedAt?: System.currentTimeMillis())
        val savedItem = accountBookItemRepository.save(item)
        return accountBookItemConverter.toShowDTO(savedItem)
    }

    @Transactional
    fun deleteAccountBookItem(user: User, id: Long) {
        val item = accountBookItemRepository.findById(id)
            .orElseThrow { NotFoundException("Account book item not found") }

        checkPermission(user, item, EditableRole)

        accountBookItemRepository.deleteById(id)
    }

    private fun checkPermission(user: User, item: AccountBookItem, allowRoles: List<SharerRole>) {
        val accountBook = item.accountBook
        val sharer = accountBookSharerRepository.findByUserAndAccountBook(user, accountBook)
        if (sharer?.hasRole(allowRoles) != true) {
            throw NoPermissionException("No permission to process")
        }
    }
}