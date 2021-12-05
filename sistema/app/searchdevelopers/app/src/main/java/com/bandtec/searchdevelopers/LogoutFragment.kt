package com.bandtec.searchdevelopers

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import com.bandtec.searchdevelopers.activities.DrawerActivity
import com.bandtec.searchdevelopers.activities.MainActivity
import com.bandtec.searchdevelopers.activities.login.CadastroActivity
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import kotlin.system.exitProcess

class LogoutFragment : Fragment() {
    lateinit var mSecurityPreferences: SecurityPreferences

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        mSecurityPreferences = SecurityPreferences(this.requireContext())

        return inflater.inflate(R.layout.fragment_logout, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }
}