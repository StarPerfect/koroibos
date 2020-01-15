# Koroibos
#### 2016 Summer Olympics Analytical Data

[![Build Status](https://travis-ci.com/StarPerfect/koroibos.svg?branch=master)](https://travis-ci.com/StarPerfect/koroibos)
 
1. [Introduction](#intro)
1. [Initial Setup](#setup)
1. [Test Suite](#testing)
1. [How to Use](#use)
1. [Known Issues](#issues)
1. [How to Contribute](#contribute)
1. [Core Contributors](#contributors)
1. [Schema Design](#schema)
1. [Tech Stack](#stack)

## Introduction <a name="intro"></a>
This application is a coding challenge for the mock interview process with Koroibos. The app utilizes this [csv data](https://github.com/StarPerfect/koroibos/blob/master/db/data/data.csv) to expose particular analytics for the 2016 Summer Olympic Games. Here are the [requirements](https://github.com/turingschool/backend-curriculum-site/blob/gh-pages/module4/projects/take_home_challenge/prompts/olympic_spec.md) as well as the [rubric](https://backend.turing.io/module4/projects/take_home_challenge/take_home_challenge_rubric) on which the application is evaluated against. You can also view my [Agile Board](https://github.com/StarPerfect/koroibos/projects/1) to see my Git workflow.

## Initial Setup <a name="setup"></a>
To use this repo, you’ll need to `fork` the repo as your own. Once you have done that, you’ll need to run the following command below to get everything up and running. 

#### Installing necessary dependencies
The easiest way to get started is to run the following command. This will pull down any necessary dependencies that your version of the app will require. 

`npm install`

#### Set up your local database
You’ll need to figure out a name for your database. We suggest calling it something like `koroibos_dev`.  

To get things set up, you’ll need to access your Postgres instance by typing in `psql` into your terminal. Once there, you can create your database by running the comment `CREATE DATABASE PUT_DATABASE_NAME_HERE_dev;`. 

#### Migrations & Seeding
Once you have your database setup, you’ll need to run some migrations and seed the database. 

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
knex seed:run --env test
```

## Test Suite <a name='testing'></a>
Running tests are simple and require you to run the following command below: 

`npm test`

When the tests have completed, you’ll get a read out of how things panned out. There are 4 test suites and 8 total tests. All should be passing and the overall coverage should be at 97.24%.

## How To Use <a name="use"></a>
Since all of these endpoints are GET requests, they can be ran either in a web browser of your choice or in an application such as [Postman](https://www.getpostman.com/downloads/). If you want to hit the endpoints without going through a local setup, you can utilize the Production environment. The URL is [http://koroibos-node.herokuapp.com/](http://koroibos-node.herokuapp.com/).

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

`GET /api/v1/olympian_stats`

This endpoint provides some overall statistics from all participating Olympians of the 2016 Summer Games. Details are total number of participants, average weight in kg for both females and males, and the average age. Expected response should be in the following format:

```
  {
    "olympian_stats": {
      "total_competing_olympians": 3120
      "average_weight:" {
        "unit": "kg",
        "male_olympians": 75.4,
        "female_olympians": 70.2
      }
      "average_age:" 26.2
    }
  }
```

`GET /api/v1/events`

This endpoint provides a list of all the sports in the 2016 Summer Olympics and all the events in that sports category. The response will look this the following:

```
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}
```

`GET /api/v1/events/:id/medalists`

The final endpoint in this app is an extensions of the Events resource. This gives you a list off all the Olympic medalists for the particular event in the 2016 Summer Games. Details provided are the Olympian's name, age, team, and medal won. Here is an example of the response: 

```
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```

## Known Issues <a name="issues"></a>
The only known issues are with the format of the youngest and oldest Olympian response. This application currently has the correct Olympian details but they are not in arrays inside a hash/object. Above in [How to Use](#use) shows the expected output. Below are the current responses:

```
{
    "name": "Ana Iulia Dascl",
    "team": "Romania",
    "age": 13,
    "sport": "Swimming",
    "total_medals_won": 0
}
```

```
{
    "name": "Julie Brougham",
    "team": "New Zealand",
    "age": 62,
    "sport": "Equestrianism",
    "total_medals_won": 0
}
```

## How to Contribute <a name="contribute"></a>

If you'd like to contribute to this app, please submit a 'compare across forks' [Pull Request](https://github.com/StarPerfect/koroibos/compare) with your contributions. In the PR notes, provide detailed information on the functionality you are submitted. Use the [PR Template](https://github.com/StarPerfect/koroibos/blob/master/.github/pull-request-template.md) included in the repo.

## Core Contributors <a name="contributors"></a>

#### [Corina Allen](https://github.com/StarPerfect)
[LinkedIn](https://www.linkedin.com/in/corina-allen/)

## Schema Design <a name="schema"></a>
![Koroibos Schema Diagram](https://user-images.githubusercontent.com/47605558/72395834-090f2c00-36f8-11ea-9c6f-6193f7172a68.png)

## Tech Stack <a name="stack"></a>
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Postgres](https://www.postgresql.org/)
- [Heroku](http://www.heroku.com/)