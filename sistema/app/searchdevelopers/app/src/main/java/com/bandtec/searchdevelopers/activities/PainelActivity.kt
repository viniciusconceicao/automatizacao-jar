package com.bandtec.searchdevelopers.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
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
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PainelActivity : AppCompatActivity() {

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private val listaUsers: MutableList<UsersDto> = mutableListOf()
    private val adapterUserCard = UserCardAdapter(this, listaUsers)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_painel)

        val recyclerView_itens = findViewById<RecyclerView>(R.id.lista)
        recyclerView_itens.layoutManager = LinearLayoutManager(this)
        recyclerView_itens.setHasFixedSize(true)
        recyclerView_itens.adapter = adapterUserCard

        getUsers()

    }

    fun getId(): Int {
        val mSecurityPreferences = SecurityPreferences(this)
        return  mSecurityPreferences.getInt("idUser")
    }

    fun getUsers() {
        val call: Call<List<UsersDto>> = mRetrofit.getTypeUser(getId())

        call.enqueue(object : Callback<List<UsersDto>> {
            override fun onResponse(call: Call<List<UsersDto>>, response: Response<List<UsersDto>>) {
                if (response.code() == 200) {
                    listaUsers.addAll(response.body() ?: listOf())
                    adapterUserCard.notifyDataSetChanged()
                }
                else {
                    Toast.makeText(baseContext,"Algum dado inválido", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<UsersDto>>, t: Throwable) {
                Toast.makeText(baseContext, "Servidor fora do ar.", Toast.LENGTH_SHORT).show()
            }
        })
    }
}