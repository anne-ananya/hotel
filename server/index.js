import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { checkIn, checkOut, createUser, verifyAdminLogin, bookRoom, scheduleService, bookTable } from './functions.js';

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
const port = 8080;

mongoose.connect(process.env.CONNECTION_URI,{
}).then(()=>{
  console.log('Connected to DB');
}).catch(err=>{
  console.log(`Error in Connecting to DB : ${err.message}`);
});

app.get('/', (req, res) => {
  res.send('Root Route');
});

app.post('/admin/verify-admin-login',verifyAdminLogin);
app.post('/admin/create-user',createUser);
app.put('/admin/check-in', checkIn);
app.put('/admin/check-out',checkOut);
app.put('/user/book-room',bookRoom);
app.put('/scheduler/schedule',scheduleService);
app.put('/user/book-restaurant',bookTable);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});