# Bellwoods Strategic Capital Happiness App/ACG.EXE

## Description 

This app provides users with a way to further increase the level of happiness and fulfillment in their everyday lives. By providing modules known as "journeys" which is on a specific topic related to happiness, and "quests" within journeys which are simple exercises that users can practice. The journeys are completed in the course of a few days to a week, which is meant to help you feel happier and a sense of fulfillment. Users can track their progress and look back on previously done quests and journeys. The app is catered to the specific user to provide more quests that are of users' liking.

These daily happiness exercises are based on positive psychology which promote gratitude, forgiveness, mindfulness, physical movement, reduced social media and more. These exercises are proven to improve happiness, and that the simplicity of such tasks eases users to the process, and make users more willing to commit long term with their goals.



## Key Features

All features that were implemented by the team are what the team and our partner at Bellwoods agreed on as the highest priority features that will help Bellwoods and users after lengthy conversation.

The following are the key features that users can access in our app. 

1. Reset-Password

Users are able to reset their password by passing through their registered email. Users will get an email sent from an admin email address that gives them a link to reset their password and remind them of their username.

This is a crucial feature for the app as we do not want users to be locked out from using the app or lose all their progress in their app because they cannot remember their username or password. This allows users to always be able to retrieve their account as long as they have access to their email account.

 
2. Remember me in Login

Users are able to click on a checkbox in the login screen to enable the “Remember Me” function which allows the app to remember the user’s username and password in the login screen so every time the user needs to login to the app, the login credentials will already be there and all the user needs to do is click the login button.

This is an important feature as we want to minimize the hassle for users in the login process and hence increase their likelihood of developing a habit of using the app. 

3. Starting a Journey

There are different journeys available on our apps. Each journey has a list of suggested quests relevant to its theme. Users can follow the list of quests to complete a journey. 

Having this feature, users can follow the list of quests in a particular journey instead of finding them separately in the whole list of quests in the daily quests page. It would make it easier for users to pick a quest that they are interested in. And it will reduce users’ time to decide on which quests to do. 

 
4. Completing a daily quests

Users can complete a quest in the ‘Daily Quest’ without starting a journey. After finishing the quest, users may provide their feedback to the quests. We may improve our quests based on users' feedback. And there may also be a survey question for a quest, this may be used on some research in psychology in the future.

This feature is for users who are not interested in any journeys in our app, or instead of sticking to a journey, they prefer to pick whatever quests they like. We want to give more options to users. 

5. Admin portal

Administrators of the apps can add quests, journeys to the app. And for each quest and journey, other than the required information, admin can add an image to both quest and journey, and a survey question to a quest through the admin portal. If there is no image added, our app will show the default image. 

This is an essential feature for administrators to manage the app. Having the admin portal, administrators can manage the app without looking into the code, and can post and update information on the app easily. 



## Instructions
 
 #### Sign up for an account / Log in an existing account
 
 To use the app, users must sign up for an account. As a first time user, the app will prompt you with 2 options, "sign up" or "login". Choose “sign up” to create a new account, or log in to an existing account. Make sure you sign-up with an email address you have access to to use the features that were implemented.
 
 Testing out Reset-Password:
 
 * Register an account with an email address you have access to
 * Logout from the account through the bottom right “Profile” tab if you are still logged in 
 * Press “Login” button from front page
 * Click “FORGOT USERNAME OR PASSWORD?” button
 * Enter the email address that you registered for an account in the app to the textbox and click submit
 * Go to your email account and you should see an email from “bellwoodspw@gmail” that contains a link to resetting your password along with your username
 * Click the reset password link and follow the instructions to reset your password
 * Login to the app with your new password

 Testing out Remember Me:
 
 * Make sure you have an account in the app or register a new account
 * Logout from the account through the bottom right “Profile” tab if you are still logged in
 * Press “Login” button from front page
 * Enter your username, password and click on the checkbox beside “Remember Me”
 * Click Sign In to login to the app
 * Logout from the account through the bottom right “Profile” tab
 * Press “Login” button from front page
 * You should see your username and password are already filled in


 
 #### Viewing and completing quests in a journey
  this is a feature implemented by last year's team, with modifications done by us

  Once logged in, users can go to the "journey" tab to view all journeys. From here, they can access quests of each journey by clicking "tap to see more" on each journey, which brings users to a page containing quests in that particular journey. Users can then click "start quest" to complete a quest. There is also a feedback page after the quest itself, which contains ratings for the quest and a question specific to that quest (may or may not have this question) the users could fill in to let the app cater to their needs in the future and suggest quests that suit their needs and liking. 

  Currently, the “Quests” tab does not show quests, and that every quest can only be submitted once, even though it is allowed to click “submit” for a second time.
  
  Testing:
  
  * Navigate to “Journey” tab
  * Select a journey you are interested in, tap “TAP TO SEE MORE”
  * Select a quest you are interested in, tap “START QUEST”
  * Key in answers to the quest, tap “Submit”
  * Fill in survey question (if applicable), and rate the quest and your feelings with the sliders, tap “Submit” afterwards
  
  Note: You should not submit more than one response to the same quest.


 
 #### Adding image for a quest or journey and adding a survey question for a quest from Administer in backend
  *We don’t allow users to create a journey/quest themselves.

  Administers should log in to their account through intezzz.pythonanywhere.com/admin with credentials username ‘admin’ and password ‘happyApp’. In the JOURNEYS/Journeys & Quests columns, they can add a journey/quest with/without uploading a picture for it. When there is no picture uploaded for it, there would be a placeholder picture shown in the app. Survey question is also optional when adding a quest.

  Testing image for journey:
  
  * Open intezzz.pythonanywhere.com/admin on a web browser
  * Login with credentials (username: admin, password: happyApp)
  * Click “Add” beside the label “Journey” to add a journey
  * Fill in necessary fields, and upload an image
  * Click “Save”
  * Open the app, navigate to “Journey” tab
  * Locate the newly added journey and tap “TAP TO SEE MORE”
  * You should be able to see the image uploaded as the banner

