import "./css/styles.css";
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";
import { getTravelerApiData, getTripsApiData, getDestinationsApiData } from "./apiCalls";

let currentTraveler, allTravelers, loginID, trips, destinations, travelersData, tripsData, destinationsData;
let loggedIn = true;

function instantiateAllData() {
    Promise.all([getTravelerApiData(), getTripsApiData(), getDestinationsApiData()]).then(
        (data) => {
            travelersData = data[0].travelers;
            tripsData = data[1].trips;
            destinationsData = data[2].destinations;
            console.log("TRAVELERS DATA====",travelersData);
            console.log("TRIPS DATA=====", tripsData);
            console.log("DESTINATIONS DATA======", destinationsData);
            // currentTraveler = new Traveler(
            //     travelersData[Math.floor(Math.random() * travelersData.length)]
            // );
            allTravelers = new Traveler(travelersData);
            if(loggedIn){
                currentTraveler = new Traveler((travelersData[loginID]))
                trips = new Trips(tripsData);
                destinations = new Destinations(destinationsData);
                loadTraveler();
            }
        }
    );
}

//query selectors
const login = document.querySelector("#login");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const welcomeMessage = document.querySelector("#welcomeMessage");
const mainTrips = document.querySelector("#mainTrips");
const upcomingTrips = document.querySelector("#upcomingTrips");
const destinationsScroll = document.querySelector("#destinationsScroll")

//event handlers
window.addEventListener("load", instantiateAllData);
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginData = new FormData(e.target);
    // console.log(loginData.get("username-value"));
    // const travelID = loginData.get("username-value");

    // showHideLoginForm();
    if (
        verifyLogin(loginData.get("username-value"), loginData.get("password-value")) === `invalid`
    ) {
        e.target.reset();
    } 
    
});


//render to DOM
function verifyLogin(username, password) {
    let idValidation;
    if (!username.includes("traveler")){
        loginMessage.innerHTML = "* username not found, please try again.";
        return `invalid`;
    } else if (password !== "travel"){
        loginMessage.innerHTML = "* incorrect password, please try again.";
        return `invalid`;
    } else if (username.includes("traveler") && password === "travel") {
        loginMessage.innerHTML = "";
        idValidation = allTravelers.checkIfTravelerExists(parseInt(username.slice(8)));
    }

    if (idValidation === `Traveler ID ${parseInt(username.slice(8))} exists.`) {
        loginID = parseInt(username.slice(8));
        loggedIn = true;
        instantiateAllData();
        showHideLoginForm();
        return;
    } else if (idValidation === `Traveler ID ${parseInt(username.slice(8))} does not exist.`) {
        loginMessage.innerHTML = `* ${username} not found, please try again.`;
        return `invalid`;
    }

}

function showHideLoginForm() {

    // console.log(welcomeMessage.classList.value.includes("hidden"));
    if (welcomeMessage.classList.value.includes("hidden")) {
        login.classList.add("hidden");
        welcomeMessage.classList.remove("hidden");
        mainTrips.classList.remove("hidden");
    } else if (login.classList.value.includes("hidden")) {
        welcomeMessage.classList.add("hidden");
        mainTrips.classList.add("hidden");
        login.classList.remove("hidden");
    }
};

function loadTraveler() {
    renderWelcomeMessage();
    renderUpcomingTrips();
    displayDestinations();
}

function renderWelcomeMessage() {
    if(loggedIn){
        welcomeMessage.innerHTML = `
        <section class="welcome">Welcome Back ${currentTraveler.getFirstName()}</section>`;
    }
}

function renderUpcomingTrips() {
    if(loggedIn){
        const upcoming = trips.getAllUpcomingApprovedTrips(currentTraveler.id, "2022/09/27");
        console.log(upcoming);
        upcomingTrips.innerHTML = `
        `;
    }
}

function displayDestinations() {
    destinations.destinationsData.forEach((dest) => {
        destinationsScroll.innerHTML += `
            <figure class="scroll">
                <img class="destination-img" src="${dest.image}" alt="${dest.alt}"></img>
                <div class="info">
                <figcaption class="destination-name"> ${dest.destination} </figcaption>
                <p class="figure-info">  $${dest.estimatedLodgingCostPerDay} night</p>
                <p class="figure-info"> $${dest.estimatedFlightCostPerPerson} flights Per Person </p>
                </div>
            </figure>`;
    });
}

