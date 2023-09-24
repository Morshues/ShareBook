package com.morshues.sharebook.controller

import com.morshues.sharebook.dto.ApiResponse
import com.morshues.sharebook.model.User
import com.morshues.sharebook.security.CurrentUser
import com.morshues.sharebook.security.UserPrincipal
import com.morshues.sharebook.service.CustomUserService
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
        val response = ApiResponse(
            status = "success",
            data = UserResponse(user),
        )
        return ResponseEntity.ok(response)
    }

}

data class UserResponse(private val user: User) {
    val name = user.username
    val email = user.email
    val pictureUrl = user.profilePictureUrl
}