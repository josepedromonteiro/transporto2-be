import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {firstValueFrom, map, Observable, take, tap} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {stringify} from "qs";

@Injectable()
export class CPInterceptor implements NestInterceptor {

    private token?: string;

    constructor(private httpService: HttpService) {
        setTimeout(() => {
            this.token = undefined;
        }, 600000);
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        const ctx = context.switchToHttp();
        // const token_ = ctx.getRequest().headers['authorization'];
        //
        // if (!token_) {
        this.httpService.axiosRef.defaults.headers.common['authorization'] = this.token ?? await firstValueFrom(this.getNewToken());
        // }

        return next.handle();
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
                console.log(this.token)
            }),
            map((_) => this.token)
        );
    }

}
