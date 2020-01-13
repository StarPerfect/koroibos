const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('olympians')
    .select()

const totalMedals = (name) => database('olympians')
    .where('Name', name)
    .then((data) => {
        let medalCount = 0;
        data.forEach(function (event) {
            if (event['Medal'] != 'NA') {
                medalCount++
            }
        })
        return medalCount;
    });

module.exports = {
    all,
    totalMedals
};