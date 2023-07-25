package com.morshues.sharebook

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
class ShareBookApplication

fun main(args: Array<String>) {
	runApplication<ShareBookApplication>(*args)
}
