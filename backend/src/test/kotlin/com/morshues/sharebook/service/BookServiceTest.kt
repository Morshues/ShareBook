package com.morshues.sharebook.service

import com.morshues.sharebook.model.*
import com.morshues.sharebook.repository.BookRepository
import com.morshues.sharebook.repository.BookSharerRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.kotlin.*

class BookServiceTest {
    private val bookRepository: BookRepository = mock()
    private val bookSharerRepository: BookSharerRepository = mock()
    private val bookService = BookService(bookRepository, bookSharerRepository)

    @Test
    fun testCreateBookWithOwner() {
        val user = User(id = 1L, providerId = "123", email = "test@test.com", username = "test")
        val book = Book(name = "Test Book", description = "Test Description")
        val savedBook = book.copy(id = 2)
        whenever(bookRepository.save(book)).thenReturn(savedBook)

        val result = bookService.createBookWithOwner(user, book)

        assertEquals(savedBook, result)
        verify(bookRepository).save(book)

        argumentCaptor<BookSharer>().apply {
            verify(bookSharerRepository).save(capture())
            with(firstValue) {
                assertEquals(user, this.user)
                assertEquals(savedBook, this.book)
                assertEquals(SharerRole.OWNER, this.role)
            }
        }
    }
}
