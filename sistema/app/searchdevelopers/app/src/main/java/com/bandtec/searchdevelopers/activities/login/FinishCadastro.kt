package com.bandtec.searchdevelopers.activities.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.bandtec.searchdevelopers.R

class FinishCadastro : AppCompatActivity() {

    val cadastroConcluido: Boolean = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_finish_cadastro)
        if(cadastroConcluido) {

        } else {
            val ivBackground: ImageView = findViewById(R.id.iv_background)
            val btBotao: Button = findViewById(R.id.bt_botao)
            val tvTexto: TextView = findViewById(R.id.tv_texto)

            ivBackground.setImageResource(R.drawable.fail)
            btBotao.setText("@string/finish_btn_fail")

            tvTexto.setText("@string/finish_text_fail")
        }
    }

    fun verificarCadastro(v: View) {
        val btBotao: Button = findViewById(R.id.bt_botao)
        if(cadastroConcluido) {
            startActivity(Intent(this, LoginActivity::class.java))
        } else {
            startActivity(Intent(this, CadastroActivity::class.java))
        }
    }
}