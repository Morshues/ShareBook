package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.dto.CreateAccountBookDTO
import com.morshues.shareacctbook.dto.converter.AccountBookConverter
import com.morshues.shareacctbook.dto.converter.AccountBookConverterImpl
import com.morshues.shareacctbook.model.*
import com.morshues.shareacctbook.repository.AccountBookRepository
import com.morshues.shareacctbook.repository.AccountBookSharerRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.*
import java.util.*

class AccountAccountBookServiceTest {
    private val accountBookRepository: AccountBookRepository = mock()
    private val accountBookSharerRepository: AccountBookSharerRepository = mock()
    private val accountBookConverter: AccountBookConverter = AccountBookConverterImpl()
    private val accountBookService = AccountBookService(accountBookRepository, accountBookSharerRepository, accountBookConverter)

    @Test
    fun `test findAccountBook returns expected DTO when account book exists and user has permission`() {
        val mockUser = User(id = 1L, providerId = "123", email = "test@test.com", username = "test")
        val mockAccountBook = AccountBook(id = 2L, name = "Test Book", description = "Description")
        val mockShowAccountBookDTO = accountBookConverter.toShowWithItemsDTO(mockAccountBook)

        whenever(accountBookRepository.findById(any())).thenReturn(Optional.of(mockAccountBook))
        whenever(accountBookSharerRepository.findByUserAndAccountBook(mockUser, mockAccountBook)).thenReturn(
            AccountBookSharer(user = mockUser, accountBook = mockAccountBook, role = SharerRole.OWNER)
        )

        val result = accountBookService.findAccountBook(mockUser, 2L)
        assertEquals(mockShowAccountBookDTO, result)
    }

    @Test
    fun `test createAccountBookAndAssignOwner successfully creates and returns account book DTO`() {
        val user = User(id = 1L, providerId = "123", email = "test@test.com", username = "test")
        val createdAccountBook = AccountBook(id = 1, name = "Test Book", description = "Test Description")
        val createAccountBookDTO = CreateAccountBookDTO(createdAccountBook.name, createdAccountBook.description)

        whenever(accountBookRepository.save(Mockito.any(AccountBook::class.java))).thenReturn(createdAccountBook)
        val result = accountBookService.createAccountBookAndAssignOwner(user, createAccountBookDTO)
        assertEquals(accountBookConverter.toShowDTO(createdAccountBook), result)

        argumentCaptor<AccountBook>().apply {
            verify(accountBookRepository).save(capture())
            with(lastValue) {
                assertEquals(createdAccountBook.name, this.name)
                assertEquals(createdAccountBook.description, this.description)
            }
        }

        argumentCaptor<AccountBookSharer>().apply {
            verify(accountBookSharerRepository).save(capture())
            with(firstValue) {
                assertEquals(user, this.user)
                assertEquals(createdAccountBook, this.accountBook)
                assertEquals(SharerRole.OWNER, this.role)
            }
        }
    }
}
