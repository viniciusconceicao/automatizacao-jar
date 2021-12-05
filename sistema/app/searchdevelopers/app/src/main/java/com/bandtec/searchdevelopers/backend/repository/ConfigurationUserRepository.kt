package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.widget.Toast
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.backend.service.UserService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ConfigurationUserRepository (val context: Context) {

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private var mSecurityPreferences: SecurityPreferences = SecurityPreferences(context)

    fun editUserConfiguration (configuration: UsersDto){
        val getIdUser = mSecurityPreferences.getInt("idUser")
        val call: Call<Void> = mRetrofit.changeConfigurationUser(getIdUser, configuration)

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.code() == 201) {
                    Toast.makeText(context, "Alterado com sucesso.", Toast.LENGTH_SHORT).show()

                    // remover cache
                    // adicionar cache
                }
                else {
                    Toast.makeText(context,"Algum dado inválido", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(context, "Erro inesperado! Tente novamente mais tarde.", Toast.LENGTH_SHORT).show()
            }
        })
    }
}