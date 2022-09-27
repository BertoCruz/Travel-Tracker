class Destinations {
    constructor(data) {
        this.destinationsData = data;
    }

    checkIfDestinationExists(destinationID) {
        const quickFind = this.destinationsData.find((dest) => {
            return dest.id === destinationID;
        });

        if (quickFind) {
            return `Destination ID ${destinationID} exists.`;
        } else {
            return `Destination ID ${destinationID} does not exist.`;
        }
    }

    //Show me total amount I have spent on trips this year.
    //This should be calculated from the trips data
    //and include a travel agent's 10% fee.
    calculateAYearTripsExpense(travelerTrips, year) {
        const yearTrips = travelerTrips.filter((trip) => trip.date.includes(year));
        // console.log("THIS YEARS TRIPS======", yearTrips)

        const estimatedCosts = yearTrips.reduce((acc, trip) => {
            this.destinationsData.forEach((dest) => {
                if (dest.id === trip.destinationID) {
                    // console.log("DESTINATION====", dest)
                    acc +=
                        (dest.estimatedFlightCostPerPerson * trip.travelers +
                            dest.estimatedLodgingCostPerDay * trip.duration) *
                        1.1;
                }
            });

            return acc;
        }, 0);

        // console.log("ESTIMATED COSTS======", estimatedCosts);
        return estimatedCosts;
    }

    //I think we can pass in an object in the format of a Trip
    //object instead of all of these parameters
    //(date, numOfTravelers, duration, destinationID)
    calculateTripEstimate(trip) {
        // console.log("THE TRIP IN QUESTION=====", trip);
        const estimatedCosts = this.destinationsData.reduce((acc, dest) => {
            if (dest.id === trip.destinationID) {
                // console.log("DESTINATION====", dest);
                acc +=
                    (dest.estimatedFlightCostPerPerson * trip.travelers +
                        dest.estimatedLodgingCostPerDay * trip.duration) *
                    1.1;
            }

            return acc;
        }, 0);
        // console.log("ESTIMATED COSTS FOR TRIP=====", parseFloat(estimatedCosts.toFixed(2)));
        return parseFloat(estimatedCosts.toFixed(2));
    }

    getDestination(destinationID) {
        return this.destinationsData.filter(dest => {
            return dest.id === destinationID;
        });
    }
}

export default Destinations;
