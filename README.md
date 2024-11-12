# Project: Library Management System


# Live URL:

```bash
https://library-management-taupe-ten.vercel.app/
```

# Project description
The Library Management System API is a backend solution designed to manage books, members, and borrowing activities efficiently. It features CRUD operations for books and members, uses UUIDs for unique identification, and includes endpoints for borrowing and returning books. The system also tracks overdue books with a 14-day policy, ensuring smooth library operations and robust data management.

# Technologies Used

- Typescript (Programming language)
- Express.js (Node.js framework)
- Prisma (Postgres ORM)
- PostgresSQL (Database)


# Features

* Sign up Member
* Manage Book
* Borrow Book
* Return Book
* Overdue Books


# Backend server setup and how to running

# step-1: initialize npm and setup basic express server

Initialize node package manager(NPM) with default input

```javascript
npm init -y
```

Install the express, cors, and dotenv package

```javascript
npm install express cors dotenv 
```

Make folder structure using modular pattern

```javascript
src
    app
      config
        index.ts
      middleware
        globalErrorHandler.ts
      routes
         index.ts
      shared
        prisma.ts
      modules
        book
            ...files
        member
            ...fils
        borrow
            ...files
        return
            ...files
    app.ts
    server.ts
```

Install types of node, express, and cors

```javascript
npm i --save-dev @types/cors @types/node @types/express
```

# step-2: initialize typescript with related package

Install typescript developer dependency

```javascript
npm install -D typescript
```

Initialize typescript and configuration it the tsconfig.json

```javascript
tsc --init
```

In the tsconfig change the root directory and out directory destination. (Note: uncomment the rootDir and outDir)

```javascript
"rootDir": "./src",
"outDir": "./dist",
```

Run typescript code install ts-node-dev as developer dependency

```javascript
npm install -D ts-node-dev
```

# step-3: install prisma and connect with project and .env code add

Install Prisma

```javascript
npm install prisma
```

Connect with prisma this following code

```javascript
import app from "./app";
import config from "./config";

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(`BOOKIE LISTENING ON PORT ${config.port} 👌`);
  });
}

main();
```

# step-4: Configuration the package.json with script

Main destination change that

```javascript
"main": "./dist/server.js",
```

Make the script for running project locally, build project, lint all file, fix problem using lint, and format code using prettier.

```javascript
  "scripts": {
    "build": "tsc",
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

# step-6: Install ZOD OR JOI validation package

Install ZOD package

```javascript
npm install zod
```

Install JOI package

```javascript
npm install joi
```

# step-7: Run project locally

step-7.1
Run eslint

```javascript
npm run lint
```

step-7.2
Run prettier

```javascript
npm run format
```

step-7.3
Build project

```javascript
npm run build
```

step-7.4
Run javascript file

```javascript
npm run start:prod
```

step-7.5
Run locally typescript file

```javascript
npm run start:dev
```



