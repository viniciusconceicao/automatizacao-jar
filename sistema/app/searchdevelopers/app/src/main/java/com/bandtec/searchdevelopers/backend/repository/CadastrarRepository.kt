package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.content.Intent
import android.widget.Toast
import com.bandtec.searchdevelopers.activities.pagamento.CadastroCartaoActivity
import com.bandtec.searchdevelopers.backend.adapter.CadastrarAdapter
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.backend.service.UserService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CadastrarRepository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)

    fun cadastrar (user: CadastrarAdapter){
        val call: Call<Void> = mRetrofit.postUser(user)

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.code() == 201) {
                    Toast.makeText(context, "Usuário criado.", Toast.LENGTH_SHORT).show()
                }
                else {
                    Toast.makeText(context,"Algum dado inválido", Toast.LENGTH_SHORT).show()
                    context.startActivity(Intent(context, CadastroCartaoActivity::class.java))
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(context, "Servidor fora do ar.", Toast.LENGTH_SHORT).show()
            }
        })
    }
}