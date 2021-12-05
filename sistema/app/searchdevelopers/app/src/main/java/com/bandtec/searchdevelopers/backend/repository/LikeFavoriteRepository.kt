package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.widget.Toast
import com.bandtec.searchdevelopers.backend.service.FavoriteService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LikeFavoriteRepository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(FavoriteService::class.java, Constants.URL.API_GODEV)
    private var mSecurityPreferences: SecurityPreferences = SecurityPreferences(context)

    private lateinit var idDev: String
    private lateinit var idClt: String

    fun createFavorite (){
        val getIdUser = mSecurityPreferences.getInt("idUser")
        //TODO: Precisa pegar o id da lista de usuários e passar aqui
        val getIdUserList: Int? = null
        val getRole = mSecurityPreferences.getString("role")

        if(getRole.equals("dev")){
            idDev = getIdUser.toString()
            idClt = getIdUserList.toString()
        } else {
            idDev = getIdUserList.toString()
            idClt = getIdUser.toString()
        }

        val call: Call<Void> = mRetrofit.like(idClt.toInt(), idDev.toInt())

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.code() == 201) {
                    Toast.makeText(context, "Usuário favoritado.", Toast.LENGTH_SHORT).show()
                }
                else {
                    Toast.makeText(context,"Usuário não favoritado. Tente novamente", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(context, "Erro inesperado. Tente novamente mais tarde.", Toast.LENGTH_SHORT).show()
            }
        })
    }
}