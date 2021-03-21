package com.MBDS.pointagenfc.services
import com.MBDS.pointagenfc.models.user.UserLoginBody
import com.MBDS.pointagenfc.models.user.UserLoginModel
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.*

interface UserLoginService {
    @Headers("Content-Type: application/json")
    @POST("user/login")
    suspend fun login(@Body userData: UserLoginBody): Response<UserLoginModel>
}

