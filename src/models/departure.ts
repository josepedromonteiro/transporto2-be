import {TransportItem} from "./index";

export interface Departure extends TransportItem{
    type?: 'stopover',
    stop: string;
    arrival: string;
    arrivalDelay?: number; //seconds
    arrivalPlatform?: string;
    departure?: string;
    departureDelay?: number; //seconds
    departurePlatform?: string;
    lastStation?: boolean;
}
