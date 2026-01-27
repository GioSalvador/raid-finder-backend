import type { Request, Response } from 'express';
import prisma from '../services/prisma.js';

export const createRaid = async (req: Request, res: Response) => {
  try {
    const { title, game, platform, description, nickname, authorId } = req.body;

    const newRaid = await prisma.raid.create({
      data: {
        title,
        game,
        platform,
        description,
        nickname,
        authorId,
      },
      select: {
        id: true,
        title: true,
        game: true,
        createdAt: true,
        authorId: true,
      },
    });

    return res.status(201).json({ message: 'Raid created successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating raid' });
  }
};

export const getRaids = async (req: Request, res: Response) => {
  try {
    const raids = await prisma.raid.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.json(raids);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching raids' });
  }
};
