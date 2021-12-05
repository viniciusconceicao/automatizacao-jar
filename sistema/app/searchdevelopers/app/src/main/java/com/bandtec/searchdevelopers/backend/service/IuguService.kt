package com.bandtec.searchdevelopers.backend.service

import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.backend.model.IuguPagamentoResponseDto
import retrofit2.Call
import retrofit2.http.Headers
import retrofit2.http.POST
import retrofit2.http.Path

interface IuguService {

    @Headers(Constants.HEADERS.JSON)
    @POST("/api/v1/pagamentos/gerar-pagamento/{idUser}")
    fun gerarPagamento (@Path("idUser") idUser: Int): Call<IuguPagamentoResponseDto>
}