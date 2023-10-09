package com.morshues.shareacctbook.dto.converter

import com.morshues.shareacctbook.dto.AccountBookSharerDTO
import com.morshues.shareacctbook.dto.ShowAccountBookItemDTO
import com.morshues.shareacctbook.model.AccountBookItem
import com.morshues.shareacctbook.model.AccountBookSharer
import org.springframework.stereotype.Component

@Component
class AccountBookSharerConverterImpl : AccountBookSharerConverter {
    override fun toShowDTO(sharer: AccountBookSharer): AccountBookSharerDTO {
        return AccountBookSharerDTO(
            id = sharer.id!!,
            accountBookId = sharer.accountBook.id!!,
            displayName = sharer.displayName,
            userId = sharer.user?.id,
            userName = sharer.user?.username,
            userEmail = sharer.user?.email,
            userImg = sharer.user?.profilePictureUrl,
            role = sharer.role.name,
            createdAt = sharer.createdAt.toInstant().toEpochMilli(),
        )
    }
}