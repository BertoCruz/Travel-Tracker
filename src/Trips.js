class Trips {
    constructor(data) {
        this.tripsData = data;
    }

    checkIfUserExists(travelerID) {
        const quickFind = this.tripsData.find((trip) => {
            return trip.userID === travelerID;
        });

        if (quickFind) {
            return `Traveler ID ${travelerID} exists.`;
        } else {
            return `Traveler ID ${travelerID} does not exist.`;
        }
    }

    //Show me all of my trips; past, upcoming and pending
    getAllOfMyTrips(travelerID) {
        const travelerTrips = this.tripsData.filter((trip) => {
            return trip.userID === travelerID;
        });

        return travelerTrips;
    }

    getAllApprovedTrips(travelerID) {
        const approvedTrips = this.tripsData.filter((trip) => {
            return trip.userID === travelerID && trip.status === "approved";
        });

        return approvedTrips;
    }

    //get all of past trips
    getAllPastTrips(travelerID, currentDate) {
        let userDate = new Date(currentDate);
        const allTrips = this.getAllOfMyTrips(travelerID);

        const pastTrips = allTrips.filter((trip) => {
            let tripDate = new Date(trip.date);
            return tripDate < userDate;
        });

        return pastTrips;
    }

    //get all upcoming trips
    getAllUpcomingTrips(travelerID, currentDate) {
        let userDate = new Date(currentDate);
        const allTrips = this.getAllOfMyTrips(travelerID);

        const upcomingTrips = allTrips.filter((trip) => {
            let tripDate = new Date(trip.date);

            return tripDate > userDate;
        });

        return upcomingTrips;
    }

    //get all upcoming approved trips
    getAllUpcomingApprovedTrips(travelerID, currentDate) {
        let userDate = new Date(currentDate);
        const allTrips = this.getAllOfMyTrips(travelerID);

        const approvedTrips = allTrips.filter((trip) => {
            let tripDate = new Date(trip.date);

            return tripDate > userDate && trip.status === "approved";
        });

        return approvedTrips;
    }

    //get all upcoming pending trips
    getAllUpcomingPendingTrips(travelerID, currentDate) {
        let userDate = new Date(currentDate);
        const allTrips = this.getAllOfMyTrips(travelerID);

        const pendingTrips = allTrips.filter((trip) => {
            let tripDate = new Date(trip.date);

            return tripDate > userDate && trip.status === "pending";
        });

        return pendingTrips;
    }
}

export default Trips;
