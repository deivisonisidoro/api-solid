import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";
import { IDeleteCategoryRequestDTO } from "./DeleteCategoryDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";


describe("Delete Category", ()=>{
  let categoriesRepository: IMemoryCategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      categoriesRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to delete an existing category", async ()=>{
    const categoryData: IDeleteCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);


    expect( await deleteCategoryUseCase.execute(category)).not.toEqual(
      new Error("Categorie does not exits!")
    );
    expect( await deleteCategoryUseCase.execute(category)).toBeUndefined();
  });

  it("should be able to delete an existing user", async ()=>{
      const categoryData: IDeleteCategoryRequestDTO = {
      id:'rest',
      name: "Test",
      description: 'A test category',
      created_at: new Date(),
    }

    const category = await createCategoryUseCase.execute(categoryData);

    expect( await deleteCategoryUseCase.execute(category)).not.toEqual(
      new Error("Category does not exits!")
    );
    expect( await deleteCategoryUseCase.execute(category)).toBeUndefined();
  });
  

})