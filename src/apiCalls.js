// function getDataRequest(type) {
//     return fetch(`http://localhost:3001/api/v1/${type}`)
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
// }

function getTravelerApiData() {
    return fetch("http://localhost:3001/api/v1/travelers")
        .then((response) => response.json())
        .catch((err) => console.log(err));
}

function getTripsApiData() {
    return fetch("http://localhost:3001/api/v1/trips")
        .then((response) => response.json())
        .catch((err) => console.log(err));
}

function getDestinationsApiData() {
    return fetch("http://localhost:3001/api/v1/destinations")
        .then((response) => response.json())
        .catch((err) => console.log(err));
}

export { getTravelerApiData, getTripsApiData, getDestinationsApiData };
