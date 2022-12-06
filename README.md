* Placeholder for Table of Contents

# Cookies Simulator
---
### `Final Project Group 34`

## Summary 
A blueprint full-stack web app simulating receiving browser cookies from an API. Featuring user authentication on the backend implemented through generating and verifying JWT tokens on HTTP requests, React frontend adhering to atomic design principles with a "light" and "dark" mode.

Users with admin access can set the key and values of browser cookies regular users receive, and only logged in users can receive cookies. The admin user is created upon initial set up of the application, the instructions for which is under [`To Run`](#to-run).

## To Run

1. Start the backend API server on PORT 5555

```bash
cd backendServer

npm i

npm test
```

2. Start the frontend React web app on PORT 3000

```bash
cd frontendClient

npm i

npm start
```


## Two Modes Supported ("light" and "dark")

### `Light`
<img width="937" alt="image" src="https://user-images.githubusercontent.com/55526292/205512901-50c2b755-9244-4157-a3ba-5e586ce9979a.png">

### `Dark`
<img width="937" alt="image" src="https://user-images.githubusercontent.com/55526292/205512912-9f956767-2c95-4675-8c2b-5e4486ce2940.png">


## Roles and Tasks

```json
"Roles and Tasks": {
    "Review manager": "Jen Chen @daqichen",
    "Plan manager": "Noe Brown @noebrown",
    "Documentation manager": "Jen Chen @daqichen",
    "Release manager": "Jad Jarkas @JadJ23",
    "Project manager": "Reshmasai Malleedi @malleedi",
    "Leads": 
    {
        "Front end lead": "Reshmasai Malleedi @malleedi",
        "Back end lead": "Jen Chen @daqichen",
        "Database lead": "Jad Jarkas @JadJ23",
        "Design lead": "Jen Chen @daqichen",
        "Testing lead": "Noe Brown @noebrown",
        "Etc":,
    }
}
```
    
## First steps (from Instructions)

Other steps that you will need to take after your team has accepted the assignment:

1. Choose a license and update the LICENSE file accordingly. 
2. Edit this README.md file and use it as the main location of your technical documentation with links out to information contained under `/docs/`.
3. Create a `/docs/` directory for more elaborate documentation of your API, planning notes, etc.
4. Make sure that all of your team members have access to the repository as administrators.
5. Create a project under the **Projects** tab. Use this to manage your planning. Create a To-do list, etc. Explore the tools available and user them to manage your project.
7. Assign team roles and include a listing of those roles in this README.md file or in another file under `/docs/`.
8. Then put your entire development workflow in this repository.
9. Use **Pull requests** to propose changes and incorporate them into your code from various team members. 
10. Use **Issues** to identify and track bugs and also to communicate about various aspects of the project.

## Team mangement (from Instructions)

Some basic roles you will want to consider:

1. A review manager - someone to review pull requests and merge or reject them and manage the related discussions
2. A plan manager - someone to keep an eye on the overall plan and keep the project tab/to-do list up to date
3. A documentation manager - someone to keep the documentation in order and identify what is missing and needs to be documented
4. A release manager - someone to manage the packaging and release process for your prototype package
5. A project manager - someone keeping track of all the moving parts and make sure that everything that needs to happen is happening.
5. Roles for team members to take charge or different parts of the project. Possible roles:
    1. Front end lead
    2. Back end lead
    3. Database lead
    4. Design lead
    5. Etc.

You will notice that there are more roles than people in your group.
That is because you will all be doing a hybrid job of managing a thing while working on other things.

## Deliverables

A GitHub repository in the class organization containing your code and documentation and a prototype release package.
Your project should take the form of a Node package, with all of the attendant items associated with that.
The following three script commands should work in your package:

1. `npm install` - Install dependencies for your package.
2. `npm test` - Start app, check that everything can run, and then stop app.
3. `npm run` - Command to bring up all parts of the app/system's server scripts.

Your team is responsible for incorporating the following specifications and deliverables into your final project:

1. Back-end specifications
	1. API built on whatever framework you choose. You can build an API that interacts with other APIs as well in order to integrate them.
	2. API root endpoint at `http://HOST/app/`.
	4. Create (if nonexistent) and interact with a database of users (optional) and interactions (this can be logs, even). If users do not need to login to use your app, then do not worry about a user DB. These can be separate databases for different microservices or separate tables in one database. It is up to your team's decisions.
	5. Database can be of any type you choose.
2. Front-end specifications
	1. Give users the ability to register an account, update their information, see their information somewhere, and delete their account.
	2. Interactions with the front end should be logged in a database. 
3. Database specifications
	1. User database (if relevant) - registration details (username, email address, etc.)
	2. Interaction database - details of user interactions (login history, access logs, etc.)
4. Documentation
	1. License documenation - Choose a license and include it in the repository just like we have been.
	1. README.md file with basic descriptiong, installation requirements/instructions, dependency list, run instructions
	3. `/docs/` directory containing full documentation of every available API endpoint that you create for your app. This directory shoud also house an archive of your planning documentation. 
	2. Code comments (preferably referring to the documentation)
	3. User instructions in the interface
5. Demo video
	1. In order to get credit for this, add a row to the table in the README here and make a pull request: https://github.com/comp426-2022-fall/a99-demos/edit/main/README.md
7. Self/group evaluation (Individual group members: this is part of the final exam for the course.)


