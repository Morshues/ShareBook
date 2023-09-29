package com.morshues.shareacctbook.util

import com.morshues.shareacctbook.dto.ApiResponse
import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(message: String?) : RuntimeException(message) {
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ResourceNotFoundException(resourceName: String?, fieldName: String?, fieldValue: Any?) :
    RuntimeException(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue))

class OAuth2AuthenticationProcessingException(msg: String?) : AuthenticationException(msg)

@RestControllerAdvice
class CustomExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleMissingRequestBody(ex: HttpMessageNotReadableException): ResponseEntity<ApiResponse<*>> {
        val response = ApiResponse<Any>(
            status = "error",
            data = null,
            message = "Required request body is missing",
            errors = null
        )
        return ResponseEntity.badRequest().body(response)
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleMissingRequestBody(ex: ConstraintViolationException): ResponseEntity<ApiResponse<*>> {
        val response = ApiResponse<Any>(
            status = "error",
            data = null,
            message = "Request body is invalid",
            errors = ex.constraintViolations.map { it.message }
        )
        return ResponseEntity.badRequest().body(response)
    }

}