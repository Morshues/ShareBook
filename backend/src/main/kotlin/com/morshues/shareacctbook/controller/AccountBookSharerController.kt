package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.AccountBookSharerDTO
import com.morshues.shareacctbook.dto.ApiResponse
import com.morshues.shareacctbook.security.CurrentUser
import com.morshues.shareacctbook.security.UserPrincipal
import com.morshues.shareacctbook.service.AccountBookSharerService
import com.morshues.shareacctbook.service.CustomUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/sharer")
class AccountBookSharerController(
    private val userService: CustomUserService,
    private val accountBookSharerService: AccountBookSharerService,
) {

    @GetMapping("/{accountBookId}")
    fun getSharers(
        @CurrentUser userPrincipal: UserPrincipal,
        @PathVariable(value = "accountBookId") accountBookId: Long,
    ): ResponseEntity<ApiResponse<List<AccountBookSharerDTO>>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val responseDto = accountBookSharerService.findAccountBookSharers(user, accountBookId)
        val response = ApiResponse(
            status = "success",
            data = responseDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }


}