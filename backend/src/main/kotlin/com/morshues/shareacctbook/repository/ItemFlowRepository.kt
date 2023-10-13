package com.morshues.shareacctbook.repository

import com.morshues.shareacctbook.model.ItemFlow
import org.springframework.data.jpa.repository.JpaRepository

interface ItemFlowRepository : JpaRepository<ItemFlow, Long> {

    fun findByItemIdAndSharerId(itemId: Long, sharerId: Long): ItemFlow?

}