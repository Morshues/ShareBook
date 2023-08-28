package com.morshues.sharebook.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "app")
data class AppProperties(
    val auth: Auth = Auth(),
    val oauth2: OAuth2 = OAuth2(),
)

data class Auth(
    val tokenSecret: String = "",
    val tokenExpirationMsec: Long = 0,
)

data class OAuth2(
    val authorizedRedirectUris: List<String> = ArrayList()
)