package com.bandtec.searchdevelopers.backend.service

import com.bandtec.searchdevelopers.backend.model.NotificationDto
import com.bandtec.searchdevelopers.configuration.Constants
import retrofit2.Call
import retrofit2.http.*

interface NotificationService {

    @Headers(Constants.HEADERS.JSON)
    @POST("api/notification/sender/{idSender}/receiver/{idReceiver}")
    fun like (@Path("idSender") idSender: Int,
              @Path("idReceiver") idReceiver: Int): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @DELETE("api/{id}")
    fun dislike (@Path("id") id: Int): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @GET("/api/notification/order/{id}")
    fun getFavorites (@Path("id") id: Int): Call<NotificationDto>
}