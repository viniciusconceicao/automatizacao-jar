package com.bandtec.searchdevelopers.activities.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RelativeLayout
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.adapter.UserCardAdapter
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.backend.service.UserService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.google.android.material.card.MaterialCardView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class PainelFragment : Fragment() {

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private val listaUsers: MutableList<UsersDto> = mutableListOf()
    lateinit var adapterUserCard: UserCardAdapter



    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapterUserCard = UserCardAdapter(this.requireContext(), listaUsers)

        var recyclerView_itens = view.findViewById<RecyclerView>(R.id.lista_recycle)
        recyclerView_itens.layoutManager = LinearLayoutManager(activity)
        recyclerView_itens.setHasFixedSize(true)
        recyclerView_itens.adapter = adapterUserCard


        val mSecurityPreferences = SecurityPreferences(this.requireContext())
        val call: Call<List<UsersDto>> = mRetrofit.getTypeUser(mSecurityPreferences.getInt("idUser"))

//        val cardUser = view.findViewById<TextView>(R.id.title_card)
//        val idUser = view.findViewById<TextView>(R.id.id_user)
//
//        cardUser.setOnClickListener{
//            idUser.text.toString()
//        }

        call.enqueue(object : Callback<List<UsersDto>> {
            override fun onResponse(call: Call<List<UsersDto>>, response: Response<List<UsersDto>>) {
                if (response.code() == 200) {
                    listaUsers.addAll(response.body() ?: listOf())
                    adapterUserCard.notifyDataSetChanged()

                }
            }

            override fun onFailure(call: Call<List<UsersDto>>, t: Throwable) {
            }
        })

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_painel, container, false)
    }
}