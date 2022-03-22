import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUserRepository';

export class MySQLUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne({ id });
    return user;
  }

  async findAll(pageNumber: number): Promise<Object> {
    const repo = getRepository(User);
    const builder = repo.createQueryBuilder("users");
    const page = pageNumber ||1;
    const perPage = 4;
    const total = await builder.getCount() 
    builder.orderBy('name');
    builder.offset((page - 1) * perPage).limit(perPage);
    const user = {body: await builder.getMany(), total, page , last_page: Math.ceil(total/perPage)};
    return user;
  }

  async create(data: User): Promise<User> {
    const repo = getRepository(User);
    const user = repo.create(data);
    return user;
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(User);
    await repo.delete({ id });
  }

  async save(user: User): Promise<void> {
    const repo = getRepository(User);
    repo.save(user);
  }
}
