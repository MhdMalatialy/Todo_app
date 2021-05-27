const express = require('express')
require('dotenv').config({ path: './config/.env' })
const mongoose =require('mongoose');
const todoRoute = require('./routes/todo')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(todoRoute)

mongoose.connect(process.env.MONGOOSEURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
useFindAndModify:false });

app.listen((PORT), () => {
    console.log(`server os up on port ${PORT}`)
})
