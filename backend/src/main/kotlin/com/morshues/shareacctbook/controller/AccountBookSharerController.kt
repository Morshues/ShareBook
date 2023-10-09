package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.AccountBookSharerUpdateRoleDTO
import com.morshues.shareacctbook.dto.AccountBookSharerDTO
import com.morshues.shareacctbook.dto.ApiResponse
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
    ): ResponseEntity<ApiResponse<List<AccountBookSharerDTO>>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val responseDto = accountBookSharerService.findAccountBookSharers(user, accountBookId)
        val response = ApiResponse(
            status = "success",
            data = responseDto,
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