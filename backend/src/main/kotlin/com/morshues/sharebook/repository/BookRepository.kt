package com.morshues.sharebook.repository

import com.morshues.sharebook.model.Book
import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository : JpaRepository<Book, Long> {

}