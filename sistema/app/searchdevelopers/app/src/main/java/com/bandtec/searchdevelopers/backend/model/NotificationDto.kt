package com.bandtec.searchdevelopers.backend.model

import java.time.LocalDateTime


data class NotificationDto (

     val idNotification: Int?,
     val typeNotification: String?,
     val title: String? = null,
     val statusNotification: Boolean,
     val dateCreated: LocalDateTime?,
     val usersSender: UsersDto?,
     val usersReceiver: UsersDto?,

)