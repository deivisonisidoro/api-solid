import { RefreshToken } from "../entities/RefreshToken";

export interface IRefreshTokenProvider{
  create(user_id: string): Promise<RefreshToken>;
  findId(refresh_token: string): Promise<RefreshToken>;
  save(user: RefreshToken): Promise<void>;
  generateToken(token: string): Promise<unknown>;
  delete(id: string): Promise<void>;
}