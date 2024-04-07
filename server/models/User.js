import mongoose from 'mongoose';

const Status = {
    Booked: 'Booked',
    CheckedIn: 'CheckedIn',
    CheckedOut: 'CheckedOut',
    None : 'None'
};

const resStatus = {
    Booked : 'Booked',
    None : 'None'
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique:true, trim : true},
    mobileNumber: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), required: true, default : 'None' },
    password : {type : String, required :true},
    restaurantStatus : {type : String, enum : Object.values(resStatus), default : 'None'},
});

const User = mongoose.model('User', UserSchema);

export { User };