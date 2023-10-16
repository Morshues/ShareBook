package com.morshues.shareacctbook.config

import com.morshues.shareacctbook.security.CustomUserDetailsService
import com.morshues.shareacctbook.security.TokenAuthenticationFilter
import com.morshues.shareacctbook.security.TokenProvider
import com.morshues.shareacctbook.security.oauth2.CustomOAuth2UserService
import com.morshues.shareacctbook.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository
import com.morshues.shareacctbook.security.oauth2.OAuth2AuthenticationFailureHandler
import com.morshues.shareacctbook.security.oauth2.OAuth2AuthenticationSuccessHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val customOAuth2UserService: CustomOAuth2UserService,
    private val customUserDetailsService: CustomUserDetailsService,
    private val oAuth2AuthenticationSuccessHandler: OAuth2AuthenticationSuccessHandler,
    private val oAuth2AuthenticationFailureHandler: OAuth2AuthenticationFailureHandler,
    private val tokenProvider: TokenProvider,
    private val cookieAuthorizationRequestRepository: HttpCookieOAuth2AuthorizationRequestRepository,
    private val customAuthenticationEntryPoint: CustomAuthenticationEntryPoint,
) {

    @Bean
    fun tokenAuthenticationFilter(): TokenAuthenticationFilter? {
        return TokenAuthenticationFilter(tokenProvider, customUserDetailsService)
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors(Customizer.withDefaults())
            .sessionManagement { it
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .csrf { csrf -> csrf.disable() }
            .formLogin { formLogin -> formLogin.disable() }
            .httpBasic { httpBasic -> httpBasic.disable() }
            .authorizeHttpRequests { auth -> auth
                .requestMatchers("/oauth/**")
                    .permitAll()
                .anyRequest()
                    .authenticated()
            }
            .oauth2Login { auth -> auth
                .authorizationEndpoint { it
                    .baseUri("/oauth2/authorize")
                    .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                }
                .userInfoEndpoint {
                    it.userService(customOAuth2UserService)
                }
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler)
            }
            .exceptionHandling { it
                .authenticationEntryPoint(customAuthenticationEntryPoint)
            }

        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }
}

