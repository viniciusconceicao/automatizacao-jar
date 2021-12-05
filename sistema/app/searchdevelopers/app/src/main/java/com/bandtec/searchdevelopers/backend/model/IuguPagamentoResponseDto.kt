package com.bandtec.searchdevelopers.backend.model

data class IuguPagamentoResponseDto(

    val message:String,
    val status:String,
    val infoMessage:String,
    val reversible:String,
    val token:String,
    val brand:String,
    val bin:String,
    val success:String,
    val url:String,
    val pdf:String,
    val identification:String,
    val invoiceId:String,
    val lr:String,
)
