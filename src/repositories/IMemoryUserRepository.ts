import { User } from "../entities/User";

interface IMemoryUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  save(user: User): Promise<void>;
}

export { IMemoryUserRepository };
