import { expect } from "chai";
import Traveler from "../src/Traveler";
import mockTravelersData from "../src/data/mockTravelersData";

describe("Traveler", () => {
    let traveler14, traveler15;

    beforeEach(() => {
        traveler14 = new Traveler(mockTravelersData[4]);
        traveler15 = new Traveler(mockTravelersData[5]);
    });

    it("Should be a function", () => {
        expect(Traveler).to.be.a("function");
    });

    it("Should instantiate a new instance of Traveler", () => {
        expect(traveler14).to.be.an.instanceof(Traveler);
        expect(traveler15).to.be.an.instanceof(Traveler);
    });

    it("Should have access to traveler ID", () => {
        expect(traveler14.id).to.equal(14);
        expect(traveler15.id).to.equal(15);
    });
    
    it("Should have access to traveler name", () => {
        expect(traveler14.name).to.equal("Ellynn Kyne");
        expect(traveler15.name).to.equal("Emeline Winslet");
    });
    
    it("Should have access to traveler's travel type", () => {
        expect(traveler14.travelerType).to.equal("history buff");
        expect(traveler15.travelerType).to.equal("history buff");
    });

    it("Should be able to retrieve traveler's first name", () => {
        expect(traveler14.getFirstName()).to.equal("Ellynn");
        expect(traveler15.getFirstName()).to.equal("Emeline");
    });

});