# Bellwoods Strategic Capital Happiness App/ACG.EXE

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?
This app provides users with a way to further increase the level of happiness and fulfillment in their everyday lives. By
providing modules known as "jouneys" which is on a specific topic related to happiness, and "quests" within journeys which
are simple exercises that users can practice. The journeys are completed in the course of a few days to a week, which is meant
to help you feel happier and a sense of fulfillment. Users can track their progress and look back on previously done quests
and journeys. The app is catered to the specific user to provide more quests that are of users' liking.

These daily happiness exercises are based on positive psychology which promote gratitude, forgiveness, mindfulness, physical 
movement, reduced social media and more. These exercises are proven to improve happiness, and that the simplicity of such 
tasks eases users to the process, and make users more willing to commit long term with their goals.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built
1. Starting a journey
2. Completing a quest
3. 

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully

 ### [Feature] Adding image for a quest or journey (creating or changing from Administer in backend)
 
 *We don’t allow users to create a journey/quest themselves.

 Administer should log in to their account through xxx.xxx.xx:8000/admin with credentials username ‘admin’ and password ‘happyApp’. In the JOURNEYS/Journeys & Quests columns, you can add a journey/quest with/without uploading a picture for it. When there is no picture for it, there would be a placeholder picture in the app. 
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

 ### Front end codebase
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
"additional survey question for each quest", "adding images and multimedia for journeys and quests" and "forget password and
automatic login". We name the branches as the names we used to communicate internally. We abbreviate the description of the functionality
of such additional feature. After developing and testing the features, we create a pull request to initiate the process of merging
the newly added feature to main branch. We all have to agree that the feature is usable, and ready to merge before actually 
merging the branches.

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We chose not to apply for a license for our codebase as our codebase is strictly closed-sourced and none aspects of our app is 
shared publicly. 
