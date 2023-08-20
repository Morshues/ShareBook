package com.morshues.sharebook.model

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.user.DefaultOAuth2User
import org.springframework.security.oauth2.core.user.OAuth2User

class GoogleOAuth2User(
    private val oAuth2User: OAuth2User
) : DefaultOAuth2User(oAuth2User.authorities, oAuth2User.attributes, "sub") {

    override fun getAttributes(): Map<String, Any> {
        return oAuth2User.attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority?> {
        return oAuth2User.authorities
    }

    override fun getName(): String {
        return oAuth2User.getAttribute<String>("name")!!
    }

    val email: String
        get() { return oAuth2User.getAttribute<String>("email")!! }

    val id: String
        get() { return oAuth2User.getAttribute<String>("sub")!! }

    val picture: String
        get() { return oAuth2User.getAttribute<String>("picture")!! }

}