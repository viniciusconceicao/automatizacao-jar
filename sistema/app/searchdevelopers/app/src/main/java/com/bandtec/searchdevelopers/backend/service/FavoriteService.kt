package com.bandtec.searchdevelopers.backend.service

import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.configuration.Constants
import retrofit2.Call
import retrofit2.http.*

interface FavoriteService {

    @Headers(Constants.HEADERS.JSON)
    @POST("api/favorites/client/{idClt}/dev/{idDev}")
    fun like (@Path("idClt") idClt: Int,
              @Path("idDev") idDev: Int): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @PUT("api/favorites/dislike/client/{idClt}/dev/{idDev}")
    fun dislike (@Path("idClt") idClt: Int,
                 @Path("idDev") idDev: Int): Call<Void>

    //TODO: Ver se está certo o retorno
    @Headers(Constants.HEADERS.JSON)
    @GET("/api/favorites/type/{id}")
    fun getFavorites (@Path("id") id: Int): Call<UsersDto>
}