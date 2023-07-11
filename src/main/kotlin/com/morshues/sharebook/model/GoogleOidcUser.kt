package com.morshues.sharebook.model

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.core.oidc.OidcIdToken
import org.springframework.security.oauth2.core.oidc.OidcUserInfo
import org.springframework.security.oauth2.core.oidc.user.OidcUser


class GoogleOidcUser(private val oidcUser: OidcUser) : OidcUser {

    override fun getAttributes(): Map<String, Any> {
        return oidcUser.attributes
    }

    override fun getAuthorities(): Collection<GrantedAuthority?> {
        return oidcUser.authorities
    }

    override fun getClaims(): MutableMap<String, Any> {
        return oidcUser.claims
    }

    override fun getUserInfo(): OidcUserInfo {
        return oidcUser.userInfo
    }

    override fun getIdToken(): OidcIdToken {
        return oidcUser.idToken
    }

    override fun getName(): String {
        return oidcUser.getAttribute<String>("name")!!
    }

    override fun getEmail(): String {
        return oidcUser.getAttribute<String>("email")!!
    }

    fun getId(): String {
        return oidcUser.claims["sub"] as String
    }

}