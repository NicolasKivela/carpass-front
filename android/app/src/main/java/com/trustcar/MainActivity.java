package com.trustcar;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
import com.reactnativenavigation.NavigationActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    RNBootSplash.init(this, R.style.BootTheme);
    super.onCreate(savedInstanceState);
  }

    protected String getMainComponentName() {
        return "Trustcar";
    }

}
