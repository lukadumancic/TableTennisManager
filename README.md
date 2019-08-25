# TableTennisManager

## About

Web application for managing table tennis results

## Technologies

* Backend
  NodeJS, Express server and Mongoose ODM, Typescript
  
* Database
  MongoDB
  
* Frontend
  AngularJS, RxJS, Typescript

## Live version

Visit [Heroku hosted version](https://table-tennis-manager.herokuapp.com/)

## Local Version

Running application locally requires 3 key parts
* Running MongoDB server
  Insert MongoDB URI in config/dev.ts
  `mongoURI: 'your_mongodb_uri'`
* Starting backend Node server after installing node modules using Node version 12 and above
  `npm install && npm run dev`
* Starting frontend Angular application
  `npm install && npm start`
 
***Important note***
Backend server port is set to 3000 and frontend server to 4200.
Check if other applications are using these ports in case of error.
