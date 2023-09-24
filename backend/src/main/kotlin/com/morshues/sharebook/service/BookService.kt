package com.morshues.sharebook.service

import com.morshues.sharebook.dto.CreateBookDTO
import com.morshues.sharebook.dto.EditBookDTO
import com.morshues.sharebook.dto.ShowBookDTO
import com.morshues.sharebook.dto.converter.BookConverter
import com.morshues.sharebook.handler.NoPermissionException
import com.morshues.sharebook.handler.NotFoundException
import com.morshues.sharebook.model.*
import com.morshues.sharebook.repository.BookRepository
import com.morshues.sharebook.repository.BookSharerRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BookService(
    private val bookRepository: BookRepository,
    private val bookSharerRepository: BookSharerRepository,
    private val bookConverter: BookConverter,
) {

    @Transactional
    fun findBook(user: User, id: Long): ShowBookDTO {
        val book = bookRepository.findById(id)
            .orElseThrow { NotFoundException("Book not found") }

        checkPermission(user, book, ViewableRole)

        return bookConverter.toShowDTO(book)
    }

    @Transactional
    fun createBookAndAssignOwner(user: User, bookDTO: CreateBookDTO): ShowBookDTO {
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
        return bookConverter.toShowDTO(savedBook)
    }

    @Transactional
    fun updateBook(user: User, bookDTO: EditBookDTO): ShowBookDTO {
        val book = bookRepository.findById(bookDTO.id)
            .orElseThrow { NotFoundException("Book not found") }

        checkPermission(user, book, EditableRole)

        book.name = bookDTO.name
        book.description = bookDTO.description
        val savedBook = bookRepository.save(book)
        return bookConverter.toShowDTO(savedBook)
    }

    @Transactional
    fun deleteBook(user: User, id: Long) {
        val book = bookRepository.findById(id)
            .orElseThrow { NotFoundException("Book not found") }

        checkPermission(user, book, SharerRole.OWNER)

        bookSharerRepository.deleteAllByBook(book)
        bookRepository.deleteById(id)
    }


    private fun checkPermission(user: User, book: Book, allowRole: SharerRole) {
        checkPermission(user, book, listOf(allowRole))
    }

    private fun checkPermission(user: User, book: Book, allowRoles: List<SharerRole>) {
        val sharer = bookSharerRepository.findByUserAndBook(user, book)
        if (sharer?.hasRole(allowRoles) != true) {
            throw NoPermissionException("No permission to process")
        }
    }

}