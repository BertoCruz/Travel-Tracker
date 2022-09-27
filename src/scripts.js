import "./css/styles.css";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";
import { getTravelerApiData, getTripsApiData, getDestinationsApiData } from "./apiCalls";

let currentTraveler, allTravelers, loginID, trips, destinations, travelersData, tripsData, destinationsData;
let loggedIn = false;

function instantiateAllData() {
    Promise.all([getTravelerApiData(), getTripsApiData(), getDestinationsApiData()]).then(
        (data) => {
            travelersData = data[0].travelers;
            tripsData = data[1].trips;
            destinationsData = data[2].destinations;
            // console.log("TRAVELERS DATA====",travelersData);
            // console.log("TRIPS DATA=====", tripsData);
            // console.log("DESTINATIONS DATA======", destinationsData);
            // currentTraveler = new Traveler(
            //     travelersData[Math.floor(Math.random() * travelersData.length)]
            // );
            if(loggedIn){
                currentTraveler = new Traveler((travelersData[loginID]))
            }
            allTravelers = new Traveler(travelersData);
            trips = new Trips(tripsData);
            destinations = new Destinations(destinationsData);
            loadTraveler();
        }
    );
}

//query selectors
const loginForm = document.querySelector("#loginForm");
const welcomeMessage = document.querySelector("#welcomeMessage");
const upcomingTrips = document.querySelector("#upcomingTrips");

//event handlers
window.addEventListener("load", instantiateAllData);
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginData = new FormData(e.target);
    console.log(loginData.get("username-value"));
    const travelID = loginData.get("username-value");
    console.log(trips.checkIfUserExists(travelID.slice(8)));
});


//render to DOM
function loadTraveler() {
    renderWelcomeMessage();
    // renderUpcomingTrips();
}

function renderWelcomeMessage() {
    welcomeMessage.innerHTML = `
    <section class="welcome">Welcome Back ${currentTraveler.getFirstName()}</section>`;
}

function renderUpcomingTrips() {
    upcomingTrips.innerHTML = ``;
}

