const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Olympian = require('../models/olympian');

const index = (request, response) => {
    Olympian.all()
        .then((array) => {
            let olympians = {
                "olympians": array
            }
            return olympians;
        })
        .then((olympians) => response.status(200).json(olympians))
};

module.exports = {
    index
};