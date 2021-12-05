package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.content.Intent
import android.widget.Toast
import com.bandtec.searchdevelopers.activities.pagamento.PagamentoActivity
import com.bandtec.searchdevelopers.backend.adapter.CadastrarCartaoAdapter
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.bandtec.searchdevelopers.backend.service.UserService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CadastrarCartaoRepository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private var mSecurityPreferences: SecurityPreferences = SecurityPreferences(context)

    fun cadastrarCartao (cartao: CadastrarCartaoAdapter){
        val getIdUser = mSecurityPreferences.getInt("idUser")
        val call: Call<Void> = mRetrofit.postCartao(getIdUser, cartao)

        call.enqueue(object : Callback<Void> {
            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.code() == 201) {
                    Toast.makeText(context, "Cartão criado.", Toast.LENGTH_SHORT).show()
                    context.startActivity(Intent(context, PagamentoActivity::class.java))
                }
                else {
                    Toast.makeText(context,"Algum dado inválido", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(context, "Servidor fora do ar.", Toast.LENGTH_SHORT).show()
            }
        })
    }
}