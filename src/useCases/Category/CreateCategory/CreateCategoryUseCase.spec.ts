import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "../../Category/CreateCategory/CreateCategoryUseCase";
import { ICreateCategoryRequestDTO } from "../../Category/CreateCategory/CreateCategoryDTO";
import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";

describe("Create Category", ()=>{
  let categoriesRepository: IMemoryCategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository );
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to create a new category", async ()=>{
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at:  new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);


    expect(category).toHaveProperty("id");
    expect(category.name).toBe("Test Category");
  });
  it("should not be able to create an existing user", async () => {
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test",
      description: 'A test category',
      created_at:  new Date(),
    }

    await createCategoryUseCase.execute(categoryData);

    await expect(createCategoryUseCase.execute(categoryData)).rejects.toEqual(
      new Error("Category already exists.")
    );
  });
})