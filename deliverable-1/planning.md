# ACG.EXE


## Product Details

### About the product

We are planning to build a mobile application for iOS and Android that will help users live happier lives and grow closer to achieving their goals by providing exercises known as "Quests", towards an objective known as a "Journey" for the user to complete. This will build off of the existing MVP application created by previous CSC301 students, to add extra features such as an enhanced admin portal, a social aspect with accountability groups, and allowing users to submit their own Quests and Journeys. 

By giving users daily exercises to help make them happier or push them closer to their chosen goals, the happiness exercises promote gratitude, forgiveness, mindfulness, greater physical movement, reduced time on social media, and an improved social life. These are aspects of life that when improved can greatly improve an individual's life. Some examples of exercises: Write 3 good things that happened to you today. Pay for the person behind you in line at the coffee shop. Call a friend you haven't spoken to in a month. 

### About the users

Our target users are people of all ages (most likely adults), who are looking to improve their level of happiness and satisfaction with their lives. This may include individuals such as:
* A university student struggling with self-care while dealing with a hectic schedule
* A working young adult who is adjusting to work life or works a stressful job
* A new parent who finds they don't have enough time for themselves
* An older adult who has a fairly stable life and is looking for ways to make it even better
etc.

It would help any individuals who would benefit from a reminder to take some time to spread kindness to themselves or to others. Since we are also planning to implement a social group aspect, users might be encouraged to sign up with their friends or with a group to use the app.

### Why users would choose this app

A lot of stress of people nowadays comes from uncertainty and anxiety about their situation. This app does not provide the solution, but a buffer to help you find back calmness and sureness of the moment. A benefit of this app over others would be the capability to chat with other users as well as for users to contribute their own choices of exercise. By creating a community that seeks to improve their lives together the app will become a platform for people to connect with people who may be going through similar experiences as them. 

An example of an existing app that may solve this problem is Habitica, a habit tracking app that gamifies keeping good habits. However, Habitica takes a more structured approach to habit forming that may be intimidating, whereas this app could provide reminders and exercises without pressuring the user into completing them like a "to-do list".

### Technology

There is an existing MVP which was done by groups from the previous year, and we would build off of those existing MVPs. We will be using JavaScript with React Native for our front end, and Python with Django REST framework for the backend, to extend the previous groups’ work. We will also be setting up a database, most likely with MySQL or PostgreSQL. For deploying, to be inline with previous work done, we will be using Expo to deploy the app to both iOS and Android. 
For testing, unit testing should be done with all backend components. We will be using GitHub Actions for automating testing.

### User Stories

The user stories that make up the MVP are listed in [userstories.md](https://github.com/csc301-fall-2021/team-project-2-bellwoods-strategic-capital/blob/main/deliverable-1/userstories.md).
These user stories were created with the help of, reviewed, and accepted by our project partner.

### Intellectual Property Confidentiality Agreement

We have decided that the students can mention the project (e.g., on their resume) as well as share the application if it is available to the public, but not publish source code.

----
### Roles and Responsibilities of each member

*Our partner gave us a list of features that he wants us to work on to add for his mobile app, so each of us would claim one of it as our main responsibility.

Erica Li:
My role on a software level will be to work on frontend and help out with backend, working on the forgot password feature, chat feature and other features. For non-software related work, I communicate with the partner and help to organize the meetings with the partner, sending out Zoom meeting links and emails. I also help to delegate tasks.
In terms of technical strengths, I have experience with React/React Native and CSS, and experience programming in Python and Javascript. I also have experience with databases (PostgreSQL, SQLite). For technical weaknesses, I lack experience in CI/CD, lack experience with Django framework, and lack experience with hosting apps/servers for deployment.

Rui Miao(Amy):
Role: Working on the daily notifications,

Strengths: 
1) Have experience building the backend of a web app using spring boot
2) Have experience on working on database using MySQL and SQLite
3) Have experience on basic machine learning skills

Weaknesses:
1) Lack of experience of react-native and frontend
2) Lack of experience of implementing CI/CD 
3) Lack of experience of Style Sheet language

