const environment = process.env.NODE_ENV || 'development';

const data = require("../../data/events.js");

exports.seed = (knex) => {
  return knex('events').del()
    .then(() => {
      let allThings = []
      data.forEach(event => {
        allThings.push(createSportEvent(knex, event))
      })
      return Promise.all(allThings)
    })
};


const createSportEvent = (knex, element) => {
  return knex('events').insert({
    Sport: element['Sport'],
    Event: element['Event']
  })
};