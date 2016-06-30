export class Shipment {
    id: string;
    name: string;
    origin: GeoPoint;
    destination: GeoPoint;
    currentLocation: GeoPoint;
    captain: string;
    inventory: Product[];

    // Fake shipment constructor
    constructor(id : number) {
        this.id = `${id}`;
        this.name = `Shipment ${id}`;
        this.origin = {latitude: 37.418901,longitude:-122.079767};
        this.destination = {latitude: 37.77469, longitude:-122.415463 };
        this.captain = "Zol";
        this.currentLocation = this.origin;
        this.inventory = [new Product()]; 
    }
    
    getRevenue() : number {
        return this.inventory.reduce((previous, current) => previous + current.retailPrice, 0);
    }

}

export class Product {
    name: string;
    sku: string;
    costToManufacture: number;
    retailPrice: number;
    
    
    // Fake product constructor
    constructor() {
        return {name:"Precious Cargo",sku:"1",costToManufacture:399,retailPrice:499};
    }

}

export class GeoPoint {
    latitude: number;
    longitude: number;
}

