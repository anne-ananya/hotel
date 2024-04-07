import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    joinDate: { type: Date, required: true },
    salary: { type: Number, required: true }
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;