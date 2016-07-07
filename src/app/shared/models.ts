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
        this.origin = {latitude: 37.418901+Math.random()*1-.5,longitude:-122.079767+Math.random()*1-.5};
        this.destination = {latitude: 37.77469+Math.random()*1-.5, longitude:-122.415463+Math.random()*1-.5 };
        this.captain = "Zol";
        this.currentLocation = {latitude: (this.origin.latitude + this.destination.latitude)/2, longitude: (this.origin.longitude + this.destination.longitude)/2};
        this.inventory = [
            new Product(), 
            {name:"Worthless Cargo",sku:''+Math.round(Math.random()*100000),costToManufacture:2,retailPrice:3,quantity:Math.round(Math.random()*1000)}
        ]; 
    }
    
    getRevenue() : number {
        return this.inventory.reduce((previous, current) => previous + (current.retailPrice * current.quantity), 0);
    }

}

export class Product {
    name: string;
    sku: string;
    costToManufacture: number;
    retailPrice: number;
    quantity : number = 1;
    
    
    // Fake product constructor
    constructor() {
        return {name:"Precious Cargo",sku:''+Math.round(Math.random()*10000000),costToManufacture:399,retailPrice:499,quantity:1};
    }

}

export class GeoPoint {
    latitude: number;
    longitude: number;
}

