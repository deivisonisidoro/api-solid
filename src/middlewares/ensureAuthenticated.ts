import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authToken = request.headers.authorization;
  
  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing "
    })
  }
  const [, token] = authToken.split(" ");
  console.log(token);
  
  try {
    verify(token, "teste");
    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Token invalid'
    });
  }
}