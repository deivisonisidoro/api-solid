import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";
import { IGetAllCategoryRequestDTO } from "./GetAllCategoryDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { GetAllCategoryUseCase } from "./GetAllCategoryUseCase";

import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";


describe("GetAll Category", ()=>{
  let categoriesRepository: IMemoryCategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;
  let getAllCategoryUseCase: GetAllCategoryUseCase;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    getAllCategoryUseCase = new GetAllCategoryUseCase(
      categoriesRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to get all categories", async ()=>{
    const categoryData: IGetAllCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);
    
    
    expect(await getAllCategoryUseCase.execute()).toEqual(expect.arrayContaining([category]));

  });
  

})