require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Car = require("./models/carModel");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/blog", (req, res) => {
  res.send("Hello Blog, My name is Tshepo");
});

// Add a car [CREATE]
app.post("/cars", async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(200).json(car);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all cars [READ]
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a car by Id
app.get("/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res
        .status(404)
        .json({ message: `Cannot find any car with Id ${id}` });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import [BULK]
let importBulkDataTimeout = null;

async function importBulkData() {
  try {
    const filePath = path.join(__dirname, ".", "data", "initData.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileData);

    await Car.deleteMany();
    await Car.insertMany(data);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Trigger importBulkData with reset timer
app.post("/import-bulk", async (req, res) => {
  try {
    // Clear any existing timeout
    if (importBulkDataTimeout) {
      clearTimeout(importBulkDataTimeout);
    }

    // Set a new timeout
    importBulkDataTimeout = setTimeout(async () => {
      await importBulkData();
    }, 120000); // 2 minutes delay

    res.status(200).json({ message: "Import scheduled" });
  } catch (error) {
    console.error("Error scheduling import:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a car [UPDATE]
app.put("/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!car) {
      return res
        .status(404)
        .json({ message: `Cannot find any car with Id ${id}` });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete car [DELETE]
app.delete("/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res
        .status(404)
        .json({ message: `Cannot find any car with Id ${id}` });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: `Error deleting car with Id ${id}` });
  }
});

const uri = `mongodb+srv://${username}:${password}@tshepoapi.8ykrs.mongodb.net/?retryWrites=true&w=majority&appName=TshepoAPI`;

mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening to port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });
