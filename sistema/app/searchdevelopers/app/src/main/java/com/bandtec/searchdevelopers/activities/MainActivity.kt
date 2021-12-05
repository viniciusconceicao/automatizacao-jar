package com.bandtec.searchdevelopers.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.activities.login.CadastroActivity
import com.bandtec.searchdevelopers.activities.login.LoginActivity
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import kotlin.system.exitProcess


class MainActivity : AppCompatActivity() {

    lateinit var mSecurityPreferences: SecurityPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)

        mSecurityPreferences = SecurityPreferences(this)
        val idUser = mSecurityPreferences.getInt("idUser")
        if(idUser != 0){
            startActivity(Intent(this, DrawerActivity::class.java))

    //TODO: PEGAR DO BACK E VERIFICAR SE HÁ CATEGORIA CADASTRADA
//            if(seCategoriaCadastrada){
//                startActivity(Intent(this, DrawerActivity::class.java))
//            } else {
//                startActivity(Intent(this, CategoryActivity::class.java))
//            }
        }

    }

    fun goToRegister(botao: View) {
        //cria uma variavel para guardar o tipo de cadastro(dev ou client) e envia pelo puExtra
        var register = ""
        when (botao.id) {
            R.id.bt_cliente -> register = "clt"
            R.id.bt_profissional -> register = "dev"
        }
        val cadastro = (Intent(this, CadastroActivity::class.java))
        cadastro.putExtra("typeRegister", register)
        startActivity(cadastro)
    }

    fun tenhoCadastro (v: View) {
        startActivity(Intent(this, LoginActivity::class.java))
    }

}