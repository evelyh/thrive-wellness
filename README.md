Below is the README.md from the 2020 Team 4's [repository](https://github.com/Good-T/team-project-4-bellwoods-strategic-capital), which will serve as the starter code for our app. The other team's repo which we can also take inspiration and code from (especially for UI) is [here](https://github.com/csc301-fall-2020/team-project-2-bellwoods-strategic-capital).

# Happyness App

## Requirements to run:
* Node installed on your machine 
* Expo-cli installed on your machine (install with: `npm i -g expo-cli`)
* Expo client installed on your phone (available on App Store and Play Market)

## Running our app on your phone:
* Navigate to directory: `HappinessApp-ReactNative/`
* Run `npm install`
* Run `npm start`
* Scan the QR code on your expo app

## Development requirements

Requirements: 
* Node installed on your machine 
* Expo-cli installed on your machine (install with: `npm i -g expo-cli`)
* Expo client installed on your phone (available on App Store and Play Market)
* Python3 installed on your machine
* Download python libraries:
    * Navigate to `HappinessApp-Django/`
    * Run `pip3 install -r requirements.txt`

## Code structure 

The codebase is organized in 2 main directories.

### Backend

**HappinessApp-Django** Containes the django based backend code.

Django files are organized following a django standart conventions.

The django application is hosted on the AWS server at http://3.15.239.159:8000

In order to connect to the development server, you will need the Server SSH Key. 
Robbie at Bellwoods Strategic Capital will provide you with it.
Once you have the key, run the following in order to connect:

`ssh -i ServerKey.pem ubuntu@3.15.239.159`

### Frontend

**HappinessApp-React** Containes the React Native front end code.

React Native app is organized following a React Native standart conventions.

App is structured using React Navigations: Screens are located in their folder.

The entire app is wrapped around the Networking context. This context is responsible for most of the networking calls to the backend, as well as caching the useful data.

Our app features a notification system (not fully functional yet). In order to utilize it (and silence a possible warning) you need to be logged into the expo account. Otherwise React Native notification will throw error.

Log in by calling command in your terminal: `expo login`

Credentials: (*KEEP PRIVATE*)

Username: `happyuapp`

Password: `happyu5000`

## Publishing on expo

Expo provides convinient testing environment for the local development. In addition to that, expo provides tools for publishing.

Right now, the most recent version of our app is published on expo under the expo `happyuapp` account. Published app has a persistent QR-code which enables convinient method of beta testing. User just need to scan the QR-code once, and later the link will remain under 'recents' title on the Expo app on their phones.

This also enables to push updates with ease. Published update will have the same QR-code and will be available to users immediately.

### Note

There is a limitation to that expo publishing though. While working perfectly on Android devices, regular iOS user will not be able to use the QR-code of the app (Apple enforced policy). 

To use the QR-code of the app, user will need to login using expo `happyuapp` account. This will allow developers to test the app on their iOS devices. However, since *sharing the `happyuapp` account to anyone outside the devteam is a potential security issue*, this allows testing to be done only within the devteam. 

In future, to begin beta and alpha testing and make it available for both Android and iOS devices you will need to use the platform specific beta testing tools.

For iOS, it is an Apple developed TestFlight App.

For Android, ... (research necessary).

## Notes on continuing the development

Here are some notes on continuing the development. These mainly include next steps, and what need to be implemented later.

1. The authentication token retrieved form the backend right now is stored in the AsyncStorage. This is generally not the best practice. The authorization token needs to be stored in the platform specific storage for tokens (For example KeyChain for the iOS).

2. The notification system must be organized and deployed under a uniqie Email Expo account.

3. The notification system needs to store the Notification Token in the backend. Backend is responsible for sending the notifications. More info here https://docs.expo.io/push-notifications/sending-notifications/

4. The calls to the backend need a proper error checking and error feedback to user. 
The management of the information cache and order of calls to the backend needs some improvements in order
to fix some of errors and alerts popping up.
(Things like "No connection alert" is currently pops up for all kind of errors)


