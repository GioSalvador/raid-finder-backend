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
   
