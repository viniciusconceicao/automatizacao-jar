package com.bandtec.searchdevelopers.backend.service

import com.bandtec.searchdevelopers.backend.adapter.CadastrarAdapter
import com.bandtec.searchdevelopers.backend.adapter.CadastrarCartaoAdapter
import com.bandtec.searchdevelopers.backend.adapter.LoginAdapter
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.backend.model.UsersDto
import retrofit2.Call
import retrofit2.http.*

interface UserService {

    @Headers(Constants.HEADERS.JSON)
    @POST("api/users/authenticate")
    fun login (@Body login: LoginAdapter): Call<UsersDto>

    @Headers(Constants.HEADERS.JSON)
    @POST("api/users/")
    fun postUser (@Body user: CadastrarAdapter): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @PUT("/api/users/{id}")
    fun changeConfigurationUser (@Path("id") id: Int,
                                 @Body userConfig: UsersDto): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @GET("api/users/")
    fun getAllUser (@Body user: UsersDto): Call<List<UsersDto>>

    @Headers(Constants.HEADERS.JSON)
    @GET("api/users/{id}")
    fun getIdUser (@Path("id") id: Int): Call<UsersDto>

    @Headers(Constants.HEADERS.JSON)
    @PUT("/api/users/card/{id}")
    fun postCartao (@Path("id") idUser: Int,
                    @Body cartao: CadastrarCartaoAdapter): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @POST("api/users/avaliar/{id}/{numStars}")
    fun postRateUser (@Path("id") idUser: Int,
                  @Path("numStars") numStars: Double): Call<Void>

    @Headers(Constants.HEADERS.JSON)
    @GET("api/users/type/{id}")
    fun getTypeUser (@Path("id") id: Int): Call<List<UsersDto>>
}