# Task Manager App

- Simple REST API Authentication and Authorization system
- Using NodeJS, Express and, MongoDB 
- User can register, login and, logout 
- Each user can access only his tasks, update them and delete them and a
  can't access other users tasks.


## Available features

- Sign Up   **method: POST   path:'/users'**
- Login     **method: POST   path:'/users/login'**
- Logout    **method: POST   path:'/users/logout'**

- Get all user tasks   **method: GET   path:'/tasks'**
- Get single task      **method: GET   path:'/tasks/:id**
- Update task          **method: PATCH   path:'/tasks/:id**
- Delete task          **method: DELETE   path:'/tasks/:id**


## Install Dependencies

- npm install

## Usage

- after installing dependencies
- create **.env** file with these three variable (mongodburl, PORT, jwtSecret) and assign your values to them.
- for testing mode: create **test.env** file with these three variable (mongodburl, PORT, jwtSecret) and assign your values to them.
- use postman or any similer software to access the api in local machine.


## Run App

# Run in development mode
- npm run dev

# Run in test mode
- npm run test:users
- npm run test:tasks
- npm run test

## Deployment & Documentation
- this app was deployed on heroku
- Postman documentation:  
- https://documenter.getpostman.com/view/8432033/UVJWpzbs


# Access
- DB is on mongoDB server and you can use this **email: testuser@example.com Password:55555** to get access for Login and get token to access all routes.


