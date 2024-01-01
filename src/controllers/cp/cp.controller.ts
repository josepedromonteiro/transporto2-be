import {Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, map, take, tap} from "rxjs";
import {CPInterceptor} from "../../interceptors/cp.interceptor";
import {CPDepartures, CPStation, cpStationDepartureToDeparture} from "../../models/cp/cp-station";
import {Station} from "../../models/station";
import {Line} from "../../models/line";
import * as moment from "moment";

@UseInterceptors(CPInterceptor)
@Controller('cp')
export class CpController {

    private stations: Station[] = [];
    private lines: Line[] = [];

    constructor(private readonly httpService: HttpService) {
    }

    @Get('stations')
    getStations() {
        if (this.stations.length > 0) {
            return this.stations;
        }
        return this.httpService.get<CPStation[]>('https://api.cp.pt/cp-api/siv/stations/').pipe(
            take(1),
            tap((value) => {
                console.log('request completed');
                console.log(value.data);
            }),
            map((res) => {
                this.stations = res.data.map(cpStation => {
                    return {
                        name: cpStation.designation,
                        id: cpStation.code,
                        location: {
                            latitude: parseFloat(cpStation.latitude),
                            longitude: parseFloat(cpStation.longitude)
                        }
                    } as Station
                });
                return this.stations;
            })
        );
    }

    @Get('lines')
    getLines() {
        if (this.lines.length > 0) {
            return this.lines;
        }

        return this.httpService.get<CPStation[]>('https://api.cp.pt/cp-api/siv/trains').pipe(
            take(1),
            tap((value) => {
                console.log('request completed');
                console.log(value.data);
            }),
            map((res) => {
                console.log(res.data);
                // this.stations = res.data.map(cpStation => {
                //     return {
                //         name: cpStation.designation,
                //         id: cpStation.code,
                //         location: {
                //             latitude: parseFloat(cpStation.latitude),
                //             longitude: parseFloat(cpStation.longitude)
                //         }
                //     } as Station
                // });
                // return this.stations;
            })
        );
    }

    @Get('departures')
    getDepartures(@Query('station') station: string,
                  @Query('date') date?: string) {

        console.log(moment(date ?? new Date()).format('YYYY-MM-DD'));
        const formattedDate = moment(date ?? new Date()).format('YYYY-MM-D');
        return this.httpService.get<CPDepartures>(`https://api.cp.pt/cp-api/siv/stations/${station}/timetable/${formattedDate}`).pipe(
            take(1),
            tap((value) => {
                console.log('request completed');
                console.log(value.data);
            }),
            map((res) => {
                return res.data.stationStops.map(cpStationDepartureToDeparture);
            })
        );
    }


}
