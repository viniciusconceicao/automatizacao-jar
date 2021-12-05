package com.bandtec.searchdevelopers

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.RatingBar
import android.widget.TextView
import android.widget.Toast
import com.bandtec.searchdevelopers.backend.service.UserService
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.RetrofitGeneric
import retrofit2.Call
import java.lang.String

class Avaliacao : AppCompatActivity() {

    private val mRetrofit = RetrofitGeneric.createService(UserService::class.java, Constants.URL.API_GODEV)
    private var numStars : Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_avaliacao)
        addListenerOnRatingBar()
        addListenerOnButton()
    }

    fun addListenerOnRatingBar() {
        val ratingBar: RatingBar = findViewById<View>(R.id.ratingBar) as RatingBar

        ratingBar.setOnRatingBarChangeListener(RatingBar.OnRatingBarChangeListener { ratingBar, avaliacao, fromUser ->
            numStars = avaliacao.toDouble()
        })
    }

    fun addListenerOnButton() {

        val call: Call<Void> = mRetrofit.postRateUser(1, numStars)

        val ratingBar: RatingBar = findViewById<View>(R.id.ratingBar) as RatingBar
        val btnSubmit: Button = findViewById<View>(R.id.btnSubmit) as Button

        //se o botão for clicado, exiba o valor de avaliação corrente.
        btnSubmit.setOnClickListener(View.OnClickListener {
            Toast.makeText(
                this,
                String.valueOf(ratingBar.getRating()),
                Toast.LENGTH_SHORT
            ).show()
        })
    }
}