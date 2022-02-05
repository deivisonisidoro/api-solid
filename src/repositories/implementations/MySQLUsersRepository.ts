import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";

export class MySQLUsersRepository implements IUsersRepository{
 
  async findByEmail(email: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne({email});
    return user
  }
  async findById(id: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne({id});
    return user
  }
  async findAll(): Promise<User[]> {
    const repo = getRepository(User);
    const user = await repo.find();
    return user;
  }
  async create(data: User): Promise<User> {
    const repo = getRepository(User);
    const user = repo.create(data);
    return user;
  }
  async delete(id: string): Promise<void> {
    const repo = getRepository(User);
    await repo.delete({id});
  }
  async save(user: User): Promise<void> {
    const repo = getRepository(User);
    repo.save(user);
  }
}