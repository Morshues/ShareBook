package com.morshues.sharebook.security.oauth2.user

import com.morshues.sharebook.util.OAuth2AuthenticationProcessingException
import com.morshues.sharebook.model.AuthProvider

object OAuth2UserInfoFactory {
    fun getOAuth2UserInfo(registrationId: String, attributes: Map<String, Any>): OAuth2UserInfo {
        return if (registrationId.equals(AuthProvider.GOOGLE.toString(), ignoreCase = true)) {
            GoogleOAuth2UserInfo(attributes)
        } else {
            throw OAuth2AuthenticationProcessingException("Sorry! Login with $registrationId is not supported yet.")
        }
    }
}