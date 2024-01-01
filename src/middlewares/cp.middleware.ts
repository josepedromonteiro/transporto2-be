// src/middleware/token.middleware.ts
import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {stringify} from "qs";
import {firstValueFrom, map, take, tap} from "rxjs";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class CpMiddleware implements NestMiddleware {

    private token?: string;

    constructor(private readonly httpService: HttpService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        req.headers['Authorization'] = `${this.token ?? await firstValueFrom(this.getNewToken())}`;
        console.log(req.headers['Authorization']);
        next();
    }


    private getNewToken() {
        const body = {
            'grant_type': 'client_credentials',
        };

        return this.httpService.post('https://api.cp.pt/cp-api/oauth/token', stringify(body), {
            headers: {
                Authorization: 'Basic Y3AtbW9iaWxlOnBhc3M=', // Base64 of "cp-mobile:pass"
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json'
        }).pipe(
            take(1),
            tap((value) => {
                this.token = `Bearer ${value.data.access_token}`;
            }),
            map((_) => this.token)
        );
    }
}
