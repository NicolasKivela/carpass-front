package com.trustcar;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme);
    super.onCreate(savedInstanceState);
  }

  @Override
    protected String getMainComponentName() {
        return "Trustcar";
    }

}
