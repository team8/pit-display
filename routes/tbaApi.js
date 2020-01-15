const request = require('request');
const moment = require('moment');

function pathData(path) {
    return new Promise((resolve, reject) => {
        var list = {
            url: `https://www.thebluealliance.com/api/v3${path}`,
            method: 'GET',
            headers: {
                'X-TBA-Auth-Key': 'oSSXMWPE2jOJrLTYpgMvgP5BTvbtOJRwR6LSv1ytb0g5FS6RlaWBx70Pw0B8cwvA'
            }
        };
        request(list, function (err, res, body) {
            resolve(JSON.parse(body));
        });
    });
};

function matchData(eventId) {
    return new Promise((resolve, reject) => {
        pathData(`/event/${eventId}/matches`).then(snapshot => {
            var array = [];
            for (var i in snapshot) {
                if ("qm" == snapshot[i]["comp_level"]) {
                    var date = new Date(snapshot[i]["predicted_time"] *1000);
                    var alliancesBlue = snapshot[i]["alliances"]["blue"]["team_keys"].map(x => x.replace('frc', ''));
                    var alliancesRed = snapshot[i]["alliances"]["red"]["team_keys"].map(x => x.replace('frc', ''))
                    
                    if(date.getMinutes() < 10){
                        var official = `${date.getHours()}:0${date.getMinutes()}`
                    }else{
                        official = `${date.getHours()}:${date.getMinutes()}`
                    }
                    var object = {
                        time: official,
                        match: snapshot[i]["match_number"],
                        blue1: alliancesBlue.splice(0, 1),
                        blue2: alliancesBlue.splice(1, 2),
                        blue3: alliancesBlue.splice(-1),
                        red1: alliancesRed.splice(0, 1),
                        red2: alliancesRed.splice(1, 2),
                        red3: alliancesRed.splice(-1)
                    }
                    array.push(object);
                }
            }
            resolve(array);
        })
    })
}
matchData('2019casj').then(snapshot => {
    console.log(snapshot)
})

// function eventList(eventKey) {
//     return new Promise((resolve, reject) => {
//         pathData(`/event${eventKey}/teams`).then(snapshot => {
//             teams = [];
//             for (var i in snapshot) {
//                 teams.push(snapshot[i]["team_number"]);
//             }
//             resolve(teams);
//         });
//     })
// };
// eventList('/2020ohmv').then(snapshot => {
//     console.log(snapshot);
// });

// function eventCheck(eventId) {
//     return new Promise((resolve, reject) => {
//         pathData(`/event/${eventId}/matches/simple`).then(snapshot => {
//             if ("Errors" in snapshot) {
//                 resolve(false);
//             }
//             else {
//                 resolve(snapshot);
//             }
//         })
//     })
// }
// eventCheck('bad').then(snapshot => {
//     console.log(snapshot);
// })

// function eventRankings(eventId) {
//     return new Promise((resolve, reject) => {
//         pathData(`/event/${eventId}/rankings`).then(snapshot => {
//             rankings = [];
//             for (var i in snapshot["rankings"]) {
//                 rankings.push(snapshot["rankings"][i]["team_key"]);   
//             }
//             resolve(rankings);
//         });
//     })
// }
// eventRankings('2019casj').then(snapshot => {
//     console.log(snapshot);
// })

exports.matchData = matchData
exports.pathData = pathData