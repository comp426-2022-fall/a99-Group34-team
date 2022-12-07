- [Cookies Simulator](#cookies-simulator)
    - [`Final Project Group 34`](#final-project-group-34)
  - [Summary](#summary)
  - [To Run](#to-run)
  - [API Specifications](#api-specifications)
  - [Default Admin User](#default-admin-user)
  - [Editing Profile](#editing-profile)
  - [Two Modes Supported ("light" and "dark")](#two-modes-supported-light-and-dark)
    - [`Light`-mode](#light-mode)
    - [`Dark`-mode](#dark-mode)
  - [Roles and Tasks](#roles-and-tasks)
  - [Deliverables](#deliverables)
  
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

## API Specifications

See details at [`/docs/api`](https://github.com/comp426-2022-fall/a99-Group34-team/tree/main/docs/api.md). 

## Default Admin User

Upon initial set up, an `admin` user is available for creating "cookies". 

<img width="795" alt="image" src="https://user-images.githubusercontent.com/55526292/206082209-1969c1e9-c860-4217-8097-48ae7ca7877b.png">

Once a few cookies have been generated for user to retrieve, `admin` as well as `non-admin` users can click the **"spinning cookie"** icon on the landing page to receive one of them at **RANDOM**.

The `admin` can also review all `non-admin` users within the Database and the cookies they had received before.

Both **creating 'cookies'** and **reviewing `non-admin` user interactions** are `admin`-specific actions.


## Editing Profile

ALL users can edit details regarding their profile, including `username`, `password`, and `email`. 

<img width="818" alt="image" src="https://user-images.githubusercontent.com/55526292/206083631-2a48ee4c-2471-479e-af04-2c6044e7e25d.png">

The change will go through **only when** all THREE of the current profile details are a match.


## Two Modes Supported ("light" and "dark")

### `Light`-mode
<img width="1433" alt="image" src="https://user-images.githubusercontent.com/55526292/206083284-644dbcc0-6ac5-4cdd-bb92-01100127bcf8.png">

### `Dark`-mode
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/55526292/206083369-2b62a71d-b154-43ad-b2db-13a319780db2.png">

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


