## API Documentation

### Authentication Endpoints (`/auth`)

#### 1. **Register a New User**
- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user with email, password, and name.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:**
  - **201 Created:** User registered successfully.
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "user123",
        "email": "user@example.com",
        "name": "John Doe"
      }
    }
    ```
  - **400 Bad Request:** User already exists.
  - **500 Internal Server Error:** Error message.

#### 2. **Login an Existing User**
- **Endpoint:** `POST /auth/login`
- **Description:** Logs in a user with email and password.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - **200 OK:** Login successful with JWT token.
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token-here"
    }
    ```
  - **400 Bad Request:** Invalid credentials.
  - **500 Internal Server Error:** Error message.

---

### Lock Management Endpoints (`/locks`)

#### 3. **Create a New Lock**
- **Endpoint:** `POST /locks/create`
- **Description:** Creates a new lock with specified settings.
- **Request Body:**
  ```json
  {
    "ownerId": "user123",
    "lockName": "Front Door",
    "unlockId": "uniqueCode123",
    "rotations": 3
  }
  ```
- **Response:**
  - **201 Created:** Lock created successfully.
    ```json
    {
      "message": "Lock created successfully",
      "lock": {
        "id": "lock123",
        "ownerId": "user123",
        "lockName": "Front Door",
        "unlockId": "uniqueCode123",
        "rotations": 3
      }
    }
    ```
  - **500 Internal Server Error:** Error message.

#### 4. **Get Lock Details by ID**
- **Endpoint:** `GET /locks/:id`
- **Description:** Retrieves lock details by ID.
- **Response:**
  - **200 OK:** Lock details.
    ```json
    {
      "id": "lock123",
      "ownerId": "user123",
      "lockName": "Front Door",
      "unlockId": "uniqueCode123",
      "rotations": 3
    }
    ```
  - **404 Not Found:** Lock not found.
  - **500 Internal Server Error:** Error message.

#### 5. **Update Lock Settings by ID**
- **Endpoint:** `PUT /locks/:id`
- **Description:** Updates settings for a specific lock.
- **Request Body:** (Any fields you want to update, e.g., `lockName` or `rotations`)
  ```json
  {
    "lockName": "Updated Front Door",
    "rotations": 4
  }
  ```
- **Response:**
  - **200 OK:** Lock updated successfully.
  - **500 Internal Server Error:** Error message.

#### 6. **Delete a Lock by ID**
- **Endpoint:** `DELETE /locks/:id`
- **Description:** Deletes a lock by its ID.
- **Response:**
  - **200 OK:** Lock deleted successfully.
  - **500 Internal Server Error:** Error message.

#### 7. **Get All Locks Owned by a User**
- **Endpoint:** `GET /locks/user/:userId`
- **Description:** Retrieves all locks owned by a specific user.
- **Response:**
  - **200 OK:** List of locks.
    ```json
    [
      {
        "id": "lock123",
        "ownerId": "user123",
        "lockName": "Front Door",
        "unlockId": "uniqueCode123",
        "rotations": 3
      },
      {
        "id": "lock456",
        "ownerId": "user123",
        "lockName": "Back Door",
        "unlockId": "uniqueCode456",
        "rotations": 2
      }
    ]
    ```
  - **500 Internal Server Error:** Error message.

---

### Permission Management Endpoints (`/permissions`)

#### 8. **Grant Unlock Permission to a User**
- **Endpoint:** `POST /permissions/grant`
- **Description:** Grants a user permission to unlock a specific lock.
- **Request Body:**
  ```json
  {
    "lockId": "lock123",
    "userId": "user456",
    "level": "unlock"
  }
  ```
- **Response:**
  - **200 OK:** Permission granted successfully.
  - **500 Internal Server Error:** Error message.

#### 9. **Revoke Unlock Permission from a User**
- **Endpoint:** `POST /permissions/revoke`
- **Description:** Revokes a user’s permission to unlock a specific lock.
- **Request Body:**
  ```json
  {
    "lockId": "lock123",
    "userId": "user456"
  }
  ```
- **Response:**
  - **200 OK:** Permission revoked successfully.
  - **500 Internal Server Error:** Error message.

#### 10. **Attempt to Unlock a Lock (Verify Permissions)**
- **Endpoint:** `POST /permissions/unlock`
- **Description:** Attempts to unlock a lock by verifying if the user has permission.
- **Request Body:**
  ```json
  {
    "lockId": "lock123",
    "userId": "user456"
  }
  ```
- **Response:**
  - **200 OK:** Unlock successful.
  - **403 Forbidden:** Permission denied.
  - **500 Internal Server Error:** Error message.

#### 11. **Get All Users with Access to a Lock**
- **Endpoint:** `GET /permissions/:lockId/users`
- **Description:** Retrieves all users who have permission to unlock a specific lock.
- **Response:**
  - **200 OK:** List of users with access.
    ```json
    [
      {
        "userId": "user456",
        "level": "unlock"
      },
      {
        "userId": "user789",
        "level": "admin"
      }
    ]
    ```
  - **500 Internal Server Error:** Error message.