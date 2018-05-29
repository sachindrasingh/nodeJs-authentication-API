# nodeJs-authentication-API

A basic Node.js authentication API using [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

This application create for [Login-Logout-Workflow-Code-Test](https://github.com/sachindrasingh/Login-Logout-Workflow-Code-Test).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/), [MongoDB](https://www.mongodb.com/) and the [Heroku CLI](https://cli.heroku.com/) installed.

Start your mongo server and add full path in `url` variable on line number 6. And create a DB name `teamstar`. Than create collection `user`. Inside `user` create below documents.
```sh
{
    "email": "Your Usear Id",
    "pwd": "$2a$10$d2APPvKJ4FH85EbQAmkdle2M2yBtSIn2WC0eaaR2SRXYwcCnDGVOe",
    "name": "Your Name",
    "gender": "Your Gender",
    "DOB": "Date of berth (DD/MM/YYYY)"
}
```
Note: pwd contains password `admin@123` in encrypted formate. Use the same encrypted value `$2a$10$d2APPvKJ4FH85EbQAmkdle2M2yBtSIn2WC0eaaR2SRXYwcCnDGVOe` while creating document.   

```sh
$ git clone git@github.com:sachindrasingh/nodeJs-authentication-API.git # or clone your own fork
$ cd nodeJs-authentication-API
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).


