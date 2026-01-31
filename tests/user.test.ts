import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/lib/prisma.js';

describe('User Auth Flow', () => {
  beforeAll(async () => {
    await prisma.raid.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should create a new user successfully', async () => {
    const response = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);

    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.username).toBe('testuser');
  });

  it('should not allow duplicate emails', async () => {
    const response = await request(app).post('/signup').send({
      username: 'anotheruser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('should login successfully and return a token', async () => {
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    const token = response.body.token;
  });
});
