package com.morshues.shareacctbook.dto

data class ApiResponse<T>(
    val status: String,
    val data: T? = null,
    val message: String? = null,
    val errors: List<String>? = null,
)
