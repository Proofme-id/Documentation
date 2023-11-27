# Installation Android

### Step 1
Before installing the SDK, you need to have access to the `Proofme package registry`. 
Add the following to ~/.npmrc to be able to download the package:
```
@proofme-id:registry=https://packages.didux.network/
//packages.didux.network/:_authToken="YOUR_ORGANISATION_TOKEN"
```

Then install the NPM packages
```
npm install
```

### Step 2
The plugin uses Capacitor 5 which requires the use of Java 17. To setup Android Studio to use Java 17:
- Android Studio -> Preferences
- Build, Execution, Deployment -> Build Tools -> Gradle
- Gradle JDK -> Select any JDK 17

### Step 3
Sync the project with the plugin: `npx cap sync`

### Step 4
Inside the `variables.gradle` make sure to have the `minSdkVersion` to a minimum of `28`

```json
ext {
    minSdkVersion = 22              // <- This one
    compileSdkVersion = 34
    targetSdkVersion = 34
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
<!-- Activity: Camera for MRZ (portrait / landscape supported) -->
<activity android:name="io.didux.reader.source.camera.CameraActivity"
    android:screenOrientation="portrait"
    android:configChanges="orientation|keyboardHidden|screenSize"
    android:theme="@style/Theme.AppCompat.Light.NoActionBar.FullScreen"
    android:windowSoftInputMode="stateAlwaysHidden" >
</activity>
```

### Step 6
Since this plugin uses the Camera to scan the MRZ we need to define the Camera permission inside the AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.CAMERA" /> <!-- Add this line-->

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
    
    ...

```

### Step 7
Add Kotlin support to your app (the library uses Kotlin code)

build.gradle (Module: app)

```gradle
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android' // <---  Add this
apply plugin: 'kotlin-kapt' // <---  Add this

android {
    namespace "com.app.example"

    ...
}
```

### Step 8
Add Kotlin support to your app (the library uses Kotlin code)

build.gradle (Module: app)

```gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {

    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.0.2'
        classpath 'com.google.gms:google-services:4.3.15'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.8.20' // <--- Add this

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

apply from: "variables.gradle"
```

### Step 9
Add this to your `settings.gradle` so the project libraries can be found
```javascript
include ':sdk'
project(':sdk').projectDir = new File('../node_modules/@proofme-id/sdk/web/reader/android/sdk')

include ':jp2'
project(':jp2').projectDir = new File('../node_modules/@proofme-id/sdk/web/reader/android/jp2')
```

### Step 10
Add this to your project so databinding is supported (so we can draw on the MRZ overlay)

```gradle
android {

    ...

    dataBinding {
        enabled = true
    }

    ...
}
```

### Step 11
Build your project as your normally would with `Capacitor`