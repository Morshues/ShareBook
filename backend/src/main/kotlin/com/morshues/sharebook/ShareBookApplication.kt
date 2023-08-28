package com.morshues.sharebook

import com.morshues.sharebook.config.AppProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class])
@EnableConfigurationProperties(AppProperties::class)
class ShareBookApplication

fun main(args: Array<String>) {
	runApplication<ShareBookApplication>(*args)
}
