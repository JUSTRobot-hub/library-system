# Library System Backend

This is a library management system implemented using NestJS, MongoDB. It allows users to manage books, borrowers, and the borrowing process.

Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Getting Started](#getting-started)

## Objective

Design and implement a simple library management system to manage books and borrowers.

## Features

1. **Book Management**.
2. **Borrower Management**.
3. **Borrowing Process**.

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup `<span style="background-color: #FFFF00">`

1. Clone the repository:

```bash
$ git clone https://github.com/JUSTRobot-hub/library-system.git
$ cd library-system
```

2. Install dependencies:

```bash
$ npm install
$ npm i -g cross-env
```

3. Setup the enviornment

```
Create 2 .env file like (.env.example), 1 for development mode and the other for the production
Development Mode: .env.development
Production Mode: .env.production
```

4. How to run

```bash
$ npm run start:prod (for production mode)
$ npm run start:dev (for development mode)
```

### Backend URL

1. The backend APIs are accessible at the following base URL:
   [http://localhost:4040](http://localhost:4040)
2. Once the development server is running, open your web browser and navigate to the following URL:

   [http://localhost:4040/api-docs](http://localhost:4040/api-docs)

   This will open the Swagger UI documentation, where you can explore and interact with the API endpoints.

**Note:** The API Documentation is only working in development mode. it is disabled in production mode for security reasons.

There is a staff account associated with the cloud database:

email: test@gmail.com

password: testaccount

you can test the APIS through this account.
