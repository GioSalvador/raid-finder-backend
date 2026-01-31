import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createRaid = async (req: Request, res: Response) => {
  try {
    const { title, game, platform, description, nickname } = req.body;
    const authorId = (req as any).userId;

    if (!authorId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

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

    return res.status(201).json({ message: 'Raid created successfully!', raid: newRaid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating raid' });
  }
};

export const getRaids = async (req: Request, res: Response) => {
  try {
    const { game, platform, search } = req.query;
    const where: any = {};

    if (game) where.game = game as string;

    if (platform) where.platform = platform as string;

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const raids = await prisma.raid.findMany({
      where,
      include: {
        author: {
          select: {
            username: true,
            email: true,
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

export const updateRaid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = (req as any).userId;
    const { title, game, platform, description, nickname } = req.body;

    const raid = await prisma.raid.findUnique({ where: { id } });

    if (!raid) {
      return res.status(404).json({ message: 'Raid not found' });
    }
    if (raid.authorId !== userId) {
      return res.status(403).json({ message: "You don't have permission to update this Raid" });
    }

    const updatedRaid = await prisma.raid.update({
      where: { id },
      data: { title, game, platform, description, nickname },
    });

    return res.json({ message: 'Raid updated!', raid: updatedRaid });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error upadating raid' });
  }
};

export const deleteRaid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = (req as any).userId;

    const raid = await prisma.raid.findUnique({ where: { id } });

    if (!raid) {
      return res.status(404).json({ message: 'Raid not found' });
    }
    if (raid.authorId !== userId) {
      return res.status(403).json({ message: "You don't have permission to delete this Raid" });
    }

    await prisma.raid.delete({ where: { id } });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting raid' });
  }
};
