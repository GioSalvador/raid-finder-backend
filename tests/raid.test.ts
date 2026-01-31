import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/lib/prisma.js';
import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Raid Management Flow', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await prisma.raid.deleteMany();
    await prisma.user.deleteMany();

    const userResponse = await request(app).post('/signup').send({
      username: 'raidmaster',
      email: 'master@test.com',
      password: 'password123',
    });

    userId = userResponse.body.user.id;

    const loginResponse = await request(app).post('/login').send({
      email: 'master@test.com',
      password: 'password123',
    });

    token = loginResponse.body.token;
  });

  it('should create a new raid when authenticated', async () => {
    const response = await request(app)
      .post('/raids')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'XP Farm',
        game: 'Destiny 2',
        platform: 'PC',
        description: 'lets farm?',
        nickname: 'Player1',
      });

    expect(response.status).toBe(201);
    expect(response.body.raid).toHaveProperty('id');
    expect(response.body.raid.title).toBe('XP Farm');
  });

  it('should list raids with filters', async () => {
    const response = await request(app).get('/raids').query({ game: 'Destiny 2' });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].game).toBe('Destiny 2');
  });

  it('should not allow creating a raid without a token', async () => {
    const response = await request(app).post('/raids').send({
      title: 'Raid Without Token',
      game: 'Any',
      platform: 'PC',
      description: 'Spected Error',
      nickname: 'Noob',
    });

    expect(response.status).toBe(400);
  });
});
