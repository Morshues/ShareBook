package com.morshues.sharebook.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeController {

    @GetMapping("/")
    fun home(): String {
        return "hello home <a href=\"/oauth2/authorization/google\">Login with Google</a><br>"
    }

}