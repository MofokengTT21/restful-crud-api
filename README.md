# Car CRUD API with MongoDB

This project is a RESTful API built with **Node.js** and **Express** that allows users to perform CRUD (Create, Read, Update, Delete) operations on a car database using **MongoDB**. The API offers a scalable solution for managing car information, with bulk data import functionality and automatic data reset.

## Features

- **CRUD Operations**: Create, read, update, and delete car information.
- **Bulk Data Import**: Import car data from a file with a 2-minute delay after triggering.
- **Efficient MongoDB Database**: Use **MongoDB** with **Mongoose** for efficient, schema-based data storage.
- **Static File Support**: Serves static files through Express.

## Technologies Used

- **Node.js**: Backend runtime for server-side logic.
- **Express**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing car information.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **Cors**: Middleware for handling Cross-Origin Resource Sharing.
- **File System (fs)**: For handling bulk data imports.
- **Postman**: API testing tool (recommended for testing).

## Getting Started

### Prerequisites

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community) or use **MongoDB Atlas** for cloud-hosted databases.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MofokengTT21/restful-crud-api.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd restful-crud-api
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up MongoDB connection**:
   - Create a `.env` file in the root directory:
     ```bash
     touch .env
     ```
   - Add your MongoDB connection string in the `.env` file:
     ```env
     MONGO_URI=mongodb://localhost:27017/carsdb
     MONGODB_USERNAME=<your_username>
     MONGODB_PASSWORD=<your_password>
     ```

### Running the Application

1. **Start MongoDB** if running locally:
   ```bash
   mongod
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. The API will be running at `http://localhost:3000/`.

### API Endpoints

- **POST** `/cars` - Add a new car.
- **GET** `/cars` - Retrieve all cars.
- **GET** `/cars/:id` - Retrieve a specific car by ID.
- **PUT** `/cars/:id` - Update car details by ID.
- **DELETE** `/cars/:id` - Delete a car by ID.
- **POST** `/import-bulk` - Import bulk car data from a file.

### Car Schema Example

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "re_number": "CL 23945",
  "color": "Skyblue"
}
```

### Bulk Data Import Feature

- **Bulk Import**: The API includes a bulk data import function that clears existing car data and imports new car data from `data/initData.json` after a 2-minute delay. The timer can be reset if additional import requests are made before the timer ends.

### Example Bulk Data Import

To trigger the bulk import, send a `POST` request to `/import-bulk`:

```json
{
  "message": "Import bulk data request sent"
}
```

After 2 minutes, the data in `data/initData.json` will be imported, replacing the existing data in the database.

### Testing the API

Use [Postman](https://www.postman.com/) or any API testing tool to interact with the endpoints.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
