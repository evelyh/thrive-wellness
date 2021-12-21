# Thrive

## Development requirements
* Node
* Expo-cli by `npm i -g expo-cli`
* Python3
* Navigate to directory: `HappinessApp-Django/` and run `pip3 install -r requirement.txt`

## Steps to run the app on a phone simulator
* Install an iOS/Android simulator
* Navigate to directory: `HappinessApp-ReactNative/`
* `npm install`
* `npm start`
* Open the simulator through the popped webpage

## Code structure 
The codebase is organized in 2 main directories.

### Backend

**HappinessApp-Django** Containes the django based backend code.

Django files are organized following a django standard convention.

The django application is hosted on the PythonAnywhere server at https://thriveapp.pythonanywhere.com

To run a local host,
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`
* `python3 manage.py runserver`

To update code in the server,
- import new code to the repo [deploy-pythonanywhere](https://github.com/bellwoods/deploy-pythonanywhere) in the bellwoods GitHub account. Do not include any migrations or database files.
- Login to [PythonAnywhere](https://pythonanywhere.com)
- Open console
- `cd ~/deploy2`
- `git pull` with the bellwoods GitHub account

### Frontend

**HappinessApp-ReactNative** Containes the React Native front end code.

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

### From 1st team

1. The authentication token retrieved form the backend right now is stored in the AsyncStorage. This is generally not the best practice. The authorization token needs to be stored in the platform specific storage for tokens (For example KeyChain for the iOS).

2. The notification system must be organized and deployed under a uniqie Email Expo account.

3. The notification system needs to store the Notification Token in the backend. Backend is responsible for sending the notifications. More info here https://docs.expo.io/push-notifications/sending-notifications/

### From 2nd team
1. "Third Journey" alert is not able to redirect to the "Manage your journeys" page
2. "Approved" automation through Django admin portal^
3. Implementing embedded video instead of redirecting link for videos accompanying journeys and quests
4. Chat and comment feature extension of current accountability buddy system
5. Data extraction & analysis from user feedback/response/data
6. Notification system
7. Files under HappinessApp-ReactNative/screens/JourneyManagement are for management of journeys and quests directly using the app via admin account (which we don't suggest admin to do it right now). They were written by the 1st team, and not updated with current models.
8. One quest added multiple times in a same journey causes problem, and the app will not actually allow this quest to appear more than one time.

^ Currenly, automation is written in `/journeys/views.py`, however changes made through Django Admin Portal does not use code written here. An admin utility(`/admin-utility.py`) is created to allow automation for admin. Refer to Admin guide for more details


## Appendix for lines of code in frontend that involve the backend server URL

HappinessApp-ReactNative/contexts/Networking.js  line 54

HappinessApp-ReactNative/screens/Authentication/LogIn.js line 157

HappinessApp-ReactNative/screens/journey_components/JourneyTree.js line 135

HappinessApp-ReactNative/screens/QuestScreen.js line 39, 51

HappinessApp-Django/HappinessAppApi/settings.py line 32
