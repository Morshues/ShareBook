package com.morshues.sharebook.service

import com.morshues.sharebook.dto.CreateBookDTO
import com.morshues.sharebook.dto.converter.BookConverter
import com.morshues.sharebook.dto.converter.BookConverterImpl
import com.morshues.sharebook.model.*
import com.morshues.sharebook.repository.BookRepository
import com.morshues.sharebook.repository.BookSharerRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.*
import java.util.*

class BookServiceTest {
    private val bookRepository: BookRepository = mock()
    private val bookSharerRepository: BookSharerRepository = mock()
    private val bookConverter: BookConverter = BookConverterImpl()
    private val bookService = BookService(bookRepository, bookSharerRepository, bookConverter)

    @Test
    fun `test findBook returns expected DTO when book exists and user has permission`() {
        val mockUser = User(id = 1L, providerId = "123", email = "test@test.com", username = "test")
        val mockBook = Book(id = 2L, name = "Test Book", description = "Description")
        val mockShowBookDTO = bookConverter.toShowDTO(mockBook)

        whenever(bookRepository.findById(any())).thenReturn(Optional.of(mockBook))
        whenever(bookSharerRepository.findByUserAndBook(mockUser, mockBook)).thenReturn(
            BookSharer(id = BookSharerId(mockUser.id!!, mockBook.id!!), user = mockUser, book = mockBook, role = SharerRole.OWNER)
        )

        val result = bookService.findBook(mockUser, 2L)
        assertEquals(mockShowBookDTO, result)
    }

    @Test
    fun `test createBookAndAssignOwner successfully creates and returns book DTO`() {
        val user = User(id = 1L, providerId = "123", email = "test@test.com", username = "test")
        val createdBook = Book(id = 1, name = "Test Book", description = "Test Description")
        val createBookDTO = CreateBookDTO(createdBook.name, createdBook.description)

        whenever(bookRepository.save(Mockito.any(Book::class.java))).thenReturn(createdBook)
        val result = bookService.createBookAndAssignOwner(user, createBookDTO)
        assertEquals(bookConverter.toShowDTO(createdBook), result)

        argumentCaptor<Book>().apply {
            verify(bookRepository).save(capture())
            with(lastValue) {
                assertEquals(createdBook.name, this.name)
                assertEquals(createdBook.description, this.description)
            }
        }

        argumentCaptor<BookSharer>().apply {
            verify(bookSharerRepository).save(capture())
            with(firstValue) {
                assertEquals(user, this.user)
                assertEquals(createdBook, this.book)
                assertEquals(SharerRole.OWNER, this.role)
            }
        }
    }
}
