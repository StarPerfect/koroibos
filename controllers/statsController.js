const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

let statsPojo = require('../models/stats');

async function statsData() {
    let totalCount = await database('olympians').count('id');
    let actualCount = await totalCount[0].count
    let maleWeight = await database('olympians')
        .where('Sex', 'M')
        .whereNot('Weight', '0')
        .select(database.raw('ROUND(AVG("Weight"), 1) AS "avg"'))
    let maleRounded = await maleWeight[0].avg
    let femaleWeight = await database('olympians')
        .where('Sex', 'F')
        .whereNot('Weight', '0')
        .select(database.raw('ROUND(AVG("Weight"), 1) AS "avg"'))
    let femaleRounded = await femaleWeight[0].avg
    let avgAge = await database('olympians')
        .select(database.raw('ROUND(AVG("Age"), 1) AS "avg"'))
    let ageRounded = await avgAge[0].avg
    let OlympianStats = new statsPojo(actualCount, maleRounded, femaleRounded, ageRounded);
    return OlympianStats;
}

const show = (request, response) => {
    statsData()
        .then((stats) => response.status(200).json(stats))
}

module.exports = {
    show
}