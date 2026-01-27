import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokeyPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  const [, token] = authorization.split(' ');
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    const { userId } = decoded as TokeyPayload;

    (req as any).userId = userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
