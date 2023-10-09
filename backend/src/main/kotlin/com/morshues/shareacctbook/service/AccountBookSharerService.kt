package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.dto.*
import com.morshues.shareacctbook.dto.converter.AccountBookSharerConverter
import com.morshues.shareacctbook.handler.NoPermissionException
import com.morshues.shareacctbook.handler.NotFoundException
import com.morshues.shareacctbook.model.*
import com.morshues.shareacctbook.repository.AccountBookRepository
import com.morshues.shareacctbook.repository.AccountBookSharerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AccountBookSharerService(
    private val accountBookRepository: AccountBookRepository,
    private val accountBookSharerRepository: AccountBookSharerRepository,
    private val accountBookSharerConverter: AccountBookSharerConverter,
) {

    @Transactional
    fun findAccountBookSharers(user: User, accountBookId: Long): List<AccountBookSharerDTO> {
        val accountBook = accountBookRepository.findById(accountBookId)
            .orElseThrow { NotFoundException("Account book not found") }

        checkPermission(user, accountBook, ViewableRole)

        val sharers = accountBook.sharers

        return sharers.map { accountBookSharerConverter.toShowDTO(it) }
    }

    @Transactional
    fun createAccountBookSharer(user: User, createSharerDTO: AccountBookSharerCreateDTO): AccountBookSharerDTO {
        val accountBook = accountBookRepository.findById(createSharerDTO.accountBookId)
            .orElseThrow { NotFoundException("Account book not found") }

        checkPermission(user, accountBook, listOf(SharerRole.OWNER))

        val accountBookSharer = AccountBookSharer(
            accountBook = accountBook,
            displayName = createSharerDTO.displayName,
            role = SharerRole.valueOf(createSharerDTO.role),
        )
        val savedSharer = accountBookSharerRepository.save(accountBookSharer)
        return accountBookSharerConverter.toShowDTO(savedSharer)
    }

    fun updateRole(user: User, updateRoleDTO: AccountBookSharerUpdateRoleDTO): String {
        val sharer = accountBookSharerRepository.findById(updateRoleDTO.id)
            .orElseThrow { NotFoundException("Account book sharer not found") }

        checkPermission(user, sharer.accountBook, listOf(SharerRole.OWNER))

        sharer.role = SharerRole.valueOf(updateRoleDTO.newRole)
        val updatedSharer = accountBookSharerRepository.save(sharer)
        return updatedSharer.role.name
    }

    private fun checkPermission(user: User, accountBook: AccountBook, allowRoles: List<SharerRole>) {
        val sharer = accountBookSharerRepository.findByUserAndAccountBook(user, accountBook)
        if (sharer?.hasRole(allowRoles) != true) {
            throw NoPermissionException("No permission to process")
        }
    }

}