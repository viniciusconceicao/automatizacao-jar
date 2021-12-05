package com.bandtec.searchdevelopers.activities.pagamento

import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.adapter.UserCardAdapter
import com.bandtec.searchdevelopers.backend.model.IuguPagamentoResponseDto
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.bandtec.searchdevelopers.backend.repository.PagamentoRepository
import com.bandtec.searchdevelopers.backend.service.IuguService
import com.bandtec.searchdevelopers.backend.service.UserService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.squareup.picasso.Picasso
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PagamentoActivity : AppCompatActivity() {

    private lateinit var mSecurityPreferences: SecurityPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pagamento)
        mSecurityPreferences = SecurityPreferences(this)
    }

    fun fazerPagamento(view: View) {
        val id = getId()
        val pagamentoRepository: PagamentoRepository = PagamentoRepository(this)
        pagamentoRepository.pagar(id)
    }

    fun getId(): Int {
        val mSecurityPreferences = SecurityPreferences(this)
        return  mSecurityPreferences.getInt("idUser")
    }

}