Testing image for quest:

* Open intezzz.pythonanywhere.com/admin on a web browser
* Login with credentials (username: admin, password: happyApp)
* Click “Add” beside the label “Quest” to add a new quest
* Fill in the necessary fields, and upload an image
* Click “Save”
* Open the app, navigate to “Journey” tab
* Locate the journey that the newly added quest belong to, and tap “TAP TO SEE MORE”
* Locate the newly added quest, tap “START QUEST”
* You should be able to see the image uploaded as the banner

Testing survey question for quest:
* Open intezzz.pythonanywhere.com/admin on a web browser
* Login with credentials (username: admin, password: happyApp)
* Click “Add” beside the label “Quest” to add a new quest
* Fill in the necessary fields, and add in a specific survey question under the “Survey question:” section
* Click “Save”
* Open the app, navigate to “Journey” tab
* Locate the journey that the newly added quest belong to, and tap “TAP TO SEE MORE”
* Locate the newly added quest, tap “START QUEST”
* Click “Submit” to finish the quest
* You should be able to see the survey question you typed in as the last question on the Feedback screen

 
 _*We don’t allow users to create a journey/quest on their own_

 Administer should log in to their account through intezzz.pythonanywhere.com/admin with credentials username ‘admin’ and password ‘happyApp’. In the JOURNEYS/Journeys & Quests columns, they can add a journey/quest with/without uploading a picture for it. When there is no picture uploaded for it, there would be a placeholder picture shown in the app. 
 
 ## Development requirements

### Frontend codebase
A developer would need some tools that are available for free on Windows, MacOS and Linux.

Download npm and node.js
Install and add ‘nodejs/node_modules/npm/bin’ to PATH (this can be omitted)
Clone repository and change directories to HappinessApp-ReactNative
Run ‘npm install -g expo-cli’ to install expo build services to emulate and test the application on your mobile device or emulator
Run ‘npm install’ to install all project dependencies
Run ‘expo start’ to commence app deployment on localhost network
Download Expo app on your mobile device and scan the QR code to open the app on your mobile device, or run it on your emulator by choosing the corresponding option given:
Download and install Android Studio, open AVD Manager in Android Studio. Install an emulator of an Android phone. Press ‘a’ to run the app.
Download Xcode and open a simulator in ‘Developer tools’ (model chosen by user). Press ‘i’ to run the app.

### Backend codebase
Download and install Python (versions 3.7 or after)
Change directories to HappinessApp-Django
Run ‘pip install -r requirements.txt’ to install all packages used in the project
Run ‘python manage.py makemigrations’ and ‘python manage.py migrate’ if this is the first time running the code (use ‘python3’ instead of ‘python’ if you’re using Macbook)
Run python manage.py runserver to run the Django server on your local network localhost


## Deployment and Github Workflow

We create a new branch for every feature we are to add. For example, there are separate branches for adding the features "additional survey question for each quest", "adding images for journeys and quests" and "forget password and automatic login". We abbreviate the description of the functionality of such additional features and we name the branches as the names we used to communicate internally, so the branch name doesn't get redundant. After developing and testing the features, we create a pull request to initiate the process of merging the newly added feature to the main branch. Beside the people who developed the particular feature, we appointed one other person to review the code and test it again. After we all agree with the usability of the features, we merge the branches.

For the deployment tools, we hosted our project on pythonanywhere and used expo to pack our project into an apk since we used Django as backend and React Native as frontend. After deploying the project to the server, everytime we make changes to it, we can just pull changes from our repo to the remote repo on the server. For the live application, we run our app on expo with Android/IOS simulators to use the actual app. After finishing all work, we make an apk to deploy the entire app to users.

Since our main task is to modify and update an existing MVP, some of us sometimes need to work based on the same thing, not just simply splitting tasks. So it's really important to directly communicate with each other and with our partner. So this workflow we chose avoids potential conflicts when people work independently but to make us up-to-date with each other's progress.

## Licenses
As of right now, we abstained from licencing our code. Since this is a private repository, nobody has access to our code except for members of our team. Upon completion of the course, we will need to pass on the project ownership to its future team of developers. At that time, we will leave the licence choice to our partner’s discretion.
