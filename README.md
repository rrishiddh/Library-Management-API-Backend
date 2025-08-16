# 📖 Library Management API with Express, TypeScript & MongoDB

- A Library Management API (Backend) built with Express.js, TypeScript and MongoDB Atlas (via Mongoose).

* * *

## Features

* Book Management: Create, read, update, and delete books
* Borrowing System: Handle book borrowing with quantity tracking
* Availability Control: Automatic availability updates based on stock
* Filtering & Sorting: Advanced book filtering by genre with sorting options
* Aggregation Pipeline: Borrowed books summary with MongoDB aggregation
* Data Validation: Comprehensive schema validation with Mongoose
* Middleware Implementation: Pre/post hooks for business logic
* Error Handling: Proper error responses with detailed messages
* TypeScript: Full type safety and modern JavaScript features

## Installation & Setup Steps

- Step 1: Clone Project Directory.
 
`git clone https://github.com/rrishiddh/Library-Management-API-Backend.git`

- Step 2: Install Project Dependencies.

` npm i`

- Step 3: Setup Environment Variables.

 Create a .env file in the root directory:

``` 
envPORT=5000
MONGODB_URI=YOUR_MONGODB_CONNECTION_URI
NODE_ENV=development
```

- Step 4: Run the Application.
`npm run dev`


- Step 5: Test API: Use Postman to test endpoints.


###

## Project Structure

* src/models/~ Mongoose models with validation and middleware
* src/controllers/~ Business logic and request handling
* src/routes/~ API route definitions
* src/config/~ Database configuration
* src/app.ts~ Express application setup
* src/server.ts~ Server initialization and startup


###

## API Endpoints

* Books Management
- For Create Book ~ POST /api/books
- Get All Books ~ GET /api/books 
- Get All Books ~ GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
- Get Get Book by ID ~ GET /api/books/:bookId
- Update Book by ID ~ PUT /api/books/:bookId
- Delete Book by ID ~ DELETE /api/books/:bookId
- Delete Book by ID ~ DELETE /api/books/:bookId

* Borrow a Book
- For Borrow a Book ~ POST /api/borrow
- Borrowed Books Summary ~ GET /api/borrow

### Dependencies:
- cors: ^2.8.5
- dotenv: ^16.5.0
- express: ^5.1.0
- mongoose: ^8.16.0

##  Link: 
### Vercel : [https://library-management-api-rrishiddh.vercel.app/](https://library-management-api-rrishiddh.vercel.app/)

###  Github-Repo : [https://github.com/rrishiddh/Library-Management-API-Backend](https://github.com/rrishiddh/Library-Management-API-Backend)


