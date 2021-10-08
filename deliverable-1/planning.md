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
* Have experience building the backend of a web app using spring boot
* Have experience on working on database using MySQL and SQLite
* Have experience on basic machine learning skills
	Weaknesses:
* Lack of experience of react-native and frontend
* Lack of experience of implementing CI/CD 
* Lack of experience of Style Sheet language

Calvin Chu:
I will mainly be responsible for the backend of the application. Main features that I will be involved in implementing are the “forget password” feature and automatically login. I would also be focusing on enhancing the administrator's control of the app, including uploading pictures and videos for quests, and viewing app usage’s data and statistics. 
My strengths include having experience from my internship and personal project of working with Django framework, react.js, node.js and implementing data structure and algorithms to solve problems concerning an application. My Weaknesses include lack of experience in style sheet language that are used to describe the presentation of the application, setting up CI/CD pipeline and testing with react native and node.js.

Grace Li: 
Roles: Implementing automatic login, writing and organizing meeting agendas and minutes
Strengths: 
Have experience with Django REST framework
Have experience with designing schemas for databases and implementing
Have experience with writing tests (mostly manual and some automated)
Weaknesses: 
Lack experience in JavaScript
Lack experience in using CI/CD solutions
Lack experience in style sheet languages

Yunhan Lei (Eve):
Role: Implementing a quest playground and chat features for the technical side, promoting communication within group and setting up meeting time
Strengths: 
1) Have worked full-stack for multiple projects
2) Familiarity with JavaScript and experience with React
3) Experience with databases like Firebase, PostgresSQL, SQLite, etc.
Weaknesses: 
1) Lack of experience in styling the application using CSS and Style Sheet language
2) Lack of experience of writing tests and implementing DevOps environment
3) Lack of experience of working with a large group

Xinpeng Shan(Joy)
Role: Implementing Quest playground and chat features, will help with UI design and any problems other team members run into
Strengths: 
Some experience in backend development in Java using Spring Boot
Some experience in frontend development using JavaScript, html, css in building web applications using Vue framework. UI design experience in a personal project
Have data science background in Python
Weaknesses:
Lack of experience in react native
Lack of experience in testing
Have little experience in database like SQL

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

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
