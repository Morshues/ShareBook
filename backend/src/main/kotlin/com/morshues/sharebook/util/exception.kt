package com.morshues.sharebook.util

import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.BAD_REQUEST)
class BadRequestException(message: String?) : RuntimeException(message) {
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ResourceNotFoundException(resourceName: String?, fieldName: String?, fieldValue: Any?) :
    RuntimeException(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue))

class OAuth2AuthenticationProcessingException(msg: String?) : AuthenticationException(msg)

