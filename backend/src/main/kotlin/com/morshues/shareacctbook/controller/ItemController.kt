package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.ApiResponse
import com.morshues.shareacctbook.dto.CreateAccountBookItemDTO
import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
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
        val savedAccountBookDto = accountBookItemService.createAccountBookItem(user, createAccountBookItemDTO)
        val response = ApiResponse(
            status = "success",
            data = savedAccountBookDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
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