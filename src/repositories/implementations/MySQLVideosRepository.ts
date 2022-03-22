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

  async findAll(pageNumber: number): Promise<Object> {
    const repo = getRepository(Video);
    const builder = repo.createQueryBuilder("videos");
    const page = pageNumber || 1;
    const perPage = 4;
    const total = await builder.getCount();
    builder.offset((page - 1) * perPage).limit(perPage);
    const video = {body: await builder.getMany(), total, page , last_page: Math.ceil(total/perPage)};
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
