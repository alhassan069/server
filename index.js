const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

const userRoute = require('./routes/user');
const messageRoute = require('./routes/message')
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connection successfull."))
    .catch((err) => console.log(err));

app.use(cors())
app.use(express.json());

app.use("/user", userRoute);
app.use('/message', messageRoute);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})