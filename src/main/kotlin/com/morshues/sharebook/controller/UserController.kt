package com.morshues.sharebook.controller

import com.morshues.sharebook.service.CustomOidcUserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class UserController(
    val userService: CustomOidcUserService,
) {

    @GetMapping("/user")
    fun currentUser(principal: Principal): String {
        val user = userService.getUserFromPrincipal(principal)
        return "$user<br>" +
                "${user.books}"
    }

}