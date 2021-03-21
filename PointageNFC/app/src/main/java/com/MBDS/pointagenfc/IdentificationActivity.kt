package com.MBDS.pointagenfc

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class IdentificationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_identification)
        // get reference to button
        val btn_open_salleUI = findViewById(R.id.btn_salle) as Button
        // set on-click listener
        btn_open_salleUI.setOnClickListener {
            val intent = Intent(this, SalleLoginActivity::class.java)
            // start your next activity
            startActivity(intent)
        }

        val btn_open_userUI = findViewById(R.id.btn_utilisateur) as Button
        btn_open_userUI.setOnClickListener{
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
    }


}