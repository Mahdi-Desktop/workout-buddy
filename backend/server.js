// imports
require('dotenv').config()
const express = require('express')
const app = express()
const workoutRout = require('./routes/workouts') 
const db = require('mongoose')

// connect to db
db.connect(process.env.URI)
    .then( () => {
        // Listen for req
        app.listen( process.env.PORT, () => {
                console.log("Connection established and Listening on port ", process.env.PORT)
            })
    })
    .catch( (error) => {
        console.log(error)
    })

// middleware
app.use (express.json())
app.use ( 
    (req, res, next) =>
    {
        console.log(req.path, req.method)
        next()
    }
)

// routes
app.use('/api/workout',workoutRout)

