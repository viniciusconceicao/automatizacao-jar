package com.bandtec.searchdevelopers.configuration

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitGeneric private constructor(){

    companion object {

        private fun getRetrofitInstance(url: String): Retrofit {

            lateinit var retrofit: Retrofit
            val httpClient = OkHttpClient.Builder()

            retrofit = Retrofit.Builder()
                .baseUrl(url)
                .client(httpClient.build())
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            return retrofit
        }

        fun <S> createService(serviceClass: Class<S>, url: String): S {
            return getRetrofitInstance(url).create(serviceClass)
        }
    }
}

