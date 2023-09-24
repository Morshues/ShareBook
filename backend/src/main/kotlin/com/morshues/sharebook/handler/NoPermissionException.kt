package com.morshues.sharebook.handler

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.FORBIDDEN)
class NoPermissionException(message: String) : RuntimeException(message)
