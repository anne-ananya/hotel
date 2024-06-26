# Online Hotel Management System

## Getting Started

### Prerequisites

- Node.js

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/techlism/hotelease.git && cd hotelease/server
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Set up your `.env` file with your MongoDB URI:
   ```plaintext
   DATABASE_URI="your_mongodb_connection_string"
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

## API Endpoints

### Admin Module

- **Verify Admin Login**
  - **POST** `/admin/verify-admin-login`
  - Body:
    ```json
    {
      "email": "admin@example.com",
      "password": "password123"
    }
    ```

- **Create User**
  - **POST** `/admin/create-user`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "name": "John Doe",
      "mobileNumber": "1234567890",
      "password": "password123"
    }
    ```

### User Module

- **Book Room**
  - **PUT** `/user/book-room`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "roomNumber": "101",
      "bookedOn": "2024-01-01"
    }
    ```

- **Check-In**
  - **PUT** `/admin/check-in`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "roomNumber": "101"
    }
    ```

- **Check-Out**
  - **PUT** `/admin/check-out`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "roomNumber": "101"
    }
    ```

### Scheduler Module

- **Schedule Service**
  - **PUT** `/scheduler/schedule`
  - Body:
    ```json
    {
      "roomNumber": "101",
      "typeofSchedule": "cleaning",
      "scheduledTime": "2024-01-02T10:00:00Z",
      "email": "example@mail.com"
    }
    ```

### Restaurant Module

- **Book Table**
  - **PUT** `/user/book-restaurant`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "tableNumber": "5",
      "bookedOn": "2024-01-01T19:00:00Z"
    }
    ```

### Fetching Resources

- **Fetch Rooms**
  - **GET** `/admin/get-rooms`

- **Fetch Restaurant Tables**
  - **GET** `/admin/get-restaurant-tables`

- **Fetch Scheduled Services**
  - **GET** `/admin/get-scheduled-services`

- **Fetch Employees**
  - **GET** `/admin/get-employees`

- **Fetch Users**
  - **GET** `/admin/get-users`

### Creating Employee

- **Create Employee**
  - **POST** `/admin/create-employee`
  - Body:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "mobileNumber": "1234567890",
      "joinDate": "2024-01-01",
      "salary": 50000
    }
    ```

### Usage Examples

- **Fetch Rooms Example**

  Request: `GET /admin/get-rooms`

  Response:
  ```json
  [
    {
      "roomNumber": 101,
      "type": "Deluxe",
      "amenities": ["WiFi", "TV", "Minibar"],
      "availability": true
    },
    {
      "roomNumber": 102,
      "type": "Standard",
      "amenities": ["WiFi", "TV"],
      "availability": false
    }
  ]
  ```

- **Create Employee Example**

  Request: `POST /admin/create-employee` with body:

  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "mobileNumber": "1234567890",
    "joinDate": "2024-01-01",
    "salary": 50000
  }
  ```

