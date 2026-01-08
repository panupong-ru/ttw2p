# ttw2p

This project is a web application built with Next.js, Elysia.js, and Prisma, a modern, fast, and efficient web framework.

# Features

- Modern UI with Material-UI components and Next.js framework
- RESTful API built with Next.js
- Database integration with MySQL using Prisma ORM
- API documentation with Scalar API Documentation
- Containerized development and deployment support with Docker

# Prerequisites

Before you begin, ensure you have the following installed:

- [NodeJS (LTS)](https://nodejs.org/en) (18.17 or higher) - Only needed for local development
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) - Required for containerized deployment
- [MySQL](https://www.mysql.com/) (8.0 or higher) - Only needed if running without Docker

## Docker Deployment (Recommended)

This is the easiest way to run the application on any machine.

### Quick Start with Docker

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ttw2p
   ```

2. **Create environment file (optional):**
   ```bash
   # Create .env file with your configuration
   # Or use the default values in docker-compose.yml
   ```

   Example `.env` file:
   ```env
   DATABASE_URL=mysql://ttw2p_user:ttw2p_password@mysql:3306/ttw2p
   AUTH_SECRET=your-secure-random-secret-here
   MODE=production
   TZ=Asia/Bangkok
   ```

3. **Build and start the application:**
   ```bash
   # Build ครั้งแรก (ใช้เวลา 5-10 นาที)
   docker-compose up -d --build
   
   # หรือใช้ BuildKit เพื่อ build เร็วขึ้น (Windows)
   $env:COMPOSE_DOCKER_CLI_BUILD=1; $env:DOCKER_BUILDKIT=1; docker-compose up -d --build
   ```

   **Troubleshooting:**
   - หากพบปัญหา DNS resolution error เมื่อ pull images:
     ```bash
     # วิธีที่ 1: Pull image โดยตรงก่อน
     docker pull mysql:8.0
     
     # วิธีที่ 2: เปลี่ยน DNS server ใน Docker Desktop
     # Settings > Docker Engine > เพิ่ม:
     # "dns": ["8.8.8.8", "1.1.1.1"]
     
     # วิธีที่ 3: ใช้ proxy (ถ้ามี)
     # สร้างไฟล์ ~/.docker/config.json และเพิ่ม proxy settings
     ```

4. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

5. **Access the application:**
   - Application: http://localhost:3000
   - MySQL Database: localhost:3306

6. **Login Credentials (Default Users):**
   - Username: `admin` / Password: `P@$sW0rd!`
   - Username: `operator` / Password: `P@$sW0rd!`
   - Username: `supervisor` / Password: `P@$sW0rd!`
   
   **⚠️ หมายเหตุ:** ถ้า login ได้ 200 OK แต่เข้าไม่ได้:
   - ตรวจสอบว่า database มี user หรือยัง: `docker-compose exec mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT LogInName FROM userLogIn;"`
   - ถ้ายังไม่มี user ให้ seed: `docker-compose exec app npx prisma db seed`
   - หรือใช้ script ตรวจสอบอัตโนมัติ:
     - Windows: `powershell .\check-db.ps1`
     - Linux/Mac: `bash check-db.sh`
   - ตรวจสอบ logs: `docker-compose logs app`

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up -d --build

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v

# Access database
docker-compose exec mysql mysql -u ttw2p_user -p ttw2p

# Run Prisma commands
docker-compose exec app npx prisma studio
docker-compose exec app npx prisma migrate deploy

# ตรวจสอบว่า database มี user หรือยัง
docker-compose exec mysql mysql -u ttw2p_user -pttw2p_password ttw2p -e "SELECT LogInName, FullName FROM userLogIn;"

# Seed database ใหม่ (ถ้ายังไม่มี user)
docker-compose exec app npx prisma db seed

# หรือใช้ script ตรวจสอบอัตโนมัติ (Linux/Mac)
# bash check-db.sh

# Database Management
# ดูข้อมูลที่เก็บใน Docker volume
docker volume inspect ttw2p_mysql_data

# Backup database
docker-compose exec mysql mysqldump -u root -prootpassword ttw2p > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -prootpassword ttw2p < backup.sql
```

### Docker Configuration

The `docker-compose.yml` includes:
- **MySQL 8.0** database with persistent storage
- **Next.js** application with automatic migrations and seeding
- Health checks and automatic restarts
- Network isolation

### Database Storage Location

**Default (Docker Volume):**
- ข้อมูล MySQL ถูกเก็บใน Docker volume ชื่อ `mysql_data`
- ข้อมูลจะไม่หายเมื่อ restart container
- ดูตำแหน่งที่เก็บ: `docker volume inspect ttw2p_mysql_data`

**ถ้าต้องการเก็บในโฟลเดอร์ที่เห็นได้ (เหมือน XAMPP):**
1. แก้ไข `docker-compose.yml`:
   ```yaml
   volumes:
     - ./data/mysql:/var/lib/mysql  # แทนที่ mysql_data:/var/lib/mysql
   ```
2. สร้างโฟลเดอร์: `mkdir -p data/mysql`
3. Restart: `docker-compose down && docker-compose up -d`

**⚠️ หมายเหตุ:** ถ้าเปลี่ยนจาก volume เป็น bind mount ต้อง copy ข้อมูลเก่าก่อน

## Local Development (Without Docker)

### Install dependencies

To install the project dependencies, run:

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the project root directory with the following variables:

```env
DATABASE_URL=mysql://user:password@localhost:3306/ttw2p
AUTH_SECRET=your-secure-random-secret-here
MODE=development
TZ=Asia/Bangkok
```

### Development

To start the development server run:

```bash
# Start database (if using Docker for database only)
docker-compose up mysql -d

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

The application should now be running on http://localhost:3000.

## API Documentation

This project uses Elysia Swagger to provide API documentation. You can access the API documentation by navigating to http://localhost:3000/api/docs.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev` Starts the development server
- `npm run build` Builds the app for production
- `npm run start` Runs the built app in production mode
- `npm run lint` Runs ESLint for code linting
- `npm run format` Formats code using Prettier

**Database Scripts**

- `npm run db:generate` Generates Prisma client
- `npm run db:pull` Pulls the current database schema
- `npm run db:migrate` Creates a new migration file without applying it
- `npm run db:deploy` Applies pending migrations to the database
- `npm run db:reset` Resets the database (drops all data and applies migrations)
- `npm run db:rollback` Rolls back the last migration (you'll be prompted to enter the migration name)
- `npm run db:seed` Seeds the database
- `npm run db:studio` Opens Prisma Studio for database management

## Acknowledgements

This project is built with the following technologies:

- [NextJS](https://nextjs.org/) (The React framework for production)
- [Material UI](https://mui.com/) (A comprehensive suite of UI tools and components)
- [Prisma](https://www.prisma.io/) (Next-generation ORM for Node.js and TypeScript)
- [TypeScript](https://www.typescriptlang.org/) (A typed superset of JavaScript that compiles to plain JavaScript)

- Input validation implemented on both client and server sides
- Session management with next auth
- Regular dependency updates and security patches
- Encryption for sensitive data in transit and at rest
- Sensitive data stored exclusively on server-side
- No sensitive information in localStorage or client storage
- Environment validation on application startup
- `.env` files excluded from version control `(added to .gitignore)`

```

```
