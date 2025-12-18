import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        priority: createTaskDto.priority,
      },
    });
    // this.eventsGateway.notifyTaskCreated(task);
    return task;
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
