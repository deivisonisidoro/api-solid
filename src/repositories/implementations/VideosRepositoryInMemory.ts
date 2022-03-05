import { Video } from '../../entities/Video';
import { IMemoryVideoRepository } from '../IMemoryVideoRepository';
import { v4 as uuid } from "uuid";

export class VideosRepositoryInMemory implements IMemoryVideoRepository {
  private videos: Video[] = [];
  
  async findByName(name: string): Promise<Video> {
    const video = this.videos.find((video) => video.name === name);
    return video;
  }

  async findById(id: string): Promise<Video> {
    const video = this.videos.find((video) => video.id === id);
    return video;
  }

  async findAll(): Promise<Video[]> {
    const video = this.videos;
    return video;
  }

  async create(video: Video): Promise<Video> {
    Object.assign(video, {
      id: uuid(),
    });
    this.videos.push(video);
    return video;
  }

  async delete(id: string): Promise<void> {
    const video = this.videos.findIndex((video) => video.id === id);
    this.videos.slice(video);
  }

  async save(video: Video): Promise<void> {
    this.videos.push(video);
  }
}
