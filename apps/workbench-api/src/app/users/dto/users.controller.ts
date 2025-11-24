import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Implementation for user creation endpoint
    return this.usersService.create(createUserDto);
  }
  @Get()
  findAll() {
    // Implementation for retrieving all users endpoint
    return this.usersService.findAll();
  }
}
