package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.content.Intent
import android.view.View
import android.widget.Toast
import androidx.navigation.findNavController
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.activities.pagamento.CadastroCartaoActivity
import com.bandtec.searchdevelopers.activities.ui.category.CategoryFragment
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.backend.model.IuguPagamentoResponseDto
import com.bandtec.searchdevelopers.backend.service.IuguService
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class PagamentoRepository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(IuguService::class.java, Constants.URL.API_GODEV)
    private lateinit var mSecurityPreferences: SecurityPreferences
    var statusCode: Int = 0


    fun pagar (idUser: Int) {
        val call: Call<IuguPagamentoResponseDto> = mRetrofit.gerarPagamento(idUser)
        mSecurityPreferences = SecurityPreferences(context)

        call.enqueue(object : Callback<IuguPagamentoResponseDto> {
            override fun onResponse(
                call: Call<IuguPagamentoResponseDto>,
                response: Response<IuguPagamentoResponseDto>
            ) {
                if (response.code() == 200) {
                    statusCode = 200
//                    Toast.makeText(context, "Pagamento Efetuado.", Toast.LENGTH_SHORT).show()
                    val numCard: String = mSecurityPreferences.getString("numberCard")

                    if (numCard == null) {
                        Toast.makeText(context, "Tem que cadastrar o cartão.", Toast.LENGTH_SHORT).show()

                    } else {
                        Toast.makeText(context, "Validar o cartão.", Toast.LENGTH_SHORT).show()

                    }
//                    context.startActivity(Intent(context, CategoryFragment::class.java))
                }
                else {
                    statusCode = 400
                    Toast.makeText(context, "Erro que depois eu arrumo.", Toast.LENGTH_SHORT).show()
                }
            }
            override fun onFailure(call: Call<IuguPagamentoResponseDto>, t: Throwable) {
                Toast.makeText(context, "Servidor fora do ar", Toast.LENGTH_SHORT).show()
            }

        })
    }
    // [size=187 text=[400 Bad Request] during [POST] to [https://api.iugu.com/v1/paym…]
}

