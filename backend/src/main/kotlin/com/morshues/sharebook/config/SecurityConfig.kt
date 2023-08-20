package com.morshues.sharebook.config

import com.morshues.sharebook.model.GoogleOAuth2User
import com.morshues.sharebook.service.CustomUserService
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val customUserService: CustomUserService
) {

    @Value("\${app.client.url}")
    private val clientUrl: String = ""

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests { auth -> auth
                .requestMatchers("/", "/login", "/oauth/**").permitAll()
                .anyRequest().authenticated()
            }
            .oauth2Login { auth -> auth
                .userInfoEndpoint {
                    it.userService(customUserService)
                }
                .successHandler { _, response, authentication ->
                    val oauthUser = authentication.principal as GoogleOAuth2User
                    customUserService.processGooglePostLogin(oauthUser)
                    response.sendRedirect("$clientUrl/user");
                }
            }
            .formLogin(withDefaults())

        return http.build()
    }
}

