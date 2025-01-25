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

### User Registration

- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
    - fullname: (object) 
      - firstname: (string). firstname should be at least 3 characters long
      - lastname: (string). lastname should be at least 3 characters long
    - email: (string). email should be a valid email address
    - password: (string). password should be at least 6 characters long

- **Example**:
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
    - messege: (string). messege should be "Sign Up Successful"
    - user: (object)
      - _id: (string). user_id should be a string
      - fullname: (object)
        - firstname: (string). firstname should be at least 3 characters long
        - lastname: (string). lastname should be at least 3 characters long
      - email: (string). email should be a valid email address
    - token: (string). token should be a string

- **Example**:
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

### User Login

- **URL**: `/users/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
    - email: (string). email should be a valid email address
    - password: (string). password should be at least 6 characters long

- **Example**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  - **Status**: `200 OK`
  - **Body**:
    - messege: (string). messege should be "Login Successful"
    - user: (object)
      - _id: (string). user_id should be a string
      - fullname: (object)
        - firstname: (string). firstname should be at least 3 characters long
        - lastname: (string). lastname should be at least 3 characters long
      - email: (string). email should be a valid email address
    - token: (string). token should be a string

- **Example**:
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

- **URL**: `/users/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's profile.
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Success Response**:
  - **Status**: `200 OK`
  - **Body**:
    - _id: (string). user_id should be a string
    - fullname: (object)
      - firstname: (string). firstname should be at least 3 characters long
      - lastname: (string). lastname should be at least 3 characters long
    - email: (string). email should be a valid email address
    - socketid: (string). socket_id should be a string

- **Example**:
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

### User Logout

- **URL**: `/users/logout`
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

### Driver Registration

- **URL**: `/drivers/register`
- **Method**: `POST`
- **Description**: Registers a new driver.
- **Request Body**:
    - fullname: (object) 
      - firstname: (string). firstname should be at least 3 characters long
      - lastname: (string). lastname should be at least 3 characters long
    - email: (string). email should be a valid email address
    - password: (string). password should be at least 6 characters long
    - vehicle: (object)
      - color: (string). color should be at least 3 characters long
      - plateNumber: (string). plateNumber should be at least 3 characters long
      - capacity: (number). capacity should be a number
      - vehicleType: (string). vehicleType should be at least 3 characters long

- **Example**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "SecurePassword123",
    "vehicle": {
      "color": "Blue",
      "plateNumber": "ABC1234",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
  ```
- **Success Response**:
  - **Status**: `201 Created`
  - **Body**:
    - messege: (string). messege should be "Sign Up Successful"
    - driver: (object)
      - _id: (string). driver_id should be a string
      - fullname: (object)
        - firstname: (string). firstname should be at least 3 characters long
        - lastname: (string). lastname should be at least 3 characters long
      - email: (string). email should be a valid email address
      - vehicle: (object)
        - color: (string). color should be at least 3 characters long
        - plateNumber: (string). plateNumber should be at least 3 characters long
        - capacity: (number). capacity should be a number
        - vehicleType: (string). vehicleType should be at least 3 characters long
    - token: (string). token should be a string

- **Example**:
    ```json
    {
      "message": "Sign Up Successful",
      "driver": {
        "_id": "driver_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "Blue",
          "plateNumber": "ABC1234",
          "capacity": 4,
          "vehicleType": "Sedan"
        }
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
      "message": "Driver already exists"
    }
    ```
  - **Status**: `500 Internal Server Error`
    ```json
    {
      "message": "Error message"
    }
    ```

### Driver Login

- **URL**: `/drivers/login`
- **Method**: `POST`
- **Description**: Logs in an existing driver.
- **Request Body**:
    - email: (string). email should be a valid email address
    - password: (string). password should be at least 6 characters long

- **Example**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Success Response**:
  - **Status**: `200 OK`
  - **Body**:
    - messege: (string). messege should be "Login Successful"
    - driver: (object)
      - _id: (string). driver_id should be a string
      - fullname: (object)
        - firstname: (string). firstname should be at least 3 characters long
        - lastname: (string). lastname should be at least 3 characters long
      - email: (string). email should be a valid email address
      - vehicle: (object)
        - color: (string). color should be at least 3 characters long
        - plateNumber: (string). plateNumber should be at least 3 characters long
        - capacity: (number). capacity should be a number
        - vehicleType: (string). vehicleType should be at least 3 characters long
    - token: (string). token should be a string

- **Example**:
    ```json
    {
      "message": "Login Successful",
      "driver": {
        "_id": "driver_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "Blue",
          "plateNumber": "ABC1234",
          "capacity": 4,
          "vehicleType": "Sedan"
        }
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

### Get Driver Profile

- **URL**: `/drivers/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated driver's profile.
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Success Response**:
- **Status**: `200 OK`
- **Body**:
    - _id: (string). driver_id should be a string
    - fullname: (object)
        - firstname: (string). firstname should be at least 3 characters long
        - lastname: (string). lastname should be at least 3 characters long
    - email: (string). email should be a valid email address
    - vehicle: (object)
        - color: (string). color should be at least 3 characters long
        - plateNumber: (string). plateNumber should be at least 3 characters long
        - capacity: (number). capacity should be a number
        - vehicleType: (string). vehicleType should be at least 3 characters long
    - location: (object)
        - latitude: (number). latitude should be a number
        - longitude: (number). longitude should be a number

- **Example**:
  ```json
  {
    "_id": "driver_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plateNumber": "ABC1234",
      "capacity": 4,
      "vehicleType": "Sedan"
    },
    "location": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
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

### Driver Logout

- **URL**: `/drivers/logout`
- **Method**: `GET`
- **Description**: Logs out the authenticated driver.
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
