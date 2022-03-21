import { CreateVideoUseCase } from "../CreateVideo/CreateVideoUseCase"
import { UploadVideoUseCase } from "./UploadVideoUseCase"
import { ICreateVideoRequestDTO } from "../CreateVideo/CreateVideoDTO";
import { IUploadVideoRequestDTO } from "./UploadVideoDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryVideoRepository } from "../../../repositories/IMemoryVideoRepository";
import { VideosRepositoryInMemory } from "../../../repositories/implementations/VideosRepositoryInMemory";
import { IMemoryCategoriesRepository } from "../../../repositories/IMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "../../Category/CreateCategory/CreateCategoryUseCase";
import { ICreateCategoryRequestDTO } from "../../Category/CreateCategory/CreateCategoryDTO";
import { CategoriesRepositoryInMemory } from "../../../repositories/implementations/CategoriesRepositoryInMemory";

describe("Upload Video", ()=>{
  let videosRepository: IMemoryVideoRepository;
  let categoriesRepository: IMemoryCategoriesRepository;
  let createVideoUseCase: CreateVideoUseCase;
  let uploadVideoUseCase: UploadVideoUseCase;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    videosRepository = new VideosRepositoryInMemory();
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository );
    createVideoUseCase = new CreateVideoUseCase(videosRepository, categoriesRepository );
    uploadVideoUseCase = new UploadVideoUseCase(videosRepository)
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to upload a new video", async ()=>{
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    }
    const category = await createCategoryUseCase.execute(categoryData);

    
    const videoData : ICreateVideoRequestDTO = {
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: category.id
    };
    const video = await createVideoUseCase.execute(videoData);

    const videoAlreadyExists = await uploadVideoUseCase.execute(video);
    videoAlreadyExists.url = "url";
    videoAlreadyExists.key = "key";
    videoAlreadyExists.file_name = "file_name";
    videoAlreadyExists.size = 1234;

    expect(video).toHaveProperty("id");
    expect(video.url).toBe("url");
  });
  it("should not be able to upload an existing video", async () => {
    const categoryData: ICreateCategoryRequestDTO = {
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
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