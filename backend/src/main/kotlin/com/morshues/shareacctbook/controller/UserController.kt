package com.morshues.shareacctbook.controller

import com.morshues.shareacctbook.dto.ApiResponse
import com.morshues.shareacctbook.model.User
import com.morshues.shareacctbook.security.CurrentUser
import com.morshues.shareacctbook.security.UserPrincipal
import com.morshues.shareacctbook.service.CustomUserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(
    val userService: CustomUserService,
) {

    @GetMapping("/user")
    fun currentUser(@CurrentUser userPrincipal: UserPrincipal): ResponseEntity<ApiResponse<UserResponse>> {
        val user = userService.getUserFromPrincipal(userPrincipal)
        val response = ApiResponse.success(UserResponse(user))
        return ResponseEntity.ok(response)
    }

}

data class UserResponse(private val user: User) {
    val name = user.username
    val email = user.email
    val pictureUrl = user.profilePictureUrl
}