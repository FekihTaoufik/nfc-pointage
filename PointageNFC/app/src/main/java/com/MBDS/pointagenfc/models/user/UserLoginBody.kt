package com.MBDS.pointagenfc.models.user

data class UserLoginBody(
    val universityCardId: String,
    val password: String
)