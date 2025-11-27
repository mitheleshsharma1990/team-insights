export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password?: string;
  role?: string;
}
