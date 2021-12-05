package com.bandtec.searchdevelopers.activities.pagamento

import android.os.Bundle
import android.view.View
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.adapter.CadastrarCartaoAdapter
import com.bandtec.searchdevelopers.backend.repository.CadastrarCartaoRepository

class CadastroCartaoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cartao_pagamento)
    }

    fun cadastrarCartaoTela (v: View){
        val etNumeroCartao: EditText = findViewById(R.id.et_numero_cartao)
        val etCvv: EditText = findViewById(R.id.et_cvv)
        val etMesValidade: EditText = findViewById(R.id.et_mes_validade)
        val etAnoValidade: EditText = findViewById(R.id.et_ano_validade)

        val numberCard: String = etNumeroCartao.text.toString()
        val cvv: String = etCvv.text.toString()
        val monthCard: String = etMesValidade.text.toString()
        val yearCard: String = etAnoValidade.text.toString()

        val cadastrarCartaoAdapter: CadastrarCartaoAdapter = CadastrarCartaoAdapter (
            numberCard,
            cvv,
            monthCard,
            yearCard
        )

        val cadastrarCartaoRepository: CadastrarCartaoRepository = CadastrarCartaoRepository(this)

        cadastrarCartaoRepository.cadastrarCartao(cadastrarCartaoAdapter)
    }
}