class Traveler {
    constructor(data) {
        this.travelerData = data;
        this.id = data.id;
        this.name = data.name;
        this.travelerType = data.travelerType;
    }
    
    getFirstName() {
        return this.name.split(" ")[0];
    }
}

export default Traveler;