import { Category } from '../entities/Category';

export interface IMemoryCategoriesRepository {
  findByName(name: string): Promise<Category>;
  findById(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
  create(category: Category): Promise<Category>;
  save(category: Category): Promise<void>;
}
