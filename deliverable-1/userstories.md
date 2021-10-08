## Introduction
Our project partner has outlined six priorities for our improvements to the app, which we broke down into more user stories. The priority is as follows:
1. Auto login and forgot password
2. Enhanced admin portal
3. Accountability groups with commenting
4. User-designed Quests / Journeys
5. Algorithm for displaying Quests to individual users
6. Improve UI


The broken down user stories were then ordered generally by priority, but some lower priorities are also higher (ie. some amount of UI improvement should be made, even if it is lower, notifications are least important even if they are involved with some of these priorities). **Bolded user stories are the ones that would "make up the MVP".**

## User Stories

1. **(Priority 1): As a user of the app, I want to have the forgot password option so if I am unable to remember my password, I would still be able to recover my password and use the app with the account I owned.**

- _Acceptance Criteria:_
  - Verify the app has a clear “forgot password” option in the login screen
  - Verify the app has a text input for user’s email address in the “forgot password” screen
  - Verify an email (along with the password) has been sent to the input email address (if it is in the database)

2. **(Priority 1): As a user of the app, I want to be able to have an automatic log in to my account after I login once in order for me to simplify the process of using the app which increases my likelihood of using the app.**

- _Acceptance Criteria:_
  - Verify the app has a clear “automatic login” option in the login screen
  - Verify the app will allow the user to select this option when logging in
  - Verify when the option is selected and the user is able to successfully logged in, the next time the user opens the app, he will be automatically logged in

3. **(Priority 2): As an administrator of the app, I want to be able to attach photos and videos to quests in order to provide more interactive content for the users**

- _Acceptance Criteria:_
  - Verify the admin has a way to upload Quests with photos and videos
  - Verify the Quests can be added to a Journey
  - Verify new Journeys can be created to add Quests to, with photos and videos
  - Verify categories (Buckets) can be created for the Quest Playground and Quests can be added to them
  - Verify the upload can be done from the desktop, separate from the app

4. **(Priority 2): As an administrator of the app, I want to be able to view reports on usage and stats for specific Quests and Journeys in order to gain insight on how the users are using the app**

- _Acceptance Criteria:_
  - Reports on the user's overall app usage time and patterns
    - What time in the day, how many days a week, how many hours per day, how long at a time
  - Reports on the user's engagement with a Quest or Journey
    - How long it took a user to complete a Quest/Journey
    - How the user rated Quests and Journeys
  - Reports on specific Quests or Journeys
    - Which Quests or Journeys were rated higher or lower
    - Which Quests or Journeys took the most or least time to complete

5. **(Priority 3): As a user of the app, I want to receive notifications about comments on my responses and my buddies' activity so I know to check the comment and my buddies' comments**

- _Acceptance Criteria:_
  - Users will receive push notifications when they receive a new comment on a response
  - Users will receive notifications when someone in their group completes an exercise: Your buddy completed an exercise, you can provide feedback and encouragement. 
  - Limit notification about buddies to once a day - daily summary: Person and x others submitted a response

6. **(Priority 3): As a user, I want to have a choice to sign up with an accountability buddy to keep myself and my friend accountable**

- _Acceptance Criteria:_
  - On sign up, the user can choose to connect with an existing user group with an ID
  - They can choose from a list of available groups
  - Users are given the option to be paired with an anonymous user they don’t know randomly in a group

7. **(Priority 3): As a user, I want to be able to comment on my accountability group members’ responses to their Quests to keep them engaged.**

- _Acceptance Criteria:_
  - A screen for seeing your accountability group's responses from last week.
  - Users can write comments on their buddy’s responses. The comments can behave as a “thread” (replying to each other/themselves).
  - Users will receive in-app notifications if they receive a new comment

8. **(Priority 3): As a user, I want to be able to change accountability groups to continue keeping accountability with a group if my group is not active**

- _Acceptance Criteria:_
  - At any time, the user can withdraw from a group
  - The user can join another group directly
  - The user can join another group while not being in any group, by the same options/process used for sign up

9. **(Prereq to priority 4): As a user I want to have a Quest Playground where I am able to do other exercises grouped into "Buckets" that are not part of my Journey, in order for me to do any exercises that I feel is best for me at that moment**

