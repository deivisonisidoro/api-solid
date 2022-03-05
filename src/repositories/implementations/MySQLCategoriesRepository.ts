import { getRepository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

export class MySQLCategoriesRepository implements ICategoriesRepository {
  async findByName(name: string): Promise<Category> {
    const repo = getRepository(Category);
    const category = await repo.findOne({ name });
    return category;
  }

  async findById(id: string): Promise<Category> {
    const repo = getRepository(Category);
    const category = await repo.findOne({ id });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const repo = getRepository(Category);
    const category = await repo.find();
    return category;
  }

  async create(data: unknown): Promise<Category> {
    const repo = getRepository(Category);
    const category = repo.create(data);
    return category;
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(Category);
    await repo.delete({ id });
  }

  async save(category: Category): Promise<void> {
    const repo = getRepository(Category);
    repo.save(category);
  }
}
