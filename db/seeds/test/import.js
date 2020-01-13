const environment = process.env.NODE_ENV || 'development';

const olympians = require("../../data/olympians.js");

exports.seed = (knex) => {
  return knex('olympians').del()
    .then(() => {
      let allThings = []
      olympians.forEach(olympian => {
        allThings.push(createOlympian(knex, olympian))
      })
      return Promise.all(allThings)
    })
};


const createOlympian = (knex, element) => {
  return knex('olympians').insert({
    Name: element['Name'],
    Sex: element['Sex'],
    Age: element['Age'],
    Height: element['Height'],
    Weight: element['Weight'],
    Team: element['Team'],
    Games: element['Games'],
    Sport: element['Sport'],
    Event: element['Event'],
    Medal: element['Medal']
  })
};