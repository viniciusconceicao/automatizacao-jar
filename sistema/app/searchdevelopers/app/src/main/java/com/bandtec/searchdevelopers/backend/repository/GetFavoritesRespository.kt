package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.widget.Toast
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.backend.service.FavoriteService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GetFavoritesRespository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(FavoriteService::class.java, Constants.URL.API_GODEV)
    private var mSecurityPreferences: SecurityPreferences = SecurityPreferences(context)

    fun getFavorites () {
        val getIdUser = mSecurityPreferences.getInt("idUser")

        // TODO: Verificar retorno. UsersDTO conferir se não pode ser uma lista
        val call: Call<UsersDto> = mRetrofit.getFavorites(getIdUser)

        call.enqueue(object : Callback<UsersDto> {
            override fun onResponse(call: Call<UsersDto>, response: Response<UsersDto>) {
                if (response.code() == 201) {
                    Toast.makeText(context, "Lista de favoritos", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(context, "Erro na consulta de favoritos. Tente novamente", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<UsersDto>, t: Throwable) {
                Toast.makeText(
                    context,
                    "Erro inesperado. Tente novamente mais tarde.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
    }
}