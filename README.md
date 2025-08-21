````markdown
# CRUD Challenge - Project Management System

A complete project management system built with Next.js 14+, featuring mock authentication, CRUD operations, and optimized caching.

## 🚀 Technologies

- **Next.js 14+** - App Router, Server Actions, Server Components
- **TypeScript** - Static typing
- **Prisma** - ORM for the database
- **Neon** - Serverless PostgreSQL
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

## ✨ Features

### Mock Authentication

- Email-based login system
- HTTP-only cookie sessions
- Middleware for route protection
- Automatic logout

### Project Management

- **Full CRUD**: Create, read, update, and delete projects
- **Visibility**: Public and private projects
- **Validation**: Client and server-side form validation

### Pages

- `/` - Homepage with navigation
- `/login` - Authentication page
- `/app/projects` - Private dashboard (requires login)
- `/projects` - Public projects list

### Performance

- **Caching System**: Specific tags for granular revalidation
- **Server Components**: Optimized server-side rendering
- **Loading States**: Loading indicators for all operations

## 🛠️ Local Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository>
   cd crud-challenge
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:

   ```env
   DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Apply schema to the database
   npx prisma db push

   # (Optional) Seed sample data
   # Execute SQL scripts in /scripts via Neon dashboard
   ```

5. **Run the project**

   ```bash
   npm run dev
   ```

   Access `http://localhost:3000`

## 📊 Database

### SQL Scripts

* `scripts/001-create-tables.sql` - Table creation
* `scripts/002-seed-data.sql` - Sample data

## 🚀 Deploy on Vercel

1. **Connect your repository**

   * Access [https://crud-challenge-one.vercel.app/login](https://crud-challenge-one.vercel.app/login)
   * Import your GitHub repository

2. **Configure environment variables**

   ```env
   DATABASE_URL=your_neon_connection_string
   ```

3. **Automatic deployment**

   * Vercel will build and deploy automatically
   * Prisma Client will be generated during the build

4. **Configure the database**

   * Run the SQL scripts in the Neon dashboard
   * Or use `npx prisma db push` locally pointing to production

## 📁 Project Structure

```text
├── app/
│   ├── actions/         # Server Actions
│   ├── app/projects/    # Protected pages
│   ├── login/           # Authentication
│   ├── projects/        # Public pages
│   └── globals.css      # Global styles
├── components/          # React components
├── lib/                 # Utilities
├── prisma/              # Database schema
├── scripts/             # SQL scripts
└── middleware.ts        # Route protection
```

## 🧪 Testing the System

### Example Users

After running the seed, you can log in with:

* `john@example.com`
* `jane@example.com`
* `bob@example.com`

### Test Flow

1. Go to `/login` and enter an email
2. Access `/app/projects` to manage your projects
3. Create public and private projects
4. Test filters and status changes
5. Visit `/projects` to see public projects
6. Test logout and route protection

## 🔧 Available Scripts

```bash
npm run dev          # Development
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Linting
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Apply schema
npx prisma studio    # Visual database interface
```
