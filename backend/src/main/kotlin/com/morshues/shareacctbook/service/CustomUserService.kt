package com.morshues.shareacctbook.service

import com.morshues.shareacctbook.model.GoogleOAuth2User
import com.morshues.shareacctbook.model.User
import com.morshues.shareacctbook.repository.UserRepository
import com.morshues.shareacctbook.security.UserPrincipal
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service

@Service
class CustomUserService(
    private val userRepository: UserRepository
) : DefaultOAuth2UserService() {

    override fun loadUser(userRequest: OAuth2UserRequest?): OAuth2User {
        val user = super.loadUser(userRequest)
        return GoogleOAuth2User(user)
    }

    fun getUserFromPrincipal(principal: UserPrincipal): User {
        return userRepository.findById(principal.id).get()
    }
}