// function cleanLastfmRecentTracks(data) {
//     return data.recenttracks.track.map(track => {
//         return {
//             artist: track.artist['#text'],
//             song: track.name
//         }
//     })
// }

// function filterLastfmRecentTracks(data) {
//     return data.recenttracks.track.filter(track => {
//         return track.artist['#text'] === 'The Flashbulb'
//     })
// }

// function reduceLastfmRecentTracks(data) {
//     return data.recenttracks.track.reduce((accumulator, track) => {
//         return accumulator + track.artist['#text'] + ', '
//     }, '')
// }

// // Get the data from lastFM
// fetch('http://ws.audioscrobbler.com/2.0/?' + new URLSearchParams({
//         api_key: process.env.LASTFM_API_KEY,
//         format: 'json',
//         limit: 30,
//         method: 'user.getRecentTracks',
//         user: 'ju5tu5nl'
//     }))
//     .then(response => response.json())
//     // Call the above 3 functions right here :)
//     .then(data => console.table(cleanLastfmRecentTracks(data)))
//     .catch(errObj => console.error(errObj))