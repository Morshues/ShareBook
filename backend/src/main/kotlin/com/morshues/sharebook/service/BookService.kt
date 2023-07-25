package com.morshues.sharebook.service

import com.morshues.sharebook.dto.CreateBookDTO
import com.morshues.sharebook.dto.UpdateBookDTO
import com.morshues.sharebook.model.*
import com.morshues.sharebook.repository.BookRepository
import com.morshues.sharebook.repository.BookSharerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.lang.Exception

@Service
class BookService(
    private val bookRepository: BookRepository,
    private val bookSharerRepository: BookSharerRepository,
) {

    @Transactional
    fun createBookWithOwner(user: User, bookDTO: CreateBookDTO): Book {
        val book = Book(
            name = bookDTO.name,
            description = bookDTO.description,
        )
        val savedBook = bookRepository.save(book)
        val bookSharerId = BookSharerId(user.id!!, savedBook.id!!)
        val bookSharer = BookSharer(
            id = bookSharerId,
            user = user,
            book = savedBook,
            role = SharerRole.OWNER,
        )
        bookSharerRepository.save(bookSharer)
        return savedBook
    }

    @Transactional
    fun updateBook(user: User, bookDTO: UpdateBookDTO): Book? {
        val book = bookRepository.findById(bookDTO.id)
            .orElseThrow { Exception("Book not found") }

        checkPermission(user, book)

        book.name = bookDTO.name
        book.description = bookDTO.description
        return bookRepository.save(book)
    }

    private fun checkPermission(user: User, book: Book) {
        val canEdit = bookSharerRepository.findByUserAndBook(user, book)?.canEdit() ?: false
        if (!canEdit) {
            throw Exception() // TODO: no permission exception
        }
    }

}