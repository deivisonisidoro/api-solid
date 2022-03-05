import { Category } from '../../entities/Category';
import { IMemoryCategoriesRepository } from '../IMemoryCategoriesRepository';
import { v4 as uuid } from "uuid";

export class CategoriesRepositoryInMemory implements IMemoryCategoriesRepository {
  private categories: Category[] = [];
  
  async findByName(name: string): Promise<Category> {
   
    const category = this.categories.find((category) => category.name === name);
    
    
    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);
    return category;
  }

  async findAll(): Promise<Category[]> {
    const category = this.categories;
    return category;
  }

  async create(category: Category): Promise<Category> {
    Object.assign(category, {
      id: uuid(),
    });
    this.categories.push(category);
    return category;
  }

  async delete(id: string): Promise<void> {
    const category = this.categories.findIndex((category) => category.id === id);
    this.categories.slice(category);
  }

  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
