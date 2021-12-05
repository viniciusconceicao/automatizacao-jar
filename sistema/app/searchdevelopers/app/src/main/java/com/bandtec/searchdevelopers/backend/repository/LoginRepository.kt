package com.bandtec.searchdevelopers.backend.repository

import android.content.Context
import android.content.Intent
import android.widget.Toast
import com.bandtec.searchdevelopers.Avaliacao
import com.bandtec.searchdevelopers.CategoryActivity
import com.bandtec.searchdevelopers.activities.DrawerActivity
import com.bandtec.searchdevelopers.activities.PainelActivity
import com.bandtec.searchdevelopers.backend.adapter.LoginAdapter
import com.bandtec.searchdevelopers.backend.model.UsersDto
import com.bandtec.searchdevelopers.backend.service.UserService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginRepository (val context: Context){

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private var mSecurityPreferences: SecurityPreferences = SecurityPreferences(context)

    fun login (user: LoginAdapter){
        val call: Call<UsersDto> = mRetrofit.login(user)

        call.enqueue(object : Callback<UsersDto>{
            override fun onResponse(call: Call<UsersDto>, response: Response<UsersDto>) {
                if (response.code() == 200) {
                    Toast.makeText(context, "Login Efetuado.",Toast.LENGTH_SHORT).show()

                    val model: UsersDto? = response.body()
                    if (model != null) {
                        val idUser = model.idUser
                        mSecurityPreferences.store("idUser", idUser)

                        val nameUser = model.nameUser
                        mSecurityPreferences.store("nameUser", nameUser)

                        val cpf = if (model.cpf == null) "" else model.cpf
                        mSecurityPreferences.store("cpf", cpf)

                        val cnpj = if (model.cnpj == null) "" else model.cnpj
                        mSecurityPreferences.store("cnpj", cnpj)

                        val birthDate = model.birthDate
                        mSecurityPreferences.store("birthDate", birthDate)

                        val nameCompany = if (model.nameCompany == null) "" else model.nameCompany
                        mSecurityPreferences.store("nameCompany", nameCompany)

                        val email = model.email
                        mSecurityPreferences.store("email", model.email)

                        val password = model.password
                        mSecurityPreferences.store("password", model.password)

                        val role = model.role
                        mSecurityPreferences.store("role", role)

                        val descriptionUser = if (model.descriptionUser == null) "" else model.descriptionUser
                        mSecurityPreferences.store("descriptionUser", descriptionUser)

                        val starsUser = if (model.starsUser == null) 0.0 else model.starsUser
                        mSecurityPreferences.store("starsUser", starsUser)

                        val phone = if (model.phone == null) "" else model.phone
                        mSecurityPreferences.store("phone", phone)

                        val status = model.status
                        mSecurityPreferences.store("status", status)

                        val locality = if (model.locality == null) "" else model.locality
                        mSecurityPreferences.store("locality", locality)

                        //todo verificar resposta da photo
                        val photo = if (model.photo == null) "" else model.photo
                        mSecurityPreferences.store("photo", photo)

                        //todo verificar resposta do creationDate
                        val creationDate = model.creationDate
                        mSecurityPreferences.store("creationDate", creationDate)

                        val numberCard = if (model.numberCard == null) "" else model.numberCard
                        mSecurityPreferences.store("numberCard", numberCard)

                        val cvv = if (model.cvv == null) "" else model.cvv
                        mSecurityPreferences.store("cvv", cvv)

                        val monthCard = if (model.monthCard == null) "" else model.monthCard
                        mSecurityPreferences.store("monthCard", monthCard)

                        val yearCard = if (model.yearCard == null) "" else model.yearCard
                        mSecurityPreferences.store("yearCard", yearCard)

                        val isPremium = if (model.isPremium == null) false else model.isPremium
                        mSecurityPreferences.store("isPremium", isPremium)

                        val ratingNumber = model.ratingNumber
                        mSecurityPreferences.store("ratingNumber", ratingNumber)
                    }
                    //TODO: Alterar para tela de categorias

                    context.startActivity(Intent(context, DrawerActivity::class.java))

                    //TODO: PEGAR DO BACK E VERIFICAR SE HÁ CATEGORIA CADASTRADA
//                    if(seCategoriaCadastrada){
//                        context.startActivity(Intent(context, DrawerActivity::class.java))
//                    } else {
//                        context.startActivity(Intent(context, CategoryActivity::class.java))
//                    }

                }
                else {
                    Toast.makeText(context, "Email ou Senha Invalidos.", Toast.LENGTH_SHORT).show()
                }

            }

            override fun onFailure(call: Call<UsersDto>, t: Throwable) {
                Toast.makeText(context, "Um erro inesperado. Tente novamente mais tarde.", Toast.LENGTH_SHORT).show()
            }
        })
    }

}