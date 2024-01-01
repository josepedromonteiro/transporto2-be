export type ItemType =
    'station'
    | 'stop'
    | 'region'
    | 'line'
    | 'route'
    | 'schedule'
    | 'operator'
    | 'stopover'
    | 'journey'
    | 'location';

export type ItemModes = 'train' | 'bus' | 'watercraft' | 'taxi'| 'gondola'| 'aircraft'| 'car'| 'bicycle'| 'walking'

export interface TransportItem {
    type?: ItemType;
    id?: string;
}

export interface TransportLocation extends TransportItem {
    type?: 'location';
    name?: string;
    address?: string;
    longitude?: number;
    latitude?: number;
    altitude?: number;
}
