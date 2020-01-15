const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

async function findEvents(singleSport) {
    let events = await database('events').select('Event').where('Sport', singleSport).distinct();
    return events;
};

async function sportsWithEvents(sportsArray) {
    const finalArray = [];
    await asyncForEach(sportsArray, async (sport) => {
        let sportingEvents = await findEvents(sport['Sport'])
        let finalSportObject = {
            "sport": sport['Sport'],
            "events": sportingEvents
        }
        finalArray.push(finalSportObject)
    })
    return finalArray;
};

const index = (request, response) => {
    database('events')
        .distinct('Sport')
        .then( async (data) => {
            let waitingGame = await sportsWithEvents(data)
            return waitingGame;
        })
        .then((eventsBySport) => response.status(200).json(eventsBySport))
}

const show = (request, response) => {
    let eventId = request.params.id 
    database('events').select('Event').where('id', eventId)
        .then( async (event) => {
            let whatSport = event[0]['Event']
            let medalOlympians = await database('olympians').select('Name', 'Team', 'Age', 'Medal').where('Event', whatSport).whereNot('Medal', 'NA')
            let finalMedalists = {
                "events": whatSport,
                "medalists": medalOlympians
            }
            return finalMedalists;
        })
        .then((medalists) => response.status(200).json(medalists))
        .catch(error => response.status(400).json(error))
}

module.exports = {
    index,
    show
};