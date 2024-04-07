import mongoose from "mongoose";

const SchedulerSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    typeofSchedule: { type: String, enum: ['cleaning', 'dining'], required: true },
    scheduledTime: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed'], default: 'scheduled' }
});

const Scheduler = mongoose.model('Scheduler', SchedulerSchema);

export {Scheduler};