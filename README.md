<img src="./readme/title1.svg"/>
<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> An IoT-based Garbage Collection System that employs sensors within waste bins to monitor their fill levels. The data from these bins are analyzed using AI to generate actionable insights and recommendations.
>
> Bin Tracker aims to decrease the consumption of fuel by garbage trucks and help cities become more eco-friendly.

### User Stories

- As an admin, I want to view the bins on an interactive map.
- As an admin, I want to view real-time and historical data on bins fill levels to generate reports and make decisions based on data.
- As a user, I want to have a real-time route suggestion on a map for me to follow and reduce unnecessary trips.
- As a super admin, I want to manage user accounts so that they can access the website.
- As an admin, I want to manage the bins, so that their data stays accurate.
- As an admin, I want to manage the trucks so that I can track their details on my dashboard.
- As an admin, I want to communicate with users using text messages so that we maintain live support.
- As a user, I want to view my truck details so that I keep track of its maintenance schedule.

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> we designed Bin Tracker using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes (Web - Admin)

| Bins Map screen  | Dashboard screen |  Bin Management screen |
| ---| ---| ---|
| ![Landing](./readme/wireframes/web/map.png) | ![Admin Dashboard](./readme/wireframes/web/dashboard.png) | ![User Management](./readme/wireframes/web/bin_crud.png) |

| Truck Management screen  | Chats screen |  Announcements screen |
| ---| ---| ---|
| ![User Management](./readme/wireframes/web/trucks_crud.png)| ![Bin Management](./readme/wireframes/web/chats.png)| ![Truck Management](./readme/wireframes/web/announcements.png)|

### Wireframes (Mobile - User)

| Map screen  | Truck screen |  Chats screen |
| ---| ---| ---|
| ![Map](./readme/wireframes/mobile/map.png)| ![Truck](./readme/wireframes/mobile/truck.png)| ![Chats](./readme/wireframes/mobile/chats.png)|

### Mockups

| Map screen  | Dashboard screen |  Bin Management screen |
| ---| ---| ---|
| ![Map](readme/mockups/web/map.png)| ![Map](./readme/mockups/web/dashboard.png)| ![Map](./readme/mockups/web/bin_crud.png)|

| Truck Management screen  | Announcements screen |  Chats screen |
| ---| ---| ---|
| ![Map](./readme/mockups/web/truck_crud.png)| ![Map](./readme/mockups/web/announcements.png)| ![Map](./readme/mockups/web/chats.png)|

<!-- Implementation -->
<!-- <img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Coffee Express app with the following features: 

### User Screens (Mobile)

| Login screen  | Register screen | Landing screen | Loading screen |
| ---| ---| ---| ---|
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen  | Menu Screen | Order Screen | Checkout Screen |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | 

### Admin Screens (Web)

| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br> -->

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

### Bin Tracker is built using the following technologies

1) MERN Stack using TypeScript for the web application
	- ["React Library"](https://react.dev/) for the webapp frontend development. It is a robust JavaScript library for building reusable UI components.
	- ["React Redux Library"](https://react-redux.js.org/) for state management.
	- ["Express.js Framework"](https://expressjs.com/) on [Node.js](https://nodejs.org/en) runtime environment for the backend server.
	- ["MongoDB"](https://www.mongodb.com/) for the database. It is an open source NoSQL database management system.
2) Flutter Framework for the app
	- This project uses the [Flutter app development framework](https://flutter.dev/) for the mobile application. Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
	- To send push notifications, the app uses [Firebase](https://firebase.google.com/) which is a backend-as-a-service from google that offers tons of features.
	- The app uses the font ["Poppins"](https://fonts.google.com/specimen/Poppins) as its main font, and the design of the app adheres to the material design guidelines.


<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Bin Tracker locally, follow these steps:

## Web App
### Prerequisites (Windows)

- Node.js & npm
	1) Follow the instructions on this link to setup Node.js: https://www.geeksforgeeks.org/installation-of-node-js-on-windows/


- MongoDB
	1) Follow the instructions on this link to setup MongoDB: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition


### Installation (Windows)


1) Clone the repo

   ```sh
   git clone https://github.com/amr-hammoud/bin-tracker.git
   ```

	The project folders consists of 4 subfolders:
	- "App" which contains the Flutter App
	- "Server" which contains the Express Server using Node.js
	- "Web" which contains the React Web App
	- "readme" which contains the files related to the readme.md

2) Install NPM packages
	You need to install the NPM packages in both "Server" & "Web"
	navigate to each folder then run this command

   ```sh
   npm install
   ```

3) Setup the .env file
	- Navigate to /bin-tracker/Server
	- Rename the file named ".env.example" to ".env"
	- Replace the "ADD_YOUR_KEY_HERE" with you JWT key
	```sh
	JWT_SECRET="ADD_YOUR_KEY_HERE"
	```

4) Launch the server
	- Navigate to /bin-tracker/Server/
	- Run this command	
	```sh
	npm run dev
	```

5) Launch the app
	- Navigate to /bin-tracker/Web/
	- Run this command	
	```sh
	npm run dev
	```

6) Now the web app should be running, you can login to the app using:
	1) For the super admin:
		- username: super_admin
		- password: password
	
	2) For the admin:
		- username: admin
		- password: password


## Mobile App

### Prerequisites
In Order to use the app you need to
1) Have the web app setup and running
2) Create an account for the driver using the super admin account

### Installation
#### On Android Phones:
1) Download the ".apk" file from this link (will be added soon)
2) Install the ".apk" file
3) Make sure to have