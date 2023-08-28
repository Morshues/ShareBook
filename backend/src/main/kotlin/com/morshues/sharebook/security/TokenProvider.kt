package com.morshues.sharebook.security

import com.morshues.sharebook.config.AppProperties
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import java.security.Key
import java.security.SignatureException
import java.util.*


@Service
class TokenProvider(
    private val appProperties: AppProperties
) {

    private val tokenSecretAsKey: Key = Keys.hmacShaKeyFor(appProperties.auth.tokenSecret.toByteArray())

    fun createToken(authentication: Authentication): String {
        val userPrincipal = authentication.principal as UserPrincipal
        val now = Date()
        val expiryDate = Date(now.time + appProperties.auth.tokenExpirationMsec)
        return Jwts.builder()
            .setSubject(userPrincipal.id.toString())
            .setIssuedAt(Date())
            .setExpiration(expiryDate)
            .signWith(tokenSecretAsKey, SignatureAlgorithm.HS512)
            .compact()
    }

    fun getUserIdFromToken(token: String?): Long {
        val claims: Claims = Jwts.parserBuilder()
            .setSigningKey(tokenSecretAsKey)
            .build()
            .parseClaimsJws(token)
            .body
        return claims.subject.toLong()
    }

    fun validateToken(authToken: String?): Boolean {
        try {
            Jwts.parserBuilder().setSigningKey(tokenSecretAsKey).build().parseClaimsJws(authToken)
            return true
        } catch (ex: SignatureException) {
            ex.printStackTrace()
        } catch (ex: MalformedJwtException) {
            ex.printStackTrace()
        } catch (ex: ExpiredJwtException) {
            ex.printStackTrace()
        } catch (ex: UnsupportedJwtException) {
            ex.printStackTrace()
        } catch (ex: IllegalArgumentException) {
            ex.printStackTrace()
        }
        return false
    }
}