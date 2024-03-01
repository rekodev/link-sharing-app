import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthTokenPayload extends JwtPayload {
  userId: number;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decodedToken: AuthTokenPayload) => {
      if (err) return res.sendStatus(403);

      req.userId = decodedToken.userId;

      next();
    }
  );
};

export default authenticateToken;
