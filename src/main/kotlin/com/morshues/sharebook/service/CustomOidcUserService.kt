package com.morshues.sharebook.service

import com.morshues.sharebook.model.GoogleOidcUser
import com.morshues.sharebook.model.OAuthProvider
import com.morshues.sharebook.model.User
import com.morshues.sharebook.repository.UserRepository
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService
import org.springframework.security.oauth2.core.oidc.user.OidcUser
import org.springframework.stereotype.Service
import java.security.Principal
import java.time.ZonedDateTime

@Service
class CustomOidcUserService(
    private val userRepository: UserRepository
) : OidcUserService() {

    override fun loadUser(userRequest: OidcUserRequest?): OidcUser {
        val user = super.loadUser(userRequest)
        return GoogleOidcUser(user)
    }

    fun processGooglePostLogin(oidcUser: GoogleOidcUser) {
        val existUser = userRepository.getUserByEmail(oidcUser.email)
        if (existUser == null) {
            val newUser = User(
                username = oidcUser.name,
                email = oidcUser.email,
                provider = OAuthProvider.GOOGLE,
                providerId = oidcUser.getId(),
                profilePictureUrl = oidcUser.picture,
            )
            userRepository.save(newUser)
        }
    }

    fun getUserFromPrincipal(principal: Principal): User {
        val oidcUser = (principal as OAuth2AuthenticationToken).principal as GoogleOidcUser
        return userRepository.getUserByEmail(oidcUser.email)
            ?: throw RuntimeException("No user found for principal: ${oidcUser.email}")
    }
}