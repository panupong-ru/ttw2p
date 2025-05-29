# ttw2p

This project is a web application built with Next.js, Elysia.js, and Prisma, a modern, fast, and efficient web framework.

# Features

- Modern UI with Material-UI components and Next.js framework
- RESTful API built with Next.js
- Database integration with Microsoft SQL Server using Prisma ORM
- API documentation with Scalar API Documentation
- Containerized development and deployment support with Docker

# Prerequisites

Before you begin, ensure you have the following installed:

- [NodeJS (LTS)](https://nodejs.org/en) (18.17 or higher)
- [Microsoft SQL Server (MSSQL)](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (2019 or higher)
- [Docker](https://www.docker.com/) (Optional, for containerized development)

## Install dependencies

To install the project dependencies, run:

```bash
npm install
```

## Set up environment variables

Copy the .env.example file, rename it to .env, and place it in the project root directory. This file will serve as the application's configuration.

```bash
cp .env.example .env
```

Edit the .env file and adjust the values as needed.

## Development

To start the development server run:

```bash
docker-compose up
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
