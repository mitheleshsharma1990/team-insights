import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/dto/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/dto/auth.module';
import { EventsGateway } from './events/events.gateway';
@Module({
  imports: [UsersModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
