package com.bandtec.searchdevelopers.activities.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.navigation.findNavController
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.repository.PagamentoRepository
import com.bandtec.searchdevelopers.configuration.SecurityPreferences

class beneficios_premium : Fragment() {

    private lateinit var mSecurityPreferences: SecurityPreferences

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        mSecurityPreferences = SecurityPreferences(view.context)

        val btnPagamento : Button = view.findViewById(R.id.btn_pagamento)

        btnPagamento.setOnClickListener{
            val id = mSecurityPreferences.getInt("idUser")
            val pagamentoRepository: PagamentoRepository = PagamentoRepository(view.context)



            pagamentoRepository.pagar(id)

            if (pagamentoRepository.statusCode == 200) {
                view.findNavController().navigate(R.id.nav_pagamento_sucesso)
            }
        }

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_beneficios_premium, container, false)
    }

}