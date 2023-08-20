package com.morshues.sharebook.service

import com.morshues.sharebook.model.GoogleOAuth2User
import com.morshues.sharebook.model.OAuthProvider
import com.morshues.sharebook.model.User
import com.morshues.sharebook.repository.UserRepository
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Service
import java.security.Principal

@Service
class CustomUserService(
    private val userRepository: UserRepository
) : DefaultOAuth2UserService() {

    override fun loadUser(userRequest: OAuth2UserRequest?): OAuth2User {
        val user = super.loadUser(userRequest)
        return GoogleOAuth2User(user)
    }

    fun processGooglePostLogin(oAuth2User: GoogleOAuth2User) {
        val existUser = userRepository.getUserByEmail(oAuth2User.email)
        if (existUser == null) {
            val newUser = User(
                username = oAuth2User.name,
                email = oAuth2User.email,
                provider = OAuthProvider.GOOGLE,
                providerId = oAuth2User.id,
                profilePictureUrl = oAuth2User.picture,
            )
            userRepository.save(newUser)
        }
    }

    fun getUserFromPrincipal(principal: Principal): User {
        val oAuth2User = (principal as OAuth2AuthenticationToken).principal as GoogleOAuth2User
        return userRepository.getUserByEmail(oAuth2User.email)
            ?: throw RuntimeException("No user found for principal: ${oAuth2User.email}")
    }
}