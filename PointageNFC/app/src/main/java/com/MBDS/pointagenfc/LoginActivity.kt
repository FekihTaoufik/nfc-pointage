package com.MBDS.pointagenfc

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import com.MBDS.pointagenfc.models.user.UserLoginBody
import com.MBDS.pointagenfc.models.user.UserLoginModel
import com.MBDS.pointagenfc.request.RequestUsers
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlin.math.log

class LoginActivity : AppCompatActivity() {
    lateinit var userinfo: UserLoginModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val txt_cartID = findViewById(R.id.txt_cartID) as EditText
        val txt_mdp = findViewById(R.id.txt_mdp) as EditText
        val btn_seConnecter_ = findViewById(R.id.btn_connecter_utilisateur) as Button
        // set on-click listener
        btn_seConnecter_.setOnClickListener {
            val intent = Intent(this, SalleLoginActivity::class.java)
            // start your next activity
            GlobalScope.launch(Dispatchers.Main) {
                val userInfos = RequestUsers.login(UserLoginBody(universityCardId = txt_cartID.text.toString(),password = txt_mdp.text.toString()))?.let {
                    userinfo = it
                    Log.d("LoginActivity", userinfo.toString())
                }


            }
        }

    }
}