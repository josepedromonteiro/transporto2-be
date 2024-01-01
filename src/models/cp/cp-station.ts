import {Station} from "../station";
import {Departure} from "../departure";
import * as moment from 'moment';

export interface CPStation {
    region?: string;
    railways: string[];
    latitude: string;
    longitude: string;
    code: string;
    designation: string;
}


export interface CPDepartures {
    messages: string[]
    stationStops: CPStationStop[]
}

export interface CPStationStop {
    platform?: string
    occupancy: any
    departureTime?: string
    arrivalTime?: string
    delay?: number
    trainDestination: CPTrainDestination
    trainNumber: number
    trainService: CPTrainService
    trainOrigin: CPTrainOrigin
}

export interface CPTrainDestination {
    designation: string
    code: string
}

export interface CPTrainService {
    designation: string
    code: string
}

export interface CPTrainOrigin {
    designation: string
    code: string
}

export function cpStationDepartureToDeparture(cpStationDeparture: CPStationStop): Departure {
    return {
        stop: cpStationDeparture.trainDestination.designation,
        arrival: cpStationDeparture.arrivalTime && buildDate(moment(new Date()).format('YYYY.MM.DD'), cpStationDeparture.arrivalTime).toISOString(),
        arrivalDelay: cpStationDeparture.delay,
        arrivalPlatform: cpStationDeparture.platform,
        departure: cpStationDeparture.departureTime && buildDate(moment(new Date()).format('YYYY.MM.DD'), cpStationDeparture.departureTime).toISOString(),
        departureDelay: cpStationDeparture.delay,
        departurePlatform: cpStationDeparture.platform
    } as Departure;
}


const buildDate = (day: string, time: string) => moment(`${day} ${time}`, 'YYYY.MM.DD HH:mm')
