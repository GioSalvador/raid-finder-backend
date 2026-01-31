import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      return res.status(400).json({ message: 'User or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: 'User created successfully!',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1d' });
    return res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        raids: {
          select: {
            id: true,
            title: true,
            game: true,
            platform: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        username: 'asc',
      },
    });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { username, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, email },
      select: { id: true, username: true, email: true },
    });
    return res.json({
      message: 'Profile updated!',
      user: updatedUser,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Username or email already in use' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
