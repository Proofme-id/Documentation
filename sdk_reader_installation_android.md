# Installation Android

### Step 1
Before installing the SDK, you need to have access to the [Proofme SDK NPM registry](https://github.com/orgs/Proofme-id/packages/npm/package/sdk) and [create a github Personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)  
Add the following to ~/.npmrc to be able to download the package (use command `npm config edit` or your favorite text editor):
```
//npm.pkg.github.com/:_authToken=<YOUR PERSONAL ACCESS TOKEN>
@proofme-id:registry=https://npm.pkg.github.com
```
Then install the sdk in your project:
```
npm install @proofme-id/sdk
```

### Step 2
The plugin uses Capacitor 5 which requires the use of Java 17. To setup Android Studio to use Java 17:
- Android Studio -> Preferences
- Build, Execution, Deployment -> Build Tools -> Gradle
- Gradle JDK -> Select any JDK 17

### Step 3
Sync the project with the plugin: `npx cap sync`

### Step 4
Make sure to add the jcenter() repository to `build.gradle  (Project: android)`  for retrieving all necessary dependencies

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        jcenter()           // <- Add this
    }
}
```

### Step 5
Inside the `variables.gradle` make sure to have the `minSdkVersion` to a minimum of `28`

```json
ext {
    minSdkVersion = 28              // <- This one
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

### Step 6
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

### Step 7
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

### Step 8
The plugin uses view binding to access the MRZ camera view. Add compatability inside your app

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

    ...
}
```

### Step 9
Add this to your `settings.gradle` so the project library can be found
```javascript
include ':sdk'
project(':sdk').projectDir = new File('../node_modules/@proofme-id/sdk/web/reader/android/sdk')
```

### Step 10
Build your project as your normally would with `Capacitor`