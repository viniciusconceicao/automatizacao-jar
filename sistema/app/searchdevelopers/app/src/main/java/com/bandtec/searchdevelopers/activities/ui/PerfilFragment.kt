package com.bandtec.searchdevelopers.activities.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.configuration.Constants
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.squareup.picasso.Picasso


class perfil : Fragment() {


    private lateinit var mSecurityPreferences: SecurityPreferences

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        mSecurityPreferences = SecurityPreferences(this.requireContext())

        val nomeUser: TextView = view.findViewById(R.id.name_perfil)
        val rateUser: TextView = view.findViewById(R.id.rate_user)
        val numberRate: TextView = view.findViewById(R.id.number_rate)
        val phone: TextView = view.findViewById(R.id.telefone_perfil)
        val email: TextView = view.findViewById(R.id.email_perfil)
        val desc: TextView = view.findViewById(R.id.desc_painel)
        val image: ImageView = view.findViewById(R.id.img_perfil)

        nomeUser.text = mSecurityPreferences.getString("nameUser")
        rateUser.text = mSecurityPreferences.getFloat("starsUser").toString()
        numberRate.text = mSecurityPreferences.getInt("ratingNumber").toString() + " Avaliações"
        phone.text = mSecurityPreferences.getString("phone")
        email.text = mSecurityPreferences.getString("email")
        desc.text = mSecurityPreferences.getString("descriptionUser")
        val nomeImage = mSecurityPreferences.getString("photo")

        val url  = Constants.URL.API_GODEV + "/public/imagem/" + nomeImage

        println(url)

        Picasso.get().load(url).error(R.mipmap.usuario).into(image)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_painel, container, false)
    }
}