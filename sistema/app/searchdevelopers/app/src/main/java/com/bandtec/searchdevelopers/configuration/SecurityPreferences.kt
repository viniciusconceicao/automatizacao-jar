package com.bandtec.searchdevelopers.configuration

import android.content.Context
import com.bandtec.searchdevelopers.activities.ui.configuration.ConfigurationFragment

class SecurityPreferences(val context: Context){

    private val mSharedPreferences = context.getSharedPreferences("app", Context.MODE_PRIVATE)

    fun store (key: String, value: String) {
        mSharedPreferences.edit().putString(key, value).apply()
    }

    fun store (key: String, value: Int) {
        mSharedPreferences.edit().putInt(key, value).apply()
    }

    fun store (key: String, value: Double) {
        val value = value.toFloat()
        mSharedPreferences.edit().putFloat(key, value).apply()
    }

    fun store (key: String, value: Float) {
        mSharedPreferences.edit().putFloat(key, value).apply()
    }

    fun store (key: String, value: Boolean) {
        mSharedPreferences.edit().putBoolean(key, value).apply()
    }

    fun remove(key: String) { mSharedPreferences.edit().remove(key).apply()
    }

    fun getString(key: String): String {
        return mSharedPreferences.getString(key, "") ?: ""
    }
    fun getInt(key: String): Int {
        return mSharedPreferences.getInt(key, 0)
    }
    fun getBoolean(key: String): Boolean {
        return mSharedPreferences.getBoolean(key, false)
    }
    fun getFloat(key: String): Float {
        return mSharedPreferences.getFloat(key, 0.0F)
    }
}
