import { expect } from "chai";
import Destinations from "../src/Destinations";
import Traveler from "../src/Traveler";
import Trips from "../src/Trips";
import mockDestinationsData from "../src/data/mockDestinationsData";
import mockTravelersData from "../src/data/mockTravelersData";
import mockTripsData from "../src/data/mockTripsData";

describe("Destinations", () => {
    let destinations, traveler14, traveler15, trips;

    beforeEach(() => {
        destinations = new Destinations(mockDestinationsData);
        traveler14 = new Traveler(mockTravelersData[4]);
        traveler15 = new Traveler(mockTravelersData[5]);
        trips = new Trips(mockTripsData);
    });

    it.only("Should be a function", () => {
        expect(Destinations).to.be.a("function");
    });

    it.only("Should instantiate a new instance of Trips", () => {
        expect(destinations).to.be.an.instanceof(Destinations);
    });

    it.only("Should check if a destination exists", () => {
        expect(destinations.checkIfDestinationExists(9)).to.equal("Destination ID 9 exists.");
        expect(destinations.checkIfDestinationExists(91)).to.equal("Destination ID 91 does not exist.");
    });

    it.only("Should be able to calculate a traveler's trips for a given year", () => {
        const travelerTrips1 = trips.getAllApprovedTrips(traveler14.id);
        const travelerTrips2 = trips.getAllApprovedTrips(traveler15.id);

        expect(destinations.calculateAYearTripsExpense(travelerTrips1, 2022)).to.deep.equal(11682);
        expect(destinations.calculateAYearTripsExpense(travelerTrips2, 2022)).to.deep.equal(11121);
    });

    it.only("Should be able to calculate a trip's cost", () => {
        const trip1 = {
            id: 119,
            userID: 10,
            destinationID: 47,
            travelers: 5,
            date: "2020/05/28",
            duration: 20,
            status: "pending",
            suggestedActivities: [],
        };
        const trip2 = {
            id: 31,
            userID: 11,
            destinationID: 33,
            travelers: 3,
            date: "2020/12/19",
            duration: 15,
            status: "pending",
            suggestedActivities: [],
        };

        expect(destinations.calculateTripEstimate(trip1)).to.equal(24805);
        expect(destinations.calculateTripEstimate(trip2)).to.equal(16863);
    });

    it.only("Should return information of a destination", () => {
        expect(destinations.getDestination(21)).to.deep.equal([
            {
                id: 21,
                destination: "Tulum, Mexico",
                estimatedLodgingCostPerDay: 100,
                estimatedFlightCostPerPerson: 350,
                image: "https://images.unsplash.com/photo-1501619593928-bef49688c888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                alt: "a donkey standing on the beach",
            },
        ]);
    });
});