- _Acceptance Criteria:_
  - Verify the app has a clear “Quest Playground” option on the question selection screen
  - Verify the app will have different quests/exercises available for users to pick from on the Playground screen
  - Verify users can do and finish the quests from playground but is not counted towards any journey 
  - Quests in the playground should be grouped into “Buckets” by category

10. **(Priority 4): As a user, I want to be able to submit a Quest or Journey of my own design to share with other users**

- _Acceptance Criteria:_
  - Users can upload Quests to be reviewed by a moderator/admin, notified by email
  - The admin should be able to contact the user via email
  - Users can submit an individual quest, or a whole journey accompanied by Quests
  - Individual Quests can be tagged with a “Bucket”, admin should be able to change such category
  - Submitted Quests/Journeys can contain photos or videos

11. **(Priority 5): As a user, I want to have my feedback affect what Quests I am offered in order to tailor the experience to my own needs**

- _Acceptance Criteria:_
  - Given the questions already implemented in the existing app of "How do you feel today" and "How helpful was the exercise":
  - Quests that the user liked can be offered more often/repeated
  - Quests that the user disliked can be offered less often/not at all
  - Quests can be repeated in a journey
  - Quests with similar categories/methodologies (in the same Buckets) can be offered more often to a user who likes that type of quest

12. **(Priority 6): As a user, I want to be able to have a clear UI that follows design principles in order to make my experience with the app smooth**

- _Acceptance Criteria:_
  - Make basic UI improvements to the app 
  - Colour scheme
  - Clear interface for viewing Quests and Journeys with images
  - Clear button to submit Quests and Journeys for users

13. **(Priority 6): As a user of the app, I want to change when I receive my daily notification from the app to do my exercise in order for me to increase my likelihood of forming a daily habit of using the app.**

- _Acceptance Criteria:_
  - Verify there is a clear settings button/option that is visible to the user to click in the application
  - Verify there is a clear option for changing notification setting under the setting page
  - Verify user can change when to exercise notification from the notification setting 
  - Verify the application will follow the instruction set by the user and push notification for exercise at the correct time

14. **(Priority 3): As a user, I want to be able to give an encouraging nudge to my buddy if they haven’t done an exercise in a little while to remind them.**

- _Acceptance Criteria:_
  - Users will receive in-app and push notifications: Your buddy hasn’t done an exercise in a little while. Give them an encouraging nudge.
  - Users will receive push notifications: Your buddy nudged you! Come complete a happiness exercise towards your Journey.
  - If they haven’t done an exercise in 4 days nudge the specific person

15. **(Priority 6): As a user I want to have the choice to do an exercise out of options provided by the Journey I am on**

- _Acceptance Criteria:_
  - User is shown 2 Quests applicable to their Journey
  - User's name is included in the Quest
  - User can click to get another exercise if they don’t want to do the exercise presented to them
  - One acception option: "Accept the Quest"
  - Two rejection options: "Never show this exercise" / "Not today"
  - If they don’t like either of the two quests they are provided with one more option

16. **(Priority 6): As a user of the app, I want to change what days of the week I will receive my assignments in order for me to make sure my usage of the applications fits my schedule.**

- _Acceptance Criteria:_
  - Verify there is a clear settings button/option that is visible to the user to click in the application
  - Verify there is a clear option for changing how often the user will receive an assignment under the setting page
  - Verify user can change how often he will receive an assignment with the options of (Everyday, weekdays, Every other day or only when I open the app) 
  - Verify the application will follow the instruction set by the user and publish an assignment at the correct time interval

17. **(Priority 6): As a user I want to be able to set an alarm to do the Quest later in the day if I cannot do it right away**

- _Acceptance Criteria:_
  - User is shown an option to "Set an alarm for later"
  - An alarm can be set for a specific time and must go off even if the app is closed
  - The alarm has the same options as a standard alarm app

18. **(Priority 6): As a user, I want to be able to keep my responses private in order to keep information I don’t want others to know private.

- _Acceptance Criteria:_
  - Checkbox on response form to keep private from administrators
  - Checkbox on response form to keep private from accountability buddies
  - Setting to keep all responses private from either of the above - default setting to share or not share
  - Users can share with their accountability group, admin can read answers but is anonymized
  - Admin can contact user who has shared to admin if it can be published anonymously
  - Ensure user knows about this - Privacy Policy
