# User Authentication API

## Description

This project provides a user authentication system with registration, login, profile retrieval, and logout functionalities using Node.js, Express, and MongoDB.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd your-repo
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Register

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Status**: `201 Created`
  - **Body**:
    ```json
    {
      "message": "Sign Up Successful",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "jwt_token"
    }
    ```
- **Error Responses**:
  - **Status**: `400 Bad Request`
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - **Status**: `400 Bad Request`
    ```json
    {
      "message": "User already exists"
    }
    ```
  - **Status**: `500 Internal Server Error`
    ```json
    {
      "message": "Error message"
    }
    ```

### Login

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Login Successful",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "jwt_token"
    }
    ```
- **Error Responses**:
  - **Status**: `400 Bad Request`
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email",
          "param": "email",
          "location": "body"
        }
      ]
    }
    ```
  - **Status**: `401 Unauthorized`
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
  - **Status**: `500 Internal Server Error`
    ```json
    {
      "message": "Error message"
    }
    ```

### Get User Profile

- **URL**: `/api/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's profile.
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Success Response**:
  - **Status**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketid": "socket_id"
    }
    ```
- **Error Responses**:
  - **Status**: `401 Unauthorized`
    ```json
    {
      "message": "Unauthorized"
    }
    ```
  - **Status**: `500 Internal Server Error`
    ```json
    {
      "message": "Error message"
    }
    ```

### Logout

- **URL**: `/api/logout`
- **Method**: `GET`
- **Description**: Logs out the authenticated user.
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Success Response**:
  - **Status**: `200 OK`
    ```json
    {
      "message": "Logout Successful"
    }
    ```
- **Error Responses**:
  - **Status**: `500 Internal Server Error`
    ```json
    {
      "message": "Error message"
    }
    ```

## Authentication

- **Method**: JSON Web Tokens (JWT)
- **Header**: `Authorization: Bearer jwt_token`
- **Token Expiry**: 24 hours

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt

## License

This project is licensed under the MIT License.
