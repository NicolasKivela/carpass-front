# CarPass
Software Engineering Project course, Spring 2024

## Running application requires:

- XCode or Android Studio
- Device for running, can be real or a simulator
- Node
- React native command line tools (react-native-cli)
- JDK (Android)

## How to run the application:

```bash
git clone https://github.com/horridparlor/carpass-front.git
cd carpass-front
npm install
```

if you use iOS:
```bash
cd ios
pod install
cd ..
npm run ios (or run from the XCode)
```

if you use Android:
```bash
npm run android
```

## Debug and issues
Android:
```bash
cd android
./gradlew clean
./gradlew app:assembleDebug
```
or use Android Studio logcat

iOS:
Xcode debug area


