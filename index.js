const http = require('http')
const express = require('express')
const dotenv = require('dotenv').config()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')



const app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors())

const Painting = require('./models/Painting')

const url = process.env.MONGODB_URI
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }, (error) =>{
        if(error){
            console.log(error)
        }
        console.log('connected to mongoDB')

    })
    

app.get('/', (req, res) =>{
    res.send('Hello world this is my first page')
})

app.get('/painting', async (req, res) =>{
   const paint = await Painting.find()
   const num = Math.floor(Math.random() * paint.length)
   const a = paint[num]
   res.send(a)
})

app.post('/painting/getid', async (req, res) =>{
    const id = req.body.id
    console.log(req.body)
    console.log("id", id)
    const paint = await Painting.findOne({_id: id})
    res.send(paint)
})

app.post('/painting', async (req, res) =>{
    const name = req.body.name
    const link = req.body.link
    const x = await Painting.create({name: name, link: link})
    res.json(x)
})

app.post('/painting/submit', async (req, res) =>{
    const id = req.body.id
    const resp = req.body.responses
    console.log("id", id)
    console.log("resp", resp)
    let paint = await Painting.findOne({ _id: id })
    console.log(paint.responses)
    paint.responses.push(resp)
    paint.save()
    res.json(paint.responses)
})


const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Hello Parth I am listening at port ${PORT}`)
})