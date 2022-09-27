import { expect } from "chai";
import Trips from "../src/Trips";
import Traveler from "../src/Traveler";
import mockTripsData from "../src/data/mockTripsData";
import mockTravelersData from "../src/data/mockTravelersData";

describe("Trips", () => {
    let trips, traveler14, traveler15;

    beforeEach(() => {
        trips = new Trips(mockTripsData);
        traveler14 = new Traveler(mockTravelersData[4]);
        traveler15 = new Traveler(mockTravelersData[5]);
    });

    it("Should be a function", () => {
        expect(Trips).to.be.a("function");
    });

    it("Should instantiate a new instance of Trips", () => {
        expect(trips).to.be.an.instanceof(Trips);
    });

    it("Should check if traveler id exists", () => {
        expect(trips.checkIfUserExists(traveler14.id)).to.equal("Traveler ID 14 exists.");
        expect(trips.checkIfUserExists(20)).to.equal("Traveler ID 20 does not exist.");
    });

    it("Should return all of a travelers trips; past, upcoming and pending", () => {
        expect(trips.getAllOfMyTrips(traveler14.id)).to.deep.equal([
            {
                id: 13,
                userID: 14,
                destinationID: 12,
                travelers: 1,
                date: "2022/11/12",
                duration: 11,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 81,
                userID: 14,
                destinationID: 26,
                travelers: 1,
                date: "2020/08/31",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 23,
                userID: 14,
                destinationID: 24,
                travelers: 6,
                date: "2022/01/02",
                duration: 18,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 21,
                userID: 14,
                destinationID: 10,
                travelers: 1,
                date: "2022/12/12",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
            {
                id: 85,
                userID: 14,
                destinationID: 32,
                travelers: 2,
                date: "2020/02/21",
                duration: 5,
                status: "approved",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllOfMyTrips(traveler15.id)).to.deep.equal([
            {
                id: 90,
                userID: 15,
                destinationID: 38,
                travelers: 5,
                date: "2020/03/04",
                duration: 7,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 120,
                userID: 15,
                destinationID: 33,
                travelers: 1,
                date: "2022/11/21",
                duration: 10,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 167,
                userID: 15,
                destinationID: 42,
                travelers: 3,
                date: "2019/08/10",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 168,
                userID: 15,
                destinationID: 30,
                travelers: 3,
                date: "2022/10/15",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
            {
                id: 170,
                userID: 15,
                destinationID: 1,
                travelers: 2,
                date: "2019/10/30",
                duration: 20,
                status: "approved",
                suggestedActivities: [],
            },
        ]);
    });

    it("Should return all of a travelers approved trips", () => {
        expect(trips.getAllApprovedTrips(traveler14.id)).to.deep.equal([
            {
                id: 13,
                userID: 14,
                destinationID: 12,
                travelers: 1,
                date: "2022/11/12",
                duration: 11,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 81,
                userID: 14,
                destinationID: 26,
                travelers: 1,
                date: "2020/08/31",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 23,
                userID: 14,
                destinationID: 24,
                travelers: 6,
                date: "2022/01/02",
                duration: 18,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 85,
                userID: 14,
                destinationID: 32,
                travelers: 2,
                date: "2020/02/21",
                duration: 5,
                status: "approved",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllApprovedTrips(traveler15.id)).to.deep.equal([
            {
                id: 90,
                userID: 15,
                destinationID: 38,
                travelers: 5,
                date: "2020/03/04",
                duration: 7,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 120,
                userID: 15,
                destinationID: 33,
                travelers: 1,
                date: "2022/11/21",
                duration: 10,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 167,
                userID: 15,
                destinationID: 42,
                travelers: 3,
                date: "2019/08/10",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 170,
                userID: 15,
                destinationID: 1,
                travelers: 2,
                date: "2019/10/30",
                duration: 20,
                status: "approved",
                suggestedActivities: [],
            },
        ]);
    });

    it("Should return all past trips", () => {
        expect(trips.getAllPastTrips(traveler14.id, "2022/09/22")).to.deep.equal([
            {
                id: 81,
                userID: 14,
                destinationID: 26,
                travelers: 1,
                date: "2020/08/31",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 23,
                userID: 14,
                destinationID: 24,
                travelers: 6,
                date: "2022/01/02",
                duration: 18,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 85,
                userID: 14,
                destinationID: 32,
                travelers: 2,
                date: "2020/02/21",
                duration: 5,
                status: "approved",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllPastTrips(traveler15.id, "2022/09/22")).to.deep.equal([
            {
                id: 90,
                userID: 15,
                destinationID: 38,
                travelers: 5,
                date: "2020/03/04",
                duration: 7,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 167,
                userID: 15,
                destinationID: 42,
                travelers: 3,
                date: "2019/08/10",
                duration: 16,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 170,
                userID: 15,
                destinationID: 1,
                travelers: 2,
                date: "2019/10/30",
                duration: 20,
                status: "approved",
                suggestedActivities: [],
            },
        ]);
    });

    it("Should return all upcoming trips", () => {
        expect(trips.getAllUpcomingTrips(traveler14.id, "2022/09/22")).to.deep.equal([
            {
                id: 13,
                userID: 14,
                destinationID: 12,
                travelers: 1,
                date: "2022/11/12",
                duration: 11,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 21,
                userID: 14,
                destinationID: 10,
                travelers: 1,
                date: "2022/12/12",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllUpcomingTrips(traveler15.id, "2022/09/22")).to.deep.equal([
            {
                id: 120,
                userID: 15,
                destinationID: 33,
                travelers: 1,
                date: "2022/11/21",
                duration: 10,
                status: "approved",
                suggestedActivities: [],
            },
            {
                id: 168,
                userID: 15,
                destinationID: 30,
                travelers: 3,
                date: "2022/10/15",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
        ]);
    });

    it("Should return all upcoming approved trips", () => {
        expect(trips.getAllUpcomingApprovedTrips(traveler14.id, "2022/09/22")).to.deep.equal([
            {
                id: 13,
                userID: 14,
                destinationID: 12,
                travelers: 1,
                date: "2022/11/12",
                duration: 11,
                status: "approved",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllUpcomingApprovedTrips(traveler15.id, "2022/09/22")).to.deep.equal([
            {
                id: 120,
                userID: 15,
                destinationID: 33,
                travelers: 1,
                date: "2022/11/21",
                duration: 10,
                status: "approved",
                suggestedActivities: [],
            },
        ]);
    });

    it("Should return all upcoming trips", () => {
        expect(trips.getAllUpcomingPendingTrips(traveler14.id, "2022/09/22")).to.deep.equal([
            {
                id: 21,
                userID: 14,
                destinationID: 10,
                travelers: 1,
                date: "2022/12/12",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
        ]);

        expect(trips.getAllUpcomingPendingTrips(traveler15.id, "2022/09/22")).to.deep.equal([
            {
                id: 168,
                userID: 15,
                destinationID: 30,
                travelers: 3,
                date: "2022/10/15",
                duration: 18,
                status: "pending",
                suggestedActivities: [],
            },
        ]);
    });
});
