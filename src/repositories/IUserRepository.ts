import { User } from '../entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  create(user: unknown): Promise<User>;
  save(user: User): Promise<void>;
}
