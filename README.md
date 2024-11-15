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
- Node.js
- Eslint
- Prettier
- Render
- vercel

## Features 

1. Book Management: Create, read, update, and delete books.
2. Member Management: Create, read, update, and delete library members
3. Borrowing System: Borrow and return books. Track borrow records
4. Overdue Book Tracking: List books that are past their due date
5. Error Handling: Consistent error response structure

## API Endpoints

- Books:

  - POST /api/books
  - GET /api/books
  - GET /api/books/:bookId
  - PUT /api/books/:bookId
  - DELETE /api/books/:bookId

- Members:

  - POST /api/members
  - GET /api/members
  - GET /api/members/:memberId
  - PUT /api/members/:memberId
  - DELETE /api/members/:memberId

- Borrow/Return:

  - POST /api/borrow
  - POST /api/return
  - GET /api/borrow/overdue

# Backend server setup and Instructions

1. Clone the repository:

```node
   git clone https://github.com/AALabonya/library-management-system
   ```
2. Install dependencies:
```node
   npm install
   ```
   
3. Set up the .env File
```node
     PORT = 5000;
     DATABASE_URL ='postgresql://username:password@localhost:5432/mydatabase?schema=public';
  ```
5. Generate Prisma Client
After setting up the `.env` file, generate the Prisma client based on our Prisma schema by running:

```node
npx prisma generate
```

4. Run Prisma migrations:
```node
   npx prisma migrate dev
 ```

5. Start the server:

```node
   npm run dev
   ```
