const mongoose = require("mongoose");

// Define schema for cars
const carSchema = mongoose.Schema(
  {
    color: {
      type: String,
      required: [true, "Color is required"],
    },
    make: {
      type: String,
      required: [true, "Make is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    reg_number: {
      type: String,
      required: [true, "Registration number is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Create model and specify collection name
const Car = mongoose.model('Car', carSchema, 'cars'); // Specify 'cars' as the collection name

module.exports = Car;
