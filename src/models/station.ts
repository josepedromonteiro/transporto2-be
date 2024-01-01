import {ItemType, TransportItem, TransportLocation} from "./index";

export interface Station extends TransportItem{
    type?: 'station';
    name: string;
    location?: TransportLocation;
    // regions?: string[];
}
