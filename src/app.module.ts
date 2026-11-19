import { Module } from '@nestjs/common';

import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { EventsModule } from "./events/events.module.js";

@Module({
    imports: [EventsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
