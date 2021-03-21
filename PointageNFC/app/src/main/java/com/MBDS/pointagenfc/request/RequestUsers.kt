package com.MBDS.pointagenfc.request

import com.MBDS.pointagenfc.models.user.UserLoginBody
import com.MBDS.pointagenfc.models.user.UserLoginModel
import com.MBDS.pointagenfc.services.UserLoginService
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.HttpException
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 *
 * TODO: Replace all uses of this class before publishing your app.
 */
object RequestUsers {
    private val service: UserLoginService
    private const val baseUrl: String = "http://10.0.2.2:4000/api/"
    var isFetched = false

    suspend fun login(userBody: UserLoginBody): UserLoginModel? {
        val response = service.login(
               userBody
        )
        try {
            if (response.isSuccessful) {
                return response.body()
            } else {
                print("Error: ${response.code()}")
            }
        } catch (e: HttpException) {
            print("Exception ${e.message}")
        } catch (e: Throwable) {
            print("Ooops: Something else went wrong")
        }
        return null

    }

    init {
        // Loggin
        val logging = HttpLoggingInterceptor()
        logging.level = HttpLoggingInterceptor.Level.BODY
        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor(logging)

        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            .client(httpClient.build())
            .build()
        service = retrofit.create(UserLoginService::class.java)
    }

}