Calvin Chu:
I will mainly be responsible for the backend of the application. Main features that I will be involved in implementing are the “forget password” feature and automatically login. I would also be focusing on enhancing the administrator's control of the app, including uploading pictures and videos for quests, and viewing app usage’s data and statistics. 
My strengths include having experience from my internship and personal project of working with Django framework, react.js, node.js and implementing data structure and algorithms to solve problems concerning an application. My Weaknesses include lack of experience in style sheet language that are used to describe the presentation of the application, setting up CI/CD pipeline and testing with react native and node.js.

Grace Li: 
Software wise, I will be working on the admin portal, which include functionalities such as providing app usage statistics, generating reports on a particular journey or quest, and introducing the ability to attach images or videos to quests and journeys. I will be designing the database schema as well as working on setting it up, while at the same time provide help with other parts of the project when needed. Non-software wise, I am responsible for meeting agendas and a simple minutes for meetings. My strengths include having experience with the Django REST framework, multiple relational databases including PostgreSQL, MSSQL and SQLite, as well as writing and designing extensive tests. However, I lack experience in JavaScript, designing CI/CD pipelines, and any front-end frameworks.

Yunhan Lei (Eve):
I will be mostly responsible for the backend of the application as well. The main features I'll implement is to allow user upload their own quests and admin to review them and release them to the quest playground. As for the group admin side, I will mostly promote communication within group and set up meeting time. 
In terms of technical strength, I have worked full-stack for multiple projects, and are pretty familiar with JavaScript and experienced with React which will help me get started on React Native. I also have experience with databases like Firebase, PostgresSQL, SQLite, etc. My weakness include lack of experience in styling the application using CSS and Style Sheet language, writing tests and implementing DevOps environment, and working with a large group of 6 people.

Xinpeng Shan(Joy):
I will work on user-designed Quests / Journeys, the algorithm for displaying Quests to individual users, and improve the whole UI design for the project. I will also help my team members if needed. My technical strengths are the following, I had experience in backend development in Java using Spring Boot, some experience in frontend development using JavaScript, html, css in building web applications using Vue framework and I have UI design experience in my personal project. Also, as a data science student, I have data science background in Python. My weaknesses are the following: I have lack of experience in react native, lack of experience in testing and I am currently taking CSC343, so I have little experience in databases.

----
### Team operations (meetings)

We will have a meeting every Tuesday with our partner online using Zoom. And we may randomly set up some meetings in between with our own group members if needed using Discord. All of our meetings are online. The purpose of meeting with partners is to make sure that what we made meets their expectations, and also make sure if all the things are on the track. For our own meeting, we will distribute our tasks, set deadlines for tasks, and if there are some members who have difficulties with their tasks, we can discuss and help. Other events could be coding sessions, code reviews, quick weekly sync meetings online, etc.

We had our first meeting with our partner on September 28th. During this first meeting, our partner gave us a brief introduction to the app, and shared the code and two versions of the existing apps. Additionally, we discussed some of their expected user stories and what they expected us to implement. Also, we discussed a time for our weekly meetings that all of us are available and scheduled meetings for Tuesday at 16:30, to be rescheduled if there was an issue with the time.
For the second meeting on October 6th, we provided a list of user stories, and we went over and discussed our user stories with our partner. We also added details to our list of user stories, and we showed some of our mockups. We discussed the details of each user story and added some user stories. Moreover, we also talked about the priority of the implementations of each feature. 

The meeting minutes for our meetings so far are: 60 mins (First meeting), 75 mins (Second meeting).

### Self-organize artifacts

We have a discord group where we can manage the things we need to get done as a team and also we have a slack group where all of the team members and our partner are in so that we can keep track of their requests. There is a #ToDo section on discord when team members can post the deadlines and the tasks we need to get done where every one of us can keep track of it. We are having team meetings regularly (about once a week with our partner and once a week on our own) so that we can assign the tasks to each team member and discuss the things we need to get done as a team together. We will prioritize tasks by discussing them together as a team and then make the decision and set clear deadlines about when each of us need to get things finished. And then, when everyone is finished by that day, we will finalize the work together by having another group meeting.

----
### Team Rules and Culture
 
#### Communications within CSC301 group:

