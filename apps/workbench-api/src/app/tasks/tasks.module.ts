import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { EventsGateway } from '../events/events.gateway';

@Module({
  controllers: [TasksController],
  providers: [TasksService, EventsGateway],
})
export class TasksModule {}
