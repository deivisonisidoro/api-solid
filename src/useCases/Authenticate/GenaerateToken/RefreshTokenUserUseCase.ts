import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { IRefreshTokenProvider } from "../../../providers/IRefreshTokenProvider";

export class RefreshTokenUserUseCase{
  constructor(
    private generateRefreshTokenProvider: IRefreshTokenProvider,
  ){}
  async execute(refresh_token: string){
    const refreshToken = await this.generateRefreshTokenProvider.findId(refresh_token);
    
    if (!refreshToken) {
      return new Error("Refresh token is invalid.")
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expires_in));
    
    const token = await this.generateRefreshTokenProvider.generateToken(refreshToken.user_id);

    if (refreshTokenExpired) {
      await this.generateRefreshTokenProvider.delete(refreshToken.user_id)
      const newRefreshToken = await this.generateRefreshTokenProvider.generateToken(refreshToken.user_id);
      return {refresh_token: newRefreshToken, token};
    }

    return {token};
  }
}