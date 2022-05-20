<h1 align="center">
  <img alt="App-cars logo" src="github/gofinances-cover.png" width='100%'>
</h1>

<h3 align="center">
  React Native Application for your finances
</h3>

<p align='center'>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/guribeiro/gofinances-2.0?color=5636D3">
  <a href="https://www.linkedin.com/in/gustavohribeiro/" target="_blank" rel="noopener noreferrer">
  <img alt="Made by" src="https://img.shields.io/badge/made%20by-Gustavo%20Henrique-5636D3">
  </a>
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/guribeiro/gofinances-2.0?color=5636D3">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/guribeiro/gofinances-2.0?color=5636D3">
  </a>
 <a href="https://github.com/Guribeiro/softwrap-api/stargazers">
    <img alt="GitHub last commit" src="https://img.shields.io/github/stars/Guribeiro/gofinances-2.0?color=5636D3">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/Guribeiro/gofinances-2.0?color=5636D3">
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 💲 About the project

this app is totally based on gofinances app from course ignite from [rocketseat](https://www.rocketseat.com.br/). All I did was add some new screens and features.

[**Original prototype**](https://www.figma.com/file/vThJ6qrb4HDT6RfO5sJGu0/GoFinances-Ignite)

## [🌌 See the prototype made on figma](https://www.figma.com/file/xaqBEax6YYqASGkmZwrb3A/GoFinances-Ignite-(Copy)?node-id=0%3A1)

## 🚀 Technologies


Technologies that I used to develop this mobile application

- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Styled Components](https://styled-components.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Date-fns](https://date-fns.org/)
- [Victory Chart](https://formidable.com/open-source/victory/docs/victory-chart/)
- [React Native Calendars](https://github.com/wix/react-native-calendars)
- [Responsive Native](https://github.com/diego3g/responsive-native)
- [Firebase](https://firebase.google.com/docs)
- [React Native Dotenv](https://github.com/goatandsheep/react-native-dotenv)

## 💻 Getting started

### Requirements

- [NodeJs](https://nodejs.org/en/)
- [Expo](https://docs.expo.dev/) installed
- [Expo Go](https://expo.dev/client) or [Android Studio](https://developer.android.com/studio) installed

**Clone the project and access the folder**

```bash
git clone git@github.com:Guribeiro/financial-control-mobile.git && cd financial-control-mobile
```

### For Installing the dependencies you can run:

```bash
 yarn
```

## Before you run the project, you should add some firebase credentials to make it works

- [create a firebase project at **Firebase Console**](https://cloud.google.com/firestore/docs/client/get-firebase)
- create a **_.env_** file on the project root as same as the **_.env.example_** file
- fill the  **_.env_** with **your** project credentials
```bash
# FIREBASE

API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEANSUREMENT_ID=
```
### For running it on your phone, make sure you've installed Expo Go
```bash
yarn start
```
_Open the Expo Go on you phone and select the **financial-control** project_

### For running it on emulator, make sure you've installed Android Studio

- Step 1 - Click on 'More Actions' > 'Virtual Device Mananger'
- Step 2 - Launch an existing AVD or click on create and add a device
<br>
_After all this steps you would be able to start the application_

```bash
yarn android
```
_The App will be shown on the Emulated Device_

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💙 &nbsp;by Gustavo Henrique 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/gustavohribeiro/)
