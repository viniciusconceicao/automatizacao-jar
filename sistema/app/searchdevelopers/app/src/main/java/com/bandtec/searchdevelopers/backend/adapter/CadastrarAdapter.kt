package com.bandtec.searchdevelopers.backend.adapter

data class CadastrarAdapter (

    val nameUser: String,
    val cpf: String?,
    val cnpj: String?,
    val birthDate: String,
    val email: String,
    val password: String,
    val role: String?,
    val phone: String,

)