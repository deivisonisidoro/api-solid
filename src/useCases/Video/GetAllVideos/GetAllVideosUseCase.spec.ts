import {GetAllVideosUseCase  } from "./GetAllVideosUseCase";
import { TestHelper } from "../../../helpers/testHelper";
import { CreateVideoUseCase } from "../CreateVideo/CreateVideoUseCase";

import { VideosRepositoryInMemory } from "../../../repositories/implementations/VideosRepositoryInMemory";

import { IMemoryVideoRepository } from "../../../repositories/IMemoryVideoRepository";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "../../Category/CreateCategory/CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";
import { ICreateCategoryRequestDTO } from "../../Category/CreateCategory/CreateCategoryDTO";
import { ICreateVideoRequestDTO } from "../CreateVideo/CreateVideoDTO";



describe("Get all videos", ()=>{
  let videosRepository: IMemoryVideoRepository;
  let categoriesRepository: IMemoryCategoriesRepository;
  let createVideoUseCase: CreateVideoUseCase;
  let getAllVideoUseCase: GetAllVideosUseCase;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    videosRepository = new VideosRepositoryInMemory();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository );
    createVideoUseCase = new CreateVideoUseCase(videosRepository, categoriesRepository );
    getAllVideoUseCase = new GetAllVideosUseCase(videosRepository);
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  });
  
  it("should be able to get all videos", async ()=>{
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at:  new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);

    const videoData : ICreateVideoRequestDTO = {
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: category.id
    };
    const video = await createVideoUseCase.execute(videoData);
  
    const videos = await getAllVideoUseCase.execute();

    
    expect(videos).toEqual(expect.arrayContaining([video]));
  });
  
  
});