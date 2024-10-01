# Car CRUD API with MongoDB

This project is a RESTful API that allows users to perform CRUD (Create, Read, Update, Delete) operations on a car database using MongoDB. It's built with Node.js and Express, providing a simple interface for managing car information.

## Features

- Create a new car entry.
- Read details of a car or a list of all cars.
- Update car information.
- Delete a car from the database.
- Efficient and scalable MongoDB database for storing car details.

## Technologies Used

- **Node.js**: For server-side logic.
- **Express**: As the framework for building the RESTful API.
- **MongoDB**: Database for storing car details.
- **Mongoose**: For interacting with MongoDB.
- **Postman**: For testing the API routes.

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MofokengTT21/restful-crud-api
   ```
   
2. Install dependencies:
   ```bash
   cd restful-crud-api
   npm install
   ```

3. Set up MongoDB:
   - Make sure MongoDB is running on your local machine or set up your cloud MongoDB connection string in the `.env` file.

4. Create a `.env` file in the root directory and add your MongoDB URI:
   ```bash
   MONGO_URI=mongodb://localhost:27017/carsdb
   ```

### Running the Application

Start the server:

```bash
npm start
```

The API will be running at `http://localhost:3000/`.

### API Endpoints

- `POST /api/cars` - Add a new car.
- `GET /api/cars` - Get all cars.
- `GET /api/cars/:id` - Get a specific car by ID.
- `PUT /api/cars/:id` - Update a car's details.
- `DELETE /api/cars/:id` - Delete a car by ID.

### Example Car Schema

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "re_number": "CL 23945",
  "color": "Skyblue"
}
```

### Testing the API

Use [Postman](https://www.postman.com/) or any API testing tool to interact with the endpoints.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
