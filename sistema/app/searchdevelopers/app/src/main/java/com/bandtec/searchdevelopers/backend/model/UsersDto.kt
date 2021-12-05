package com.bandtec.searchdevelopers.backend.model

data class UsersDto(

    val idUser: Int,
    val nameUser: String,
    val cpf: String?,
    val cnpj: String?,
    val birthDate: String,
    val nameCompany: String?,
    val email: String,
    val password: String,
    val role: String,
    val descriptionUser: String?,
    val starsUser: Double?,
    val phone: String?,
    val status: Boolean,
    val locality: String?,
    val photo: String?,
    val creationDate: String,
    val numberCard: String?,
    val cvv: String?,
    val monthCard: String?,
    val yearCard: String?,
    val isPremium: Boolean?,
    val ratingNumber: Int,
    )
