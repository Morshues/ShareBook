package com.morshues.sharebook.dto.converter

import com.morshues.sharebook.dto.ShowBookDTO
import com.morshues.sharebook.model.Book

interface BookConverter {
    fun toShowDTO(book: Book): ShowBookDTO
}