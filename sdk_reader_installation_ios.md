# Installation iOS

### Step 1
Install the dependency through NPM: `npm install @proofme-id/sdk`

### Step 2
Sync the project with the plugin: `npx cap sync`

### Step 3
Add the pod to your Podfile
```javascript
...

target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'CapacitorPluginEpassReader', :path => '../../node_modules/@proofme-id/sdk/web/reader'
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
Add the `Near Field Communication Tag Reading` capability to your project for reading NFC. Do this by going to `Signing & Capabilities` under the `App` tab. Then click on `+ Capability`

### Step 8
Add a localization file to your project so we can add translations for the NFC overlay. Do this by going to `File` -> `New` -> `File...` -> `Strings File` -> Save as `Localizable` -> `Create`.

Now double click on the file, on the right the `File inspector` opens. Click on `Localize...`. Now you can select the languages you want to configure. Use the keys below to add translations for your likings. All translation keys used are listed below

#### English translations
```english
"nfc_start_message" = "Put your phone on your ID document";
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

