# Timbanganten - Cemetery Management System

Next.js cemetery management system with PostgreSQL database.

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Prisma ORM + PostgreSQL
- Tailwind CSS + Ant Design
- JWT Authentication

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

You need a PostgreSQL database. Get one from any cloud provider or run locally.

### 3. Environment Variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key-here
```

**Generate JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Database URL example:**
```bash
postgresql://postgres:password@localhost:5432/Timbanganten
```

If your provider requires SSL certificate, add to connection string:
```bash
?sslmode=require&sslrootcert=certs/ca.pem
```

### 4. Setup Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push
```

### 5. Initialize Database

```bash
# Setup cemetery plots
psql $DATABASE_URL -f prisma/init/setup.sql

# Add test data (optional, dev only)
psql $DATABASE_URL -f prisma/init/dummy.sql

# Clear all data (reset database)
psql $DATABASE_URL -f prisma/init/clear.sql
```

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

Login at `/login/admin`, `/login/approver`, `/login/pengawas`

**Test accounts** (if you ran dummy.sql): `admin@timbanganten.id` / `password123`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy

If using SSL certificate, upload `certs/ca.pem` to your repo.

## Database Schema

- **Admin, Approver, Pengawas** - Auth roles
- **User** - General users
- **Blok** - Cemetery plots (Dalem Kaum, Dayeuh Kolot, Karang Anyar)
- **Jenazah** - Deceased records
- **PenanggungJawab** - Responsible parties
- **Makam** - Active plots
- **MakamStatus** - Reserved plots
- **RelasiOrang** - User relationships

## Scripts

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run start            # Production server
npm run lint             # Lint code
npm run format           # Format code
npx prisma studio        # Database GUI
npx prisma generate      # Generate client
npx prisma db push       # Push schema changes
```
