package com.morshues.shareacctbook.util

import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime

object TimeUtils {

    fun timestampToZonedDateTime(timestamp: Long): ZonedDateTime {
        val instant = Instant.ofEpochMilli(timestamp)
        return ZonedDateTime.ofInstant(instant, ZoneId.systemDefault())
    }

}