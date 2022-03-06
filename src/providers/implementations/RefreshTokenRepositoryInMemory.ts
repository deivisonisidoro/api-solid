import { getRepository } from "typeorm";
import { RefreshToken } from "../../entities/RefreshToken";
import { IMemoryRefreshTokenProvider } from "../IMemoryRefreshTokenProvider";
import dayjs from 'dayjs'
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { User } from "../../entities/User";

export class RefreshTokenRepositoryInMemory implements IMemoryRefreshTokenProvider{
 
  private refresh_token: RefreshToken[] = [];
  private user: User
  async create(user_id: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(150, "second").unix();
   
    
    const refresh_token: RefreshToken= {
      id: uuid(),
      created_at: new Date(),
      expires_in: expiresIn,
      user_id,
      user: this.user
    }
    Object.assign(refresh_token, {
      user_id,
      expires_in: expiresIn,
    });
    this.refresh_token.push(refresh_token);
    return refresh_token;
  }
  async findId(id: string): Promise<RefreshToken> {
    const token = this.refresh_token.find((refresh_token) => refresh_token.id === id);
    
    return token;
  }
  async save(refresh_token: RefreshToken): Promise<void> {
    this.refresh_token.push(refresh_token);
  } 
  async generateToken(token: string): Promise<string> {
    const generatedToken = sign({}, "teste", {
      subject: token,
      expiresIn: "20s"
    });
    return generatedToken;
  }
  async delete(id: string): Promise<void> {
    const token = this.refresh_token.findIndex((refresh_token) => refresh_token.id === id);
    this.refresh_token.slice(token);
  }
}