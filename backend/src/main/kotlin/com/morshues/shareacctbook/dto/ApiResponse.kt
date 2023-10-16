package com.morshues.shareacctbook.dto

enum class Status {
    SUCCESS, ERROR
}

data class ApiResponse<T>(
    val status: Status,
    val data: T? = null,
    val message: String? = null,
    val errors: List<String>? = null,
) {
    companion object {
        fun success(): ApiResponse<Nothing> = ApiResponse(
            status = Status.SUCCESS,
        )

        fun <T> success(data: T): ApiResponse<T> = ApiResponse(
            status = Status.SUCCESS,
            data = data,
        )

        fun error(message: String, errors: List<String> = listOf()) = ApiResponse(
            status = Status.ERROR,
            data = null,
            message = message,
            errors = errors,
        )

        fun unauthorized() = ApiResponse(
            status = Status.ERROR,
            data = null,
            message = "unauthorized",
            errors = null,
        )
    }
}
