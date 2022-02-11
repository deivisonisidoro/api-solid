import { getRepository } from "typeorm";
import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenProvider } from "../IRefreshTokenProvider";
import dayjs from 'dayjs'
import { sign } from "jsonwebtoken";
export class GenerateRefreshToken implements IRefreshTokenProvider{
  async create(user_id: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(150, "second").unix();
    const repo = getRepository(RefreshToken);
    const generateRefreshToken = repo.create({
      user_id,
      expires_in: expiresIn,
    });
    return generateRefreshToken;
  }
  async findId(refresh_token: string): Promise<RefreshToken> {
    const repo = getRepository(RefreshToken);
    const token = await repo.findOne({id: refresh_token})
    return token
  }
  async save(refresh_token: RefreshToken): Promise<void> {
    const repo = getRepository(RefreshToken);
    repo.save(refresh_token);
  } 
  async generateToken(token: string): Promise<Object> {
    const generatedToken  = sign({}, "teste", {
      subject: token,
      expiresIn: "20s"
    });
    return generatedToken;
  }
  async delete(id: string): Promise<void> {
    const repo = getRepository(RefreshToken);
    await repo.delete({user_id: id});
    
  }
}