We communicate by chat via Discord multiple times throughout the week and whenever something comes up, and schedule meetings to work on things together on call via Discord. If there is something added to the to-do channel in the Discord, all members should react to the message to acknowledge that they've seen it.

#### Communications with Project Partner (Robbie from Bellwoods):

Our partner representative communicates with us through a Slack channel to deliver his requirements and details of the app. We send Zoom invites to meetings and documents through email to the partner, and have weekly meetings at 16:30 every Tuesday. If we were to have a question for the partner that doesn't need to be discussed in detail at a meeting, or have a technical question for our technical contacts on the partner's team, we will send a message through Slack.

#### Procedure for accountability:

We have random/impromptu meetings set up via Discord if something comes up that week, and all group members are expected to attend a weekly meeting at 16:30 every Tuesday with our partner. Members who are not free should inform others of their absence beforehand and potentially reschedule. 
For members who missed meetings without notice constantly (and not responding on messaging platforms), contact TAs or Prof for help.

### Conflict Resolution:
Possible team conflicts:

* Indecisions: Set deadlines for our plan and make sure to stick to the plan. If there is something that is hard to decide, we will set up a meeting and poll. Partner will act as a tie-breaker if needed.
* Non-responsive team members: Try every single possible way to contact them; if they are still not answering, reach out TA and Prof for help.
* If other members are stuck on their work and need help from the team, but the team members are all too busy with their own work to help: Set up a time to chat about the issue later on when more people/the person who is most qualified to help are free, so both parties can set aside time specifically to work on it.


----
## Highlights

Key Decision 1: (Project-level)

We decided to start implementing the most-needed features first like auto login, forgot password, and admin portal. The alternative is to firstly expand the content-related features of the application like improving UI and the alogorithm to push different quests to users based on their behaviour. The list of features that our partner wants us to implement is relatively long compared to the time we have in this course, so we asked our partner to decide the priority of every feature and made an ordered list for us to start from. This way, instead of possibly running out of time due to the difficulty of implementing extended features, we can be sure to improve the user experience with exsiting application first and keep them using the app.

Key Decision 2: (Project-level)

We decided to work on the base of the combination of two finished MVPs that our partner from last time he partnered with this course. The alternative is to choose either of them. They both used React Native as frontend, but App A used Django and App B used Firebase as backend. Also, App B with Firebase has a better interface. Since Firebase has some limitation with operating on the backend as admin for our partner, we will use Django as our backend. Consequently, we will continue the work on the base of the frontend of App B and the backend of App A. This way we believe we can deliever our partner's needs the best.

Key Decision 3: (Product-level) 

Users can choose to ignore quests from current journey will go pick quests from playground. The alternative to this decision will be users must only be given the option of doing the quests in the current journey. The argument for this alternative is that the user will be more engaged in the journey and it will be harder for them to completely ignore the journey function and miss out on the whole journey progression. However, we made the decision that we made because we realize users might at that exact moment feel like there are more suitable quests in playground and we don’t want to discourage users to abandon the app/exercises because the given quests options are not appealing to them. 

Key Decision 4: (Product-level) 

Users are given the option to be paired with an anonymous user they don’t know randomly in a group. The alternative to this decision will be users cannot be paired with an anonymous user. The argument for this alternative is users will be less engaged if their accountability buddy is anonymous and the chance of their communication and interaction is a lot slimmer which defeats the purpose of the accountability buddy. However, we chose the reverse option as we believe at the end of the day having a buddy is better than not having one and it might drive users to meet new friends through the app.

Key Decision 5: (Product-level) 

Users able to give an encouraging nudge to an accountability buddy if they haven’t done an exercise in 4 days. The alternative to this decision will be users are unable to nudge an accountability buddy. The argument for this alternative is users might feel the app is intrusive if users can receive a notification through the app from an accountability buddy if they haven’t done an exercise and it might annoy users and make them feel their action in the app is being monitored too closely. We decided to give the users an nudge option because we feel like there should be a tool to make each other accountable or else it would defeat the purpose of the accountability buddy system, however, we set it to 4 days of no exercise before an user can nudge as we feel this is a reasonable time interval that would be effective but not too intrusive. 
