package com.morshues.sharebook.repository

import com.morshues.sharebook.model.Book
import com.morshues.sharebook.model.BookSharer
import com.morshues.sharebook.model.User
import org.springframework.data.repository.CrudRepository

interface BookSharerRepository : CrudRepository<BookSharer, Long> {

    fun findByUserAndBook(user: User, book: Book): BookSharer?

    fun deleteAllByBook(book: Book)

    fun save(bookSharer: BookSharer): BookSharer

}