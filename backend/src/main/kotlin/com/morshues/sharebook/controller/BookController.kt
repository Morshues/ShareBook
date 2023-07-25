package com.morshues.sharebook.controller

import com.morshues.sharebook.dto.CreateBookDTO
import com.morshues.sharebook.dto.UpdateBookDTO
import com.morshues.sharebook.model.Book
import com.morshues.sharebook.service.BookService
import com.morshues.sharebook.service.CustomOidcUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/books")
class BookController(
    private val customOidcUserService: CustomOidcUserService,
    private val bookService: BookService,
) {

    @PostMapping("/add")
    fun addBook(principal: Principal, @RequestBody bookDTO: CreateBookDTO): ResponseEntity<Book> {
        val user = customOidcUserService.getUserFromPrincipal(principal)
        val savedBook = bookService.createBookWithOwner(user, bookDTO)
        return ResponseEntity(savedBook, HttpStatus.CREATED)
    }

    @PostMapping("/update")
    fun updateBook(principal: Principal, @RequestBody bookDTO: UpdateBookDTO): ResponseEntity<Book> {
        val user = customOidcUserService.getUserFromPrincipal(principal)
        val savedBook = bookService.updateBook(user, bookDTO)
        return ResponseEntity.ok(savedBook)
    }

    @GetMapping("/all")
    fun getBooksForCurrentUser(principal: Principal): ResponseEntity<List<Book>> {
        val user = customOidcUserService.getUserFromPrincipal(principal)
        val books = user.books.toList()
        return ResponseEntity(books, HttpStatus.OK)
    }

}