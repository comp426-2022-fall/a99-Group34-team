# Roadmap and Requirements

1. Back-end specifications
	1. API built on whatever framework you choose. You can build an API that interacts with other APIs as well in order to integrate them.
	2. API root endpoint at `http://HOST/app/`.
	4. Create (if nonexistent) and interact with a database of users and interactions (this can be logs, even). If users do not need to login to use your app, then do not worry about a user DB. These can be separate databases for different microservices or separate tables in one database. It is up to your team's decisions.
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
