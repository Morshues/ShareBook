package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.*
import com.morshues.shareacctbook.security.CurrentUser
import com.morshues.shareacctbook.security.UserPrincipal
import com.morshues.shareacctbook.service.AccountBookSharerService
import com.morshues.shareacctbook.service.CustomUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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
    ): ResponseEntity<ApiResponse<AccountBookSharerListDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val responseDto = accountBookSharerService.findAccountBookSharers(user, accountBookId)
        val response = ApiResponse(
            status = "success",
            data = responseDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PutMapping("/create")
    fun addSharer(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody createSharerDTO: AccountBookSharerCreateDTO,
    ): ResponseEntity<ApiResponse<AccountBookSharerDTO>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val savedSharerDto = accountBookSharerService.createAccountBookSharer(user, createSharerDTO)
        val response = ApiResponse(
            status = "success",
            data = savedSharerDto,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

    @PutMapping("/updateRole")
    fun updateRole(
        @CurrentUser userPrincipal: UserPrincipal,
        @RequestBody updateRoleDTO: AccountBookSharerUpdateRoleDTO,
    ): ResponseEntity<ApiResponse<String>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val result = accountBookSharerService.updateRole(user, updateRoleDTO)
        val response = ApiResponse(
            status = "success",
            data = result,
        )
        return ResponseEntity(response, HttpStatus.CREATED)
    }

}