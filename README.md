# Recruitment Application
This is a prototype of a web based application that was built to prove the various architectural decisions made by the group as part of the course IV1201 at the Royal Institute of Technology in Kista, Stockholm. 
The finished application is supposed to handle the recruitment process of an undisclosed amusement park.

The application is live and running on [Heroku](https://recruitment-app-dev.herokuapp.com/)  

## Run locally

In the root directory:

Linux:
```
PORT=3001 npm start (linux)
set PORT=3001 npm start (windows)
```
Windows:
```
set PORT=3001
npm start
```
This project also includes a simple React web client. Run the client from the client directory:
```
npm start
```

Starting the server creates all the necessary tables.
Content for a local database is found in the db-scripts directory.
Read the documentation for help with database configuration. 

## API Reference and documentation
Please visit the [wiki pages](https://github.com/ralvarezkth/IV1201/wiki)
