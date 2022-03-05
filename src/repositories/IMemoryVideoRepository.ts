import { Video } from "../entities/Video";

export interface IMemoryVideoRepository {
  findByName(name: string): Promise<Video>;
  findById(id: string): Promise<Video>;
  findAll(): Promise<Video[]>;
  delete(id: string): Promise<void>;
  create(video: unknown): Promise<Video>;
  save(video: Video): Promise<void>;
}