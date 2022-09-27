class Traveler {
    constructor(data) {
        this.travelerData = data;
        this.id = data.id;
        this.name = data.name;
        this.travelerType = data.travelerType;
    }

    checkIfTravelerExists(travelerID) {
        const quickFind = this.travelerData.find((traveler) => {
            return traveler.id === travelerID;
        });

        if (quickFind) {
            return `Traveler ID ${travelerID} exists.`;
        } else {
            return `Traveler ID ${travelerID} does not exist.`;
        }
    }

    getFirstName() {
        return this.name.split(" ")[0];
    }
}

export default Traveler;