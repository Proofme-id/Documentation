# Installation iOS

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
Sync the project with the plugin: `npx cap sync`

### Step 3
Add the following to your Podfile so that all files can be found
```javascript
...
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
    end
  end
end
...
```

### Step 4
Actually install the pods `pod install`

### Step 5
Add the following usage descriptions to your Info.plist file

```xml
<key>NSCameraUsageDescription</key>
<string>The camera will be used for scanning passports</string>
<key>NFCReaderUsageDescription</key>
<string>To scan your passport information</string>
```

### Step 6
Add the following ISO7816 identifiers (type of NFC tags we want to scan) to the Info.plist file
```xml
<key>com.apple.developer.nfc.readersession.iso7816.select-identifiers</key>
<array>
    <string>A0000002471001</string>
    <string>A0000002472001</string>
</array>
```

### Step 7
Add the `Near Field Communication Tag Reading` capability to your project for reading NFC. Do this by going to `Signing & Capabilities` under the `App` tab. Then click on `+ Capability`. Make sure you enabled this for `debug` ánd `release`. If you only enable this for `debug` it won't work in a Testflight / App store build

Also make sure to enable the `NFC Tag Reading` capability inside the App Identifier on https://developer.apple.com/

### Step 8
Add a localization file to your project so we can add translations for the NFC overlay. Do this by going to `File` -> `New` -> `File...` -> `Strings File` -> Save as `Localizable` -> `Create`.

Now double click on the file, on the right the `File inspector` opens. Click on `Localize...`. Now you can select the languages you want to configure. Use the keys below to add translations for your likings. All translation keys used are listed below

#### English translations
```english
"nfc_start_message" = "Put your phone on your ID document";
"nfc_stop_nfc_message" = "Scanning NFC canceled...";
"nfc_authenticating" = "Chip found, authenticating...";
"nfc_reading" = "Reading...";
"nfc_invalid_tag" = "This chip is not supported";
"nfc_multiple_tags_found" = "Multiple tags found";
"nfc_connection_lost" = "Connection lost";
"nfc_mrz_invalid" = "Please check your information";
"nfc_unknown_error" = "Scanning failed";
"nfc_general_error" = "Something went wrong";
"nfc_success" = "Success!";
```

#### Dutch translations
```dutch
"nfc_start_message" = "Leg je telefoon op je identiteitsbewijs";
"nfc_stop_nfc_message" = "Scannen van NFC geannulleerd...";
"nfc_authenticating" = "Chip gevonden, authenticeren...";
"nfc_reading" = "Lezen...";
"nfc_invalid_tag" = "Deze chip wordt niet ondersteund";
"nfc_multiple_tags_found" = "Meerdere chips gevonden";
"nfc_connection_lost" = "Verbinding verloren";
"nfc_mrz_invalid" = "Controleer jouw gegevens";
"nfc_unknown_error" = "Scannen mislukt";
"nfc_general_error" = "Er is iets fout gegaan";
"nfc_success" = "Gelukt!";
```

