# Installation Android

### Step 1
Install the dependency through NPM: `npm install @proofme-id/sdk`

### Step 2
Sync the project with the plugin: `npx cap sync`

### Step 3
Make sure to add the jcenter() repository to `build.gradle  (Project: android)`  for retrieving all necessary dependencies

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        jcenter()      <--- Add this
    }
}
```

### Step 4
Inside the `variables.gradle` make sure to have the `minSdkVersion` to a minimum of `28`

```json
ext {
    minSdkVersion = 28     <---- This one
    compileSdkVersion = 33
    targetSdkVersion = 33
    androidxActivityVersion = '1.7.0'
    androidxAppCompatVersion = '1.6.1'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.10.0'
    androidxFragmentVersion = '1.5.6'
    coreSplashScreenVersion = '1.0.0'
    androidxWebkitVersion = '1.6.1'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.1.5'
    androidxEspressoCoreVersion = '3.5.1'
    cordovaAndroidVersion = '10.1.1'
}
```

### Step 5
Add the following activity next to your existing `MainActivity`. This is the overlay scanner for the MRZ enabling the camera and showing a template of a document card. OCR will be used to extract the necessary information
```xml
<!-- Activity: Camera for MRZ -->
<activity android:name="io.didux.plugin.mrz.CameraActivity"
    android:screenOrientation="landscape"
    android:configChanges="orientation|keyboardHidden|screenSize"
    android:theme="@style/Theme.AppCompat.Light.NoActionBar.FullScreen"
    android:windowSoftInputMode="stateAlwaysHidden" >
</activity>
```

### Step 6
Make sure to add the jcenter() repository to `build.gradle  (Module :app)`  for retrieving all necessary dependencies

```gradle
android {
    ...
    dataBinding {
        enabled = true
    }
    buildFeatures {
        dataBinding true
        viewBinding true
    }
}
```

### Step 7
Add this to your `settings.gradle` so the project library can be found
```javascript
include ':sdk'
project(':sdk').projectDir = new File('../node_modules/@proofme-id/sdk/web/reader/android/sdk')
```