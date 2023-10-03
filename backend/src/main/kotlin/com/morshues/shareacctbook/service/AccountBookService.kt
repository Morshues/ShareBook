package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.dto.CreateAccountBookDTO
import com.morshues.shareacctbook.dto.EditAccountBookDTO
import com.morshues.shareacctbook.dto.ShowAccountBookDTO
import com.morshues.shareacctbook.dto.converter.AccountBookConverter
import com.morshues.shareacctbook.handler.NoPermissionException
import com.morshues.shareacctbook.handler.NotFoundException
import com.morshues.shareacctbook.model.*
import com.morshues.shareacctbook.repository.AccountBookRepository
import com.morshues.shareacctbook.repository.AccountBookSharerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AccountBookService(
    private val accountBookRepository: AccountBookRepository,
    private val accountBookSharerRepository: AccountBookSharerRepository,
    private val accountBookConverter: AccountBookConverter,
) {

    @Transactional
    fun findAccountBook(user: User, id: Long): ShowAccountBookDTO {
        val accountBook = accountBookRepository.findById(id)
            .orElseThrow { NotFoundException("Account book not found") }

        checkPermission(user, accountBook, ViewableRole)

        return accountBookConverter.toShowWithItemsDTO(accountBook)
    }

    @Transactional
    fun createAccountBookAndAssignOwner(user: User, accountBookDTO: CreateAccountBookDTO): ShowAccountBookDTO {
        val accountBook = AccountBook(
            name = accountBookDTO.name,
            description = accountBookDTO.description,
        )
        val savedAccountBook = accountBookRepository.save(accountBook)
        val accountBookSharerId = AccountBookSharerId(user.id!!, savedAccountBook.id!!)
        val accountBookSharer = AccountBookSharer(
            id = accountBookSharerId,
            user = user,
            accountBook = savedAccountBook,
            role = SharerRole.OWNER,
        )
        accountBookSharerRepository.save(accountBookSharer)
        return accountBookConverter.toShowDTO(savedAccountBook)
    }

    @Transactional
    fun updateAccountBook(user: User, accountBookDTO: EditAccountBookDTO): ShowAccountBookDTO {
        val accountBook = accountBookRepository.findById(accountBookDTO.id)
            .orElseThrow { NotFoundException("Account book not found") }

        checkPermission(user, accountBook, EditableRole)

        accountBook.name = accountBookDTO.name
        accountBook.description = accountBookDTO.description
        val savedAccountBook = accountBookRepository.save(accountBook)
        return accountBookConverter.toShowDTO(savedAccountBook)
    }

    @Transactional
    fun deleteAccountBook(user: User, id: Long) {
        val accountBook = accountBookRepository.findById(id)
            .orElseThrow { NotFoundException("Account book not found") }

        checkPermission(user, accountBook, SharerRole.OWNER)

        accountBookSharerRepository.deleteAllByAccountBook(accountBook)
        accountBookRepository.deleteById(id)
    }


    private fun checkPermission(user: User, accountBook: AccountBook, allowRole: SharerRole) {
        checkPermission(user, accountBook, listOf(allowRole))
    }

    private fun checkPermission(user: User, accountBook: AccountBook, allowRoles: List<SharerRole>) {
        val sharer = accountBookSharerRepository.findByUserAndAccountBook(user, accountBook)
        if (sharer?.hasRole(allowRoles) != true) {
            throw NoPermissionException("No permission to process")
        }
    }

}