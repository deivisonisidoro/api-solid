import { Video } from "../entities/Video";

export interface IVideosRepository {
  findByName(name: string): Promise<Video>;
  findById(id: string): Promise<Video>;
  findAll(pageNumber: number): Promise<Object>;
  delete(id: string): Promise<void>;
  create(video: unknown): Promise<Video>;
  save(video: Video): Promise<void>;
}