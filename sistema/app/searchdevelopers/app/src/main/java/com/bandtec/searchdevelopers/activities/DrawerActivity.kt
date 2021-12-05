package com.bandtec.searchdevelopers.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.View
import android.widget.*
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.configuration.SecurityPreferences
import com.bandtec.searchdevelopers.databinding.ActivityDrawerBinding
import com.google.android.material.textfield.TextInputEditText
import kotlin.system.exitProcess

class DrawerActivity : AppCompatActivity() {

    lateinit var mSecurityPreferences: SecurityPreferences

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityDrawerBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mSecurityPreferences = SecurityPreferences(this)

        binding = ActivityDrawerBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.appBarDrawer.toolbar)

        val iconNotification: ImageView = binding.root.findViewById(R.id.icon_notification)
        iconNotification.setOnClickListener{
            iconNotification.setImageResource(R.drawable.ic_yesnotification)
        }

        val drawerLayout: DrawerLayout = binding.drawerLayout
        val navView: NavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_content_drawer)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_home,
                R.id.nav_gallery,
                R.id.nav_config,
                R.id.nav_category,
                R.id.nav_footer_favorites,
                R.id.nav_footer_painel,
                R.id.nav_footer_home
            ), drawerLayout
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)


    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_drawer)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    fun logout(view: android.view.View) {
        mSecurityPreferences.remove("idUser")
        val idUser = mSecurityPreferences.getInt("idUser")
        if(idUser == 0){
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }
    }
}