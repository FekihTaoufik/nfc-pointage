package com.MBDS.pointagenfc.models.user

data class UserLoginModel(
    val universityCardId: String,
    val firtName: String,
    val lastName: String,
    var email: String ,
    val role: String,
    val Group: String
)