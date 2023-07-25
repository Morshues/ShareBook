package com.morshues.sharebook.config

import com.morshues.sharebook.model.GoogleOidcUser
import com.morshues.sharebook.service.CustomOidcUserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer.withDefaults
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val customOidcUserService: CustomOidcUserService
) {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .authorizeHttpRequests { auth -> auth
                .requestMatchers("/", "/login", "/oauth/**").permitAll()
                .anyRequest().authenticated()
            }
            .oauth2Login { auth -> auth
                .userInfoEndpoint {
                    it.oidcUserService(customOidcUserService)
                }
                .successHandler { _, response, authentication ->
                    val oauthUser = authentication.principal as GoogleOidcUser
                    customOidcUserService.processGooglePostLogin(oauthUser)
                    response.sendRedirect("/user");
                }
            }
            .formLogin(withDefaults())

        return http.build()
    }
}

