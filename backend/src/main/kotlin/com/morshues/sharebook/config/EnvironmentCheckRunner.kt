package com.morshues.sharebook.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class EnvironmentCheckRunner : CommandLineRunner {
    @Value("\${GOOGLE_CLIENT_ID:}")
    private val googleClientId: String? = null

    @Value("\${GOOGLE_CLIENT_SECRET:}")
    private val googleClientSecret: String? = null

    @Throws(Exception::class)
    override fun run(vararg args: String) {
        require(!googleClientId.isNullOrEmpty()) { "Missing required environment variable GOOGLE_CLIENT_ID" }
        require(!googleClientSecret.isNullOrEmpty()) { "Missing required environment variable GOOGLE_CLIENT_SECRET" }
    }
}