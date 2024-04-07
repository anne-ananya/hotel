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

const RoomSchema = new mongoose.Schema({
  roomNumber: {
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
const RoomModel = mongoose.model('Room', RoomSchema);

export {RoomModel};