package com.morshues.shareacctbook.handler

import com.morshues.shareacctbook.dto.ApiResponse
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class InvalidArgumentException(message: String) : RuntimeException(message)

@ControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(InvalidArgumentException::class)
    fun handleIllegalArgumentException(ex: InvalidArgumentException): ResponseEntity<ApiResponse<*>> {
        val response = ApiResponse<Any>(
            status = "error",
            data = ex.message,
            message = "Required request body is invalid",
            errors = null
        )
        return ResponseEntity.badRequest().body(response)
    }
}