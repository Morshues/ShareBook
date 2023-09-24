package com.morshues.sharebook.dto.converter

import com.morshues.sharebook.dto.ShowBookDTO
import com.morshues.sharebook.model.Book
import org.springframework.stereotype.Component

@Component
class BookConverterImpl : BookConverter {
    override fun toShowDTO(book: Book): ShowBookDTO {
        return ShowBookDTO(
            id = book.id!!,
            name = book.name,
            description = book.description,
            createdAt = book.createdAt.toInstant().toEpochMilli(),
        )
    }
}