package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.ApiResponse
import com.morshues.shareacctbook.dto.CreateAccountBookDTO
import com.morshues.shareacctbook.dto.ShowAccountBookDTO
import com.morshues.shareacctbook.dto.EditAccountBookDTO
import com.morshues.shareacctbook.dto.converter.AccountBookConverter
import com.morshues.shareacctbook.security.CurrentUser
import com.morshues.shareacctbook.security.UserPrincipal
import com.morshues.shareacctbook.service.AccountBookService
import com.morshues.shareacctbook.service.CustomUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/acctBooks")
class AccountBookController(
    private val userService: CustomUserService,
    private val accountBookService: AccountBookService,
    private val accountBookConverter: AccountBookConverter,
) {

    @GetMapping("/")
    fun getAccountBookList(@CurrentUser userPrincipal: UserPrincipal): ResponseEntity<ApiResponse<List<ShowAccountBookDTO>>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val accountBooks = user.accountBooks.map { accountBookConverter.toShowDTO(it) }
        val response = ApiResponse.success(accountBooks)
        return ResponseEntity(response, HttpStatus.OK)
    }

    @GetMapping("/{accountBookId}")
    fun getAccountBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "accountBookId") accountBookId: Long,
    ): ResponseEntity<ApiResponse<ShowAccountBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val accountBookDto = accountBookService.findAccountBook(user, accountBookId)
        val response = ApiResponse.success(accountBookDto)
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PutMapping("/create")
    fun addAccountBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody createAccountBookDTO: CreateAccountBookDTO,
    ): ResponseEntity<ApiResponse<ShowAccountBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedAccountBookDto = accountBookService.createAccountBookAndAssignOwner(user, createAccountBookDTO)
        val response = ApiResponse.success(savedAccountBookDto)
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PatchMapping("/update")
    fun updateAccountBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody accountBookDTO: EditAccountBookDTO,
    ): ResponseEntity<ApiResponse<ShowAccountBookDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedBookDto = accountBookService.updateAccountBook(user, accountBookDTO)
        val response = ApiResponse.success(savedBookDto)
        return ResponseEntity.ok(response)
    }

    @DeleteMapping("/delete/{accountBookId}")
    fun deleteAccountBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "accountBookId") accountBookId: Long,
    ): ResponseEntity<ApiResponse<Nothing>> {
        val response = ApiResponse.success()
        return ResponseEntity(response, HttpStatus.OK)
    }
}