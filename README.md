# Book_Search_Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## **Description**

The **Book Search Engine** is a full-stack web application that allows users to search for books using the Google Books API and save their favorite books to a personalized account. Built with the MERN (MongoDB, Express.js, React, Node.js) stack, the app has been refactored to use GraphQL with Apollo Server for efficient data querying and mutation. Users can create accounts, log in, and manage their saved books seamlessly.

This project demonstrates modern web development practices, including the use of GraphQL, Apollo Client, and secure user authentication with JSON Web Tokens (JWT).

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)


## **Features**

- **Search Books**: Search for books using the Google Books API.
- **User Authentication**: Secure user registration and login with JWT.
- **Save Books**: Save books to a personalized account for future reference.
- **Remove Books**: Remove books from the saved list.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.
- **GraphQL Integration**: Efficient data querying and mutation with Apollo Server and Client.

---

## **Technologies Used**

### **Frontend**
- React.js
- Apollo Client
- React Bootstrap

### **Backend**
- Node.js
- Express.js
- Apollo Server
- MongoDB with Mongoose

### **Other Tools**
- JSON Web Tokens (JWT) for authentication
- Google Books API for book search functionality
- TypeScript for type safety
- Vite for frontend bundling

---

## **Installation**

To run the application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AshB88/Book_Search_Engine.git
   cd Book_Search_Engine
   ```

2. **Install Dependencies**:
   - Install server dependencies:
     ```bash
     cd server
     npm install
     ```
   - Install client dependencies:
     ```bash
     cd ../client
     npm install
     ```

3. **Set Up Environment Variables**:

   - **Server**:
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     # Use the local MongoDB URI for development
     MONGODB_URI_LOCAL='mongodb://127.0.0.1:27017/googlebooks'

     # Secret key for signing JSON  TokensWeb (JWT)
     JWT_SECRET=your_jwt_secret_here

     # Node environment
     NODE_ENV=development
     ```

   - **Note**: Replace `your_jwt_secret_here` with a strong, unique secret key of your choice. This key will be used to sign and verify JWTs for user authentication.

   - **Client**:
   - Create a `.env` file in the `client` directory with the following variable:
   ```
     # GraphQL API endpoint
     VITE_GRAPHQL_URI=http://localhost:3001/graphql
     ```

4. **Start the Application**:
   - Start the backend server:
     ```bash
     cd server
     npm run start
     ```
   - Start the frontend client:
     ```bash
     cd ../client
     npm run dev
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.  

   - Alternatively, the application is deployed on Render and can be accessed at the following URL:  
    * https://book-search-engine-v4jk.onrender.com

---

## **Usage**

1. **Search for Books**:
   - Use the search bar to find books by title, author, or keyword.

2. **Create an Account**:
   - Register for an account to save your favorite books.

3. **Save Books**:
   - Click the "Save" button on any book to add it to your saved books list.

4. **View Saved Books**:
   - Navigate to the "See Your Books" page to view and manage your saved books.

5. **Remove Books**:
   - Click the "Delete" button to remove a book from your saved list.

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---

## **Contributing**

Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **Questions**

If you have any questions or feedback, feel free to reach out:

- **GitHub**: [AshB88](https://github.com/AshB88)
- **Email**: ashleighb.jjd@gmail.com

---

## Acknowledgements

This project was made possible with the help of various resources and contributions. Some of the code was sourced from the instructor-provided files, and additional assistance was provided by GitHub Copilot. Special thanks to the following:

- **Instructor**: For providing the initial project files and guidance.
- **GitHub Copilot**: For offering code suggestions and improvements throughout the development process.
