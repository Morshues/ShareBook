package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.*
import com.morshues.shareacctbook.security.CurrentUser
import com.morshues.shareacctbook.security.UserPrincipal
import com.morshues.shareacctbook.service.AccountBookItemService
import com.morshues.shareacctbook.service.CustomUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/acctBookItems")
class ItemController(
    private val userService: CustomUserService,
    private val accountBookItemService: AccountBookItemService,
) {

    @PutMapping("/create")
    fun addAccountBookItem(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody createAccountBookItemDTO: CreateAccountBookItemDTO,
    ): ResponseEntity<ApiResponse<ShowAccountBookItemDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedItemDto = accountBookItemService.createAccountBookItem(user, createAccountBookItemDTO)
        val response = ApiResponse(
            status = "success",
            data = savedItemDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PatchMapping("/update")
    fun updateAccountBook(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody accountBookItemDTO: EditAccountBookItemDTO,
    ): ResponseEntity<ApiResponse<ShowAccountBookItemDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedItemDto = accountBookItemService.updateAccountBookItem(user, accountBookItemDTO)
        val response = ApiResponse(
            status = "success",
            data = savedItemDto,
        )
        return ResponseEntity.ok(response)
    }

    @DeleteMapping("/delete/{accountBookItemId}")
    fun deleteAccountBookItem(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "accountBookItemId") accountBookItemId: Long,
    ): ResponseEntity<ApiResponse<Nothing>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        accountBookItemService.deleteAccountBookItem(user, accountBookItemId)
        val response = ApiResponse(
            status = "success",
            data = null,
        )
        return ResponseEntity(response, HttpStatus.OK)
    }
}