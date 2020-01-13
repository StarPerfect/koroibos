# Koroibos

####2016 Summer Olympics Analytical Data

[![Build Status](https://travis-ci.com/turingschool-examples/all-your-base.svg?branch=master)](https://travis-ci.com/turingschool-examples/all-your-base)

## Getting started
To use this repo, you’ll need to `fork` the repo as your own. Once you have done that, you’ll need to run the following command below to get everything up and running. 

#### Installing necessary dependencies
The easiest way to get started is to run the following command. This will pull down any necessary dependencies that your app will require. You can think of this command as something incredibly similar to `bundle install` in Rails. 

`npm install`

#### Set up your local database
You’ll need to figure out a name for your database. We suggest calling it something like `koroibos_dev`.  

To get things set up, you’ll need to access your Postgres instance by typing in `psql` into your terminal. Once there, you can create your database by running the comment `CREATE DATABASE PUT_DATABASE_NAME_HERE_dev;`. 

Now you have a database for your new project.

#### Migrations
Once you have your database setup, you’ll need to run some migrations (if you have any). You can do this by running the following command: 

`knex migrate:latest`


Instructions to create database, run migrations, and seed: 
```
psql
CREATE DATABASE DATABASE_NAME_dev;
\q

knex migrate:latest
knex seed:run
```

#### Set up your test database
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q

knex migrate:latest --env test
```

## Running your tests
Running tests are simple and require you to run the following command below: 

`npm test`

When the tests have completed, you’ll get a read out of how things panned out. Test coverage should be mostly green and above 75%.

## Setting up your production environment
This repo comes with a lot of things prepared for you. This includes production ready configuration. To get started, you’ll need to do a few things. 

- Start a brand new app on the Heroku dashboard 
- Add a Postgres instance to your new Heroku app
- Find the URL of that same Postgres instance and copy it. It should look like a long url. It may look something like like `postgres://sdflkjsdflksdf:9d3367042c8739f3...`.
- Update your `knexfile.js` file to use your Heroku database instance. You’ll see a key of `connection` with a value of an empty string. This is where you’ll paste your new Postgres instance URL. 

Once you’ve set all of that up, you’ll need to `add the remote` to your new app. This should work no differently than how you’ve done it with any Rails project. Adding this remote will allow you to run `git push heroku master`. 

Once you’ve done that, you’ll need to `bash` into your Heroku instance and get some things set up. 

- Run the following commands to get started:
```
heroku run bash
npm install
nom install -g knex
knex migrate:latest
knex seed:run
```

This will install any dependencies, install Knex, and migrate any changes that you’ve made to the database. 

#### How To Use

Since all of these endpoints are GET requests, they can be ran either in a web browser of your choice or in an application such as [Postman](https://www.getpostman.com/downloads/).

`GET /api/v1/olympians`

This will display details for each Olympian in the 2016 Olympics sample data set. There response should be in the following format:

```
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
      {...}
    ]
}
```

`GET /api/v1/olypians?age=youngest`

This will return details for the youngest Olympian competing in the 2016 Summer Games. The response will be in the following format:

```
{
  [
    {
      "name": "Ana Iulia Dascl",
      "team": "Romania",
      "age": 13,
      "sport": "Swimming"
      "total_medals_won": 0
    }
  ]
}
```



