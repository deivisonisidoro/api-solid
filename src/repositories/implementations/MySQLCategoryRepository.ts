import { getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";

export class MySQLCategoryRepository implements ICategoryRepository{
 
  async findByName(name: string): Promise<Category> {
    console.log(name);
    
    const repo = getRepository(Category);
    const category = await repo.findOne({name});
    return category
  }
  async findById(id: string): Promise<Category> {
    const repo = getRepository(Category);
    const category = await repo.findOne({id});
    return category
  }
  async findAll(): Promise<Category[]> {
    const repo = getRepository(Category);
    const category = await repo.find();
    return category;
  }
  async create(data: Category): Promise<Category> {
    const repo = getRepository(Category);
    const category = repo.create(data);
    return category;
  }
  async delete(id: string): Promise<void> {
    const repo = getRepository(Category);
    await repo.delete({id});
  }
  async save(category: Category): Promise<void> {
    const repo = getRepository(Category);
    repo.save(category);
  }
}