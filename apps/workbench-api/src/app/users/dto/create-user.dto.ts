import { CreateUserRequest, User } from '@team-insights/util-interfaces';

export class CreateUserDto implements CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: string;
}
