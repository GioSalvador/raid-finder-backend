# Raid Finder API
𝔟𝔶: 𝔊𝔦𝔬𝔳𝔞𝔫𝔦 𝔖𝔞𝔩𝔳𝔞𝔡𝔬𝔯

A robust REST API for organizing raids in online games, built with Node.js, TypeScript, and Prisma ORM.

## Technologies

- Node.js & Express - Server-side framework.
- TypeScript - Static typing for enhanced security.
- Prisma ORM - Database modeling and manipulation (PostgreSQL/SQLite).
- JWT (JSON Web Token) - Route authentication and security.
- Bcrypt - Password encryption.

## Key Features

- Secure Authentication: Password encryption and token-based sessions.
- Resource Ownership: Users can only modify or delete their own profiles and raids.
- Relational Mapping: Automatically links Raids to their creators.
- Cascading Deletes: Cleaning up a user profile automatically removes their associated raids.
- Type Safety: End-to-end type safety using TypeScript and Prisma generated types.

## Getting Started (Local Setup)

### Prerequisites

- Node.js (v18 or higher)
- NPM or Yarn

1. Clone the repository:  
   ```bash
   git clone https://github.com/GioSalvador/raid-finder-backend.git
   cd raid-finder-backend

2. Intall dependencies:
   ```bash
   npm install
   
3. Environment Variables:
   Create a .env file in the root directory:
   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your_secure_random_string"
   
5. Database Setup:
   ```bash
   npx prisma db push
   
6. Run Development Server:
   ```bash
   npm run dev
   
4. Database Setup:
   ```bash
   npx prisma db push
   
## API Endpoints

### User Management 

1. POST - Create user
```bash
/signup
```
- JSON:
```bash
{
  "email": "user@email.com",
  "username": "user",
  "password": "mysecretpassword1234"
}
```
2. POST - Login
```bash
/login
```
- JSON:
```bash
{
  "email": "user@email.com",
  "password": "mysecretpassword1234"
}
```
3. GET - List all users
```bash
/users
```
4. GET - Logged-in user profile (token required)
```bash
/users/me
```
5. PUT - Update logged-in user profile (token required)
```bash
/users/me
```
- JSON:
```bash
{
  "email": "new@email.com"
}
```
6. DELETE - Remove account and all its raids (token required)
```bash
/users/me
```

### Raid Management 

1. POST - Create a new raid (token required)
```bash
/raids
```
- JSON:
```bash
{
  "title": "XP Farm",
  "game": "Destiny 2",
  "platform": "Steam/PC",
  "description": "Need someone to help me with xp farming",
  "nickname": "Strøke"
}
```
2. GET - List all active raids
```bash
/raids
```
3. PUT - Update a raid (Owner only)
```bash
/raids/:id
```
- JSON:
```bash
{
  "title": "XP Farm EDITED"
}
```
4. DELETE - Delete a raid (Owner only)
```bash
/raids/:id
```
## Security Concepts

This API implements IDOR (Insecure Direct Object Reference) protection. By using /users/me routes and extracting user identity directly from the JWT payload, we ensure that no user can manipulate URL parameters to access or modify data belonging to others.

