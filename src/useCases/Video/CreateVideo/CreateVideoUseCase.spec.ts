import { CreateVideoUseCase } from "./CreateVideoUseCase"
import { ICreateVideoRequestDTO } from "./CreateVideoDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryVideoRepository } from "../../../repositories/IMemoryVideoRepository";
import { VideosRepositoryInMemory } from "../../../repositories/implementations/VideosRepositoryInMemory";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "../../Category/CreateCategory/CreateCategoryUseCase";
import { ICreateCategoryRequestDTO } from "../../Category/CreateCategory/CreateCategoryDTO";
import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";

describe("Create Video", ()=>{
  let videosRepository: IMemoryVideoRepository;
  let categoriesRepository: IMemoryCategoriesRepository;
  let createVideoUseCase: CreateVideoUseCase;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    videosRepository = new VideosRepositoryInMemory();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository );
    createVideoUseCase = new CreateVideoUseCase(videosRepository, categoriesRepository );
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to create a new video", async ()=>{
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: Date.now(),
    }
    const category = await createCategoryUseCase.execute(categoryData);

    
    const videoData : ICreateVideoRequestDTO = {
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: category.id
    };
    const video = await createVideoUseCase.execute(videoData);

    expect(video).toHaveProperty("id");
    expect(video.name).toBe("Test Video");
  });
  it("should not be able to create an existing video", async () => {
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: Date.now(),
    }
    const videoData : ICreateVideoRequestDTO = {
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: categoryData.id
    };
    
    await expect(createVideoUseCase.execute(videoData)).rejects.toEqual(
      new Error("Category does not exist!")
    );
  });
})