import Admin from './models/Admin.js';
import {User} from './models/User.js';
import {RoomModel} from './models/Room.js';
import {Scheduler} from './models/Scheduler.js';
import { RestaurantModel } from './models/Restaurant.js';

export async function verifyAdminLogin(req, res){
    try {
        // console.log(req.body)
        const { email, password } = req.body;
        // console.log(email, password);
        let admin = await Admin.findOne({email});
        if(!admin) return res.status(404).json({'Not found' : 'following email has no account'});
        if(admin && admin.password === password){
            return res.status(200).json({"success" : "You are now logged in"});
        }
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export async function createUser(req,res){
    try {
        const {email, name, mobileNumber, password} = req.body;
        if(!email || !name || !mobileNumber || !password){
            return res.status(400).json({"missing" : "some parameters are missing"});
        }
        if(!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.indexOf('.')){
            return res.status(400).json({"invalid_email" :'Not a valid email'});
        }
        let newUser = new User({name,email,mobileNumber,password});
        const createStatus = await newUser.save();
        if(createStatus._id){
            return res.status(200).json({"success" : "account created"});
        }
        else return res.status(500).json({"failure" : "unable to create user"})
        
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export async function checkIn(req, res){
    try {
        let { email, roomNumber } = req.body;

        if(!email ) {
            return res.status(400).json({"failure" : "no email found"});
        }
        
        if(!roomNumber) return res.status(400).json({"failure" : "No roomNumber found"});
        
        if(!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.indexOf('.')){
            return res.status(400).json({"failure" :'Not a valid email'});
        }
        if(parseInt(roomNumber) === NaN) return res.status(400).json({"failure" : "should be a number"});
        roomNumber = parseInt(roomNumber);
        const roomDetails = await RoomModel.findOne({roomNumber});
        const user = await User.findOne({email});
        if(user.status === 'CheckedIn' || user.status === 'CheckedOut'){
            return res.status(400).json({"failure" : "user has already checked out or checked in"});
        }
        if(!user) return res.status(404).json({"failure" : "No account, please get registered"});
        if(!roomDetails) return res.status(404).json({"failure" : "No room with this roomNumber found"});
        for (let detail of roomDetails.bookedDates){
            if(detail.email === user.email) {
                user.status = 'CheckedIn';
                user.save();
                return res.status(200).json({"success" : "successfully checked in"});
            }
            else return res.status(404).json({"failure" : "you have no bookings for this room"});
        }
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }

}


export async function checkOut(req, res){
    try {
        let { email, roomNumber } = req.body;

        if(!email ) {
            return res.status(400).json({"failure" : "no email found"});
        }
        
        if(!roomNumber) return res.status(400).json({"failure" : "No roomNumber found"});
        
        if(!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.indexOf('.')){
            return res.status(400).json({"failure" :'Not a valid email'});
        }
        if(parseInt(roomNumber) === NaN) return res.status(400).json({"failure" : "should be a number"});
        roomNumber = parseInt(roomNumber);
        const roomDetails = await RoomModel.findOne({roomNumber});
        const user = await User.findOne({email});
        if(user.status === 'CheckedOut'){
            return res.status(400).json({"failure" : "user has already checked out"});
        }
        if(!user) return res.status(404).json({"failure" : "No account, please get registered"});
        if(!roomDetails) return res.status(404).json({"failure" : "No room with this roomNumber found"});
        for (let i = 0; i < roomDetails.bookedDates.length; i++){
            if(roomDetails.bookedDates[i].email === user.email) {
                user.status = 'CheckedOut';
                await user.save();
                roomDetails.bookedDates.splice(i, 1);
                await roomDetails.save();
                return res.status(200).json({"success" : "successfully checked out"});
            }
        }
        return res.status(404).json({"failure" : "you have no bookings for this room"});
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export async function bookRoom(req, res){
    try {
        let { email, roomNumber, bookedOn } = req.body;

        if(!email ) {
            return res.status(400).json({"failure" : "no email found"});
        }
        
        if(!roomNumber) return res.status(400).json({"failure" : "No room number found"});
        
        if(!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.indexOf('.')){
            return res.status(400).json({"failure" :'Not a valid email'});
        }
        if(parseInt(roomNumber) === NaN) return res.status(400).json({"failure" : "room number should be a number"});
        roomNumber = parseInt(roomNumber);
        const roomDetails = await RoomModel.findOne({roomNumber});
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({"failure" : "No account, please get registered"});
        if(!roomDetails) return res.status(404).json({"failure" : "No room with this room number found"});

        if(user.status === 'CheckedIn'){
            return res.status(400).json({"failure" : "user has already checked in"});
        }

        for (let detail of roomDetails.bookedDates){
            if(detail.email === user.email) {
                return res.status(400).json({"failure" : "you have already booked this room"});
            }
            if(detail.roomNumber === roomNumber && detail.bookedOn === bookedOn){
                return res.status(400).json({"failure" : "room is already booked for this date"});        
            }
        }
        roomDetails.bookedDates.push({bookedOn, email});
        user.status = 'Booked';
        await roomDetails.save();
        await user.save();
        return res.status(200).json({"success" : "successfully booked"});
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export async function scheduleService(req, res){
    try {
        let { roomNumber, typeofSchedule, scheduledTime, email } = req.body;

        if(!roomNumber ) {
            return res.status(400).json({"failure" : "no roomNumber found"});
        }
        
        if(!typeofSchedule) return res.status(400).json({"failure" : "No type of schedule found"});
        
        if(!scheduledTime) return res.status(400).json({"failure" : "No scheduled time found"});
        
        if(typeofSchedule !== 'cleaning' && typeofSchedule !== 'dining'){
            return res.status(400).json({"failure" : "Invalid type of schedule"});
        }
        if(parseInt(roomNumber) === NaN) return res.status(400).json({"failure" : "room number should be a number"});
        roomNumber = parseInt(roomNumber);
        const roomDetails = await RoomModel.findOne({roomNumber});
        if(!roomDetails) return res.status(404).json({"failure" : "No room with this room number found"});
        if(roomDetails.bookedDates.length === 0) return res.status(400).json({"failure" : "room is not booked"});
        let scheduler = await Scheduler.findOne({roomNumber});
        if(scheduler &&(scheduler.typeofSchedule === typeofSchedule && scheduler.status === 'scheduled')) return res.status(400).json({"failure" : "same service has been already scheduled for this room"});

        for (let detail of roomDetails.bookedDates){
            if(detail.email !== email) {
                return res.status(400).json({"failure" : "you have not booked this room"});
            }
            if(detail.email === email) {
                // user has booked this room
                // check user is checked in
                let user = await User.findOne({email});
                if(user.status !== 'CheckedIn') return res.status(400).json({"failure" : "user has not checked in"});
                if(user.status === 'None') return res.status(400).json({"failure" : "user has not booked the room"});

                // now schedule the service request
                if(scheduler){
                    scheduler.typeofSchedule = typeofSchedule;
                    scheduler.scheduledTime = scheduledTime;
                    scheduler.status = 'scheduled';
                    scheduler.roomNumber = roomNumber;
                    await scheduler.save();
                    return res.status(200).json({"success" : "successfully scheduled"});
                }
                else {
                    let newScheduler = new Scheduler({roomNumber, typeofSchedule, scheduledTime, status : 'scheduled'});
                    await newScheduler.save();
                    return res.status(200).json({"success" : "successfully scheduled"});
                }
            }
        }
        return res.status(404).json({"failure" : "you have no bookings for this room"});

    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }    
}

export async function bookTable(req, res){
    try {
        let { email, tableNumber, bookedOn } = req.body;

        if(!email ) {
            return res.status(400).json({"failure" : "no email found"});
        }
        
        if(!tableNumber) return res.status(400).json({"failure" : "No table number found"});
        
        if(!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.indexOf('.')){
            return res.status(400).json({"failure" :'Not a valid email'});
        }
        if(parseInt(tableNumber) === NaN) return res.status(400).json({"failure" : "table number should be a number"});
        tableNumber = parseInt(tableNumber);

        const restaurantDetails = await RestaurantModel.findOne({tableNumber});
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({"failure" : "No account, please get registered"});
        if(!restaurantDetails) return res.status(404).json({"failure" : "No table with this table number found"});

        if(user.restaurantStatus === 'Booked'){
            return res.status(400).json({"failure" : "user has already booked a table"});
        }

        for (let detail of restaurantDetails.bookedDates){
            if(detail.email === user.email) {
                return res.status(400).json({"failure" : "you have already booked this table"});
            }

            if(detail.tableNumber === tableNumber && detail.bookedOn === bookedOn){
                return res.status(400).json({"failure" : "table is already booked for this date"});        
            }
        }
        restaurantDetails.bookedDates.push({bookedOn, email});
        user.restaurantStatus = 'Booked';
        await restaurantDetails.save();
        await user.save();
        return res.status(200).json({"success" : "successfully booked"});
    } catch (error) {
        return res.status(500).json({"error" : `Internal server error ${error}`});
    }
}