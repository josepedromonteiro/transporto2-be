import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpController } from './controllers/cp/cp.controller';
import {HttpModule} from "@nestjs/axios";
import {CPInterceptor} from "./interceptors/cp.interceptor";

@Module({
  imports: [HttpModule],
  controllers: [AppController, CpController],
  providers: [AppService, CPInterceptor],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // Apply the middleware to all routes
    // consumer.apply(CpMiddleware).forRoutes(CpController);
  }
}
