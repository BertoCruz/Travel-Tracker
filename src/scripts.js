import "./css/styles.css";
const dayjs = require("dayjs");
import Traveler from "./Traveler";
import Trips from "./Trips";
import Destinations from "./Destinations";
import { getTravelerApiData, getTripsApiData, getDestinationsApiData } from "./apiCalls";

let currentTraveler, allTravelers, loginID, trips, destinations, travelersData, tripsData, destinationsData;
let loggedIn = true;
let currentDate = dayjs().format("YYYY/MM/DD").toString();

function instantiateAllData() {
    Promise.all([getTravelerApiData(), getTripsApiData(), getDestinationsApiData()]).then(
        (data) => {
            travelersData = data[0].travelers;
            tripsData = data[1].trips;
            destinationsData = data[2].destinations;
            console.log("TRAVELERS DATA====",travelersData);
            console.log("TRIPS DATA=====", tripsData);
            console.log("DESTINATIONS DATA======", destinationsData);
            allTravelers = new Traveler(travelersData);
            if(loggedIn){
                currentTraveler = new Traveler((travelersData[loginID]))
                // currentTraveler = new Traveler((travelersData[49]))
                // currentTraveler = new Traveler(
                //     travelersData[Math.floor(Math.random() * travelersData.length)]
                // );
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
const upcomingTripsContainer = document.querySelector("#upcomingTripsContainer");
const upcomingTrips = document.querySelector("#upcomingTrips");
const destinationsScroll = document.querySelector("#destinationsScroll")
const scrollDestinations = document.querySelector("#scrollDestinations");
const pastTrips = document.querySelector("#pastTrips");
const travelerInfo = document.querySelector("#travelerInfo");
const userInput = document.querySelector("#userInput");

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
        userInput.classList.remove("hidden")
    } else if (login.classList.value.includes("hidden")) {
        welcomeMessage.classList.add("hidden");
        mainTrips.classList.add("hidden");
        userInput.classList.add("hidden");
        login.classList.remove("hidden");
    }
};

function loadTraveler() {
    renderWelcomeMessage();
    renderUpcomingApprovedTrips();
    renderPastTrips();
    renderTravelerInfo();
}

function renderWelcomeMessage() {

    welcomeMessage.innerHTML = `
    <section class="welcome">Welcome Back ${currentTraveler.getFirstName()}</section>`;

}

function renderUpcomingApprovedTrips() {
    const upcoming = trips.getAllUpcomingTrips(currentTraveler.id, currentDate);
    // const date = new Date("2022-10-14");
    // const newDate = dayjs(getDateXDaysAhead(4, date)).format("MMMDD").toString()
    // console.log("new date******", newDate)
    //'2022-01-17'
    if (upcoming.length) {
        console.log("DESTINATION ID====", upcoming[0].destinationID);
        upcoming.forEach((trip) => {
            console.log("upcoming======", upcoming);
            const destinationInfo = destinations.getDestination(trip.destinationID);
            const date = new Date(trip.date.split("/").join("-"));
            console.log("DESTINATION INFO====", destinationInfo);
            upcomingTrips.innerHTML = `
            <div class="upcoming-trip-card">
                <div class="upcoming-trip-card-img">
                    <img src="${destinationInfo[0].image}" alt="" class=""></img>
                </div>
                <div class="upcoming-trip-card-city">
                    <h3 class="city">${destinationInfo[0].destination}</h3>
                </div>
                <div class="upcoming-trip-card-dates">
                    <span class="material-symbols-outlined">calendar_month</span>
                    <p>${dayjs(trip.date).format("MMMDD")}-${dayjs(getDateXDaysAhead(trip.duration, date)).format("MMMDD")}</p>
                </div>
                <div class="upcoming-trip-card-dates">
                    <p>Status: ${trip.status}</p>
                </div>
            </div>`;
        });
    } else {
        showHideUpcomingTrips();
        console.log(destinationsData)
        destinationsData.forEach((dest) => {
            scrollDestinations.innerHTML += `
            <div class="destination-scroll">
                <div class="upcoming-dest-card-img">
                    <img class="destination-img" src="${dest.image}" alt="${dest.alt}"></img>
                </div>
                <div class="info">
                    <h3class="city"> ${dest.destination} </h3>
                    <p class="figure-info">  $${dest.estimatedLodgingCostPerDay} a night</p>
                    <p class="figure-info"> $${dest.estimatedFlightCostPerPerson} flights Per Person </p>
                </div>
            </div>`;
        });
    }
}

function showHideUpcomingTrips() {
    // console.log(welcomeMessage.classList.value.includes("hidden"));
    if (upcomingTripsContainer.classList.value.includes("upcoming-trips-container")) {
        upcomingTripsContainer.classList.add("upcoming-trips-container-scroll");
        upcomingTripsContainer.classList.remove("upcoming-trips-container");
    } else if (upcomingTripsContainer.classList.value.includes("upcoming-trips-container-scroll")) {
        upcomingTripsContainer.classList.add("upcoming-trips-container");
        upcomingTripsContainer.classList.remove("upcoming-trips-container-scroll");
    }
};

function getDateXDaysAhead(numOfDays, date) {

    const daysAhead = new Date(date.getTime());
    daysAhead.setDate(date.getDate() + numOfDays);
    return daysAhead;
}

function renderPastTrips() {
    const pastTripsData = trips.getAllPastTrips(currentTraveler.id, currentDate);
    
    pastTripsData.forEach(trip => {
        const destinationInfo = destinations.getDestination(trip.destinationID);
        const date = new Date(trip.date.split("/").join("-"));
        pastTrips.innerHTML += `
        <div class="past-trip-tag">
            <div class="past-trip-img-container">
                <img src="${destinationInfo[0].image}" alt="" class=""></img>
            </div>
            <h3 class="city">${destinationInfo[0].destination}</h3>
            <p>${dayjs(trip.date).format("MMMDD")}-${dayjs(
        getDateXDaysAhead(trip.duration, date)
    ).format("MMMDD")}  ${dayjs(trip.date).format("YYYY")}</p>
            <p class="past-trip-duration">${trip.duration} days</p>
        </div>`;
    });
}

function renderTravelerInfo() {
    const allApprovedTrips = trips.getAllApprovedTrips(currentTraveler.id);
    const tripsThisYear = allApprovedTrips.filter(trip => trip.date.includes(dayjs(currentDate).format("YYYY")));
    console.log(tripsThisYear)
    travelerInfo.innerHTML =  `
        <div class="traveler-info-profile">
            <span class="material-symbols-outlined">account_circle</span>
            <h3>${currentTraveler.name}</h3>
        </div>
        <div class="traveler-info-message">
            <p>${tripsThisYear.length} trips down this year & so much more awaits!</p>
        </div>
        <div class="traveler-info-expenses">
            <p>This years travels: $${destinations.calculateAYearTripsExpense(allApprovedTrips, dayjs(currentDate).format("YYYY"))}</p>
        </div>
        <div class="traveler-info-disclaimer">
            <p>* costs do not reflect pending requests</p>
        </div>`;
}