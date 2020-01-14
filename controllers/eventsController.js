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
        .distinct('Sport') // this give me an array of {sport: something}, iterate over and add array of events?
        .then( async (data) => {
            let waitingGame = await sportsWithEvents(data)
            return waitingGame;
        })
        .then((eventsBySport) => response.status(200).json(eventsBySport))
}

module.exports = {
    index
};