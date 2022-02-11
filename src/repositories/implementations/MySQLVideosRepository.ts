import { getRepository } from 'typeorm';
import { Video } from '../../entities/Video';
import { IVideosRepository } from '../IVideosRepository';

export class MySQLVideosRepository implements IVideosRepository {
  async findByName(name: string): Promise<Video> {
    const repo = getRepository(Video);
    const category = await repo.findOne({ name });
    return category;
  }

  async findById(id: string): Promise<Video> {
    const repo = getRepository(Video);
    const video = await repo.findOne({ id });
    return video;
  }

  async findAll(): Promise<Video[]> {
    const repo = getRepository(Video);
    const video = await repo.find({
      relations: ['category'],
    });
    return video;
  }

  async create(data: unknown): Promise<Video> {
    const repo = getRepository(Video);
    const video = repo.create(data);
    return video;
  }

  async delete(id: string): Promise<void> {
    const repo = getRepository(Video);
    await repo.delete({ id });
  }

  async save(video: Video): Promise<void> {
    const repo = getRepository(Video);
    repo.save(video);
  }
}
