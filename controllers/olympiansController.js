const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Olympian = require('../models/olympian');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

async function editedOlympian(individual) {
    let medalCount = await Olympian.totalMedals(individual['Name'])
    let edited = {
        "name": individual['Name'],
        "team": individual['Team'],
        "age": individual['Age'],
        "sport": individual['Sport'],
        "total_medals_won": medalCount
       }
    return edited;
};

async function editedOlympians(olympiansArray) {
    const limitedDetailsOlympians = [];
    await asyncForEach(olympiansArray, async (olympian) => {
        let edited = await editedOlympian(olympian)
        limitedDetailsOlympians.push(edited)
    })
    return limitedDetailsOlympians;
};

async function dbCall() {
    let allOlympians = await database('olympians').select()
    let final = await editedOlympians(allOlympians)
    return final;
};

const index = async (request, response) => {
    if (request.query.age) {
        if (request.query.age === 'youngest') {
            database('olympians')
                .orderBy('Age', 'ASC')
                .limit(1)
                .then(async (youth) => {
                    let edited = await editedOlympian(youth)
                    return edited;
                })
                .then((youngest) => {
                    response.status(200).json(youngest);
                })
        } else if (request.query.age === 'oldest') {
            database('olympians')
                .orderBy('Age', 'DESC')
                .limit(1)
                .then(async (elder) => {
                    let edited = await editedOlympian(elder)
                    return edited;
                })
                .then((oldest) => {
                    response.status(200).json(oldest);
                })
        }
    } else {
        let waitingGame = await dbCall()
            .then((editedArray) => {
                let olympians = {
                    "olympians": editedArray
                }
            return olympians;
        })
        .then((olympians) => response.status(200).json(olympians))
    }
};

module.exports = {
    index
};