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
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 #### Sign up for an account / Log in an existing account
 
 To use the app, users must sign up for an account. As a first time user, the app will prompt you with 2 options, "sign up" or "log in". Choose sign up to create a new account, or log in to an existing account.
 
 #### Stay logged in
 
 To make it easier for users, we have a "remember me" option which allows users to stay logged in, and does not need to login every time they access the app. Please choose the "remember me" option when entering your credentials if you wish to do so.
 
 #### Forget password / username
 
 We understand that we sometimes forget our credentials to accounts, and we are able to retrieve that information for you. As a user forget their password, choose the "forget password" option, which brings users to a page to key in their email address which is associated to their account. Instructions to resetting their password will then be sent to their email address if it is registered in our system.
 
 #### Viewing and completing quests in a journey
 
 _this is a feature implemented by last year's team, with modifications done by us_
 
 Once logged in, users can go to the "journey" tab to view all journeys. From here, they can access quests of each journey by clicking "tap to see more" on each journey, whcih brings users to a page containing quests in that particular journey. Users can then click "start quest" to complete a quest. There is also a feedback page after the quest itself, which contains ratings for the quest and a question specific to that quest (may or may not have this question) the users could fill in to let the app cater to their needs in the future and suggest them quests that suit their needs and liking.

 #### Adding image for a quest or journey from Administer in backend
 
 _*We don’t allow users to create a journey/quest on their own_

 Administer should log in to their account through intezzz.pythonanywhere.com/admin with credentials username ‘admin’ and password ‘happyApp’. In the JOURNEYS/Journeys & Quests columns, they can add a journey/quest with/without uploading a picture for it. When there is no picture uploaded for it, there would be a placeholder picture shown in the app. 
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

 ### Frontend codebase
 A developer would need some tools that are available for free on Windows, MacOS and Linus.
 1) Download npm and node.js
 2) Install and add nodejs/node_modules/npm/bin to PATH (this can be omitted)
 3) Clone repository and change directories to HappinessApp-ReactNative
 4) Run `npm install -g expo-cli` to install expo build services to emulate and test the application on your mobile device or emulator
 5) Run `npm install` to install all project dependencies
 6) Run `expo start` to commence app deployment on localhost network
 7) Download Expo app on your mobile device and scan the QR code to open the app on your mobile device, or run it on your emulator by choosing the corresponding option given

 ### Backend codebase
 1) Download and install Python (versions 3.7 or after)
 2) Change directories to HappinessApp-Django
 3) Run `pip install -r requirements.txt` to install all packages used in the project
 4) Run `python manage.py makemigrations` and `python manage.py migrate` if this is the first time running the code
 5) Run `python manage.py runserver` to run the Django server on your local network localhost
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

We create a new branch for every feature we are to add. For example, there are separate branches for adding the features
"additional survey question for each quest", "adding images for journeys and quests" and "forget password and
automatic login". We abbreviate the description of the functionality of such additional feature and we name the branches as the names we used to communicate internally, so the branch name doesn't get redundant. After developing and testing the features, we create a pull request to initiate the process of merging
the newly added feature to main branch. Besides the people developed the feature, we appoint one other person to should all review the code and test it again. After we all agree with the usability of the features, we merge the branches.

For the deployment tools, we hosted our project on pythonanywhere and using expo to pack our project into an apk since we used Django as backend and React Native as frontend. After deploying the project to the server, everytime we make changes to it, we can just pull changes from our repo to the remote repo on the server. For live application, we run our app on expo with Android/IOS simulators to see the actuall app. After finishing all work, we make an apk of our app for users.

Since our main task is to modify and update an exsting MVP, some of us sometimes need to work based on the same thing, not just simply splitting tasks. So it's really important to directly communicate with each other and with our partner. So this workflow we chose avoids potential conflicts when people work independently but to make us up-to-date with each other's progress.

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We chose not to apply for a license for our codebase as our codebase is strictly closed-sourced and none aspects of our app is 
shared publicly. 
