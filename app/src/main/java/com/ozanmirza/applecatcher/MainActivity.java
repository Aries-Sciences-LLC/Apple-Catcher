package com.ozanmirza.applecatcher;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if(isNetworkAvailable() == true) {
            ImageView alert_view = findViewById(R.id.noInternet);
            alert_view.setAlpha(0);
            WebView main_view = findViewById(R.id.main_view);
            main_view.getSettings().setJavaScriptEnabled(true);
            main_view.getSettings().getAllowFileAccess();
            main_view.getSettings().getAllowContentAccess();
            main_view.getSettings().setDomStorageEnabled(true);
            main_view.getSettings().setUserAgentString("Android");
            main_view.setWebChromeClient(new WebChromeClient());
            main_view.loadUrl("https://rawgit.com/ozanmirza1/Apple-Catcher-Android/master/app/src/main/assets/index.html");
        } else if(isNetworkAvailable() == false) {
            WebView main_view = findViewById(R.id.main_view);
            main_view.setAlpha(0);
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }
}
