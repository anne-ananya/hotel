import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  bookedOn: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const RestaurantSchema = new mongoose.Schema({
    tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  bookedDates: {
    type: [BookingSchema],
    default: [],
  },
});

// Create the Room model
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

export {RestaurantModel};

