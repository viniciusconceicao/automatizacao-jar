package com.bandtec.searchdevelopers.activities.login

import android.os.Bundle
import android.view.View
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.adapter.LoginAdapter
import com.bandtec.searchdevelopers.backend.repository.LoginRepository
import com.bandtec.searchdevelopers.configuration.SecurityPreferences


class LoginActivity : AppCompatActivity() {

    private lateinit var mSecurityPreferences: SecurityPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        mSecurityPreferences = SecurityPreferences(this)
    }

    fun loginTela(view: View) {
        val etImputEmail: EditText = findViewById(R.id.inputEmail)
        val etImputPassword: EditText = findViewById(R.id.inputSenha)

        val email: String = etImputEmail.text.toString()
        val password: String = etImputPassword.text.toString()

        val loginAdapter: LoginAdapter = LoginAdapter(
            email,
            password
        )

        val loginRepository: LoginRepository = LoginRepository(this)

        loginRepository.login(loginAdapter)

    }


}