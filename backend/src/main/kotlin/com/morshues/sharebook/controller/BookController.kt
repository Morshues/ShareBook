package com.morshues.sharebook.controller

import com.morshues.sharebook.dto.ApiResponse
import com.morshues.sharebook.dto.CreateBookDTO
import com.morshues.sharebook.dto.ShowBookDTO
import com.morshues.sharebook.dto.EditBookDTO
import com.morshues.sharebook.dto.converter.BookConverter
import com.morshues.sharebook.security.CurrentUser
import com.morshues.sharebook.security.UserPrincipal
import com.morshues.sharebook.service.BookService
import com.morshues.sharebook.service.CustomUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/books")
class BookController(
    private val userService: CustomUserService,
    private val bookService: BookService,
    private val bookConverter: BookConverter,
) {

    @GetMapping("/")
    fun getBookList(@CurrentUser userPrincipal: UserPrincipal): ResponseEntity<ApiResponse<List<ShowBookDTO>>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val books = user.books.map { bookConverter.toShowDTO(it) }
        val response = ApiResponse(
            status = "success",
            data = books,
        )
        return ResponseEntity(response, HttpStatus.OK)
    }

    @GetMapping("/{bookId}")
    fun getBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "bookId") bookId: Long,
    ): ResponseEntity<ApiResponse<ShowBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val bookDto = bookService.findBook(user, bookId)
        val response = ApiResponse(
            status = "success",
            data = bookDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PutMapping("/create")
    fun addBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody createBookDTO: CreateBookDTO,
    ): ResponseEntity<ApiResponse<ShowBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val bookDto = bookService.createBookAndAssignOwner(user, createBookDTO)
        val response = ApiResponse(
            status = "success",
            data = bookDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PostMapping("/update")
    fun updateBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody bookDTO: EditBookDTO,
    ): ResponseEntity<ApiResponse<ShowBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedBookDto = bookService.updateBook(user, bookDTO)
        val response = ApiResponse(
            status = "success",
            data = savedBookDto,
        )
        return ResponseEntity.ok(response)
    }

    @DeleteMapping("/delete/{bookId}")
    fun deleteBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "bookId") bookId: Long,
    ): ResponseEntity<ApiResponse<Nothing>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        bookService.deleteBook(user, bookId)
        val response = ApiResponse(
            status = "success",
            data = null,
        )
        return ResponseEntity(response, HttpStatus.OK)
    }
}