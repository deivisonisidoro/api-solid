import { Video } from "../entities/Video";

export interface IVideosRepository {
  findByName(name: string): Promise<Video>;
  findById(id: string): Promise<Video>;
  findAll(): Promise<Video[]>;
  delete(id: string): Promise<void>;
  create(video: Object): Promise<Video>;
  save(video: Video): Promise<void>;
}