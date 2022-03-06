import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";
import { IUpdateCategoryRequestDTO } from "./UpdateCategoryDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";


describe("Update Category", ()=>{
  let categoriesRepository: IMemoryCategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;
  let updateCategoryUseCase: UpdateCategoryUseCase;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    updateCategoryUseCase = new UpdateCategoryUseCase(
      categoriesRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to update an existing category", async ()=>{
    const categoryData: IUpdateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);
    category.name = "Passed the test "
    const modifyCategory = await updateCategoryUseCase.execute(category);

    expect(modifyCategory.name).toBe("Passed the test ");
  });

  it("should be able to update an existing category", async ()=>{
      const categoryData: IUpdateCategoryRequestDTO = {
      id:'test',
      name: "Test",
      description: 'A test category',
      created_at: new Date(),
    }
    await expect(updateCategoryUseCase.execute(categoryData)).rejects.toEqual(
      new Error("Category does not exist")
    );
  });
  

})