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
                    // console.log(snapshot[i]["predicted_time"])
                    var date = new Date(snapshot[i]["predicted_time"] *1000);
                    console.log(date);
                    var object = {
                        time: (`${date.getHours()}:${date.getMinutes()}`),
                        match: snapshot[i]["match_number"],
                        blue: snapshot[i]["alliances"]["blue"]["team_keys"].map(x => x.replace('frc', '')),
                        red: snapshot[i]["alliances"]["red"]["team_keys"].map(x => x.replace('frc', ''))
                    }
                    // console.log(moment(snapshot[i]["predicted_time"]).format("h:mm"));
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