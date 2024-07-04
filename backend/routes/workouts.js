const express = require('express')
const rout = express.Router()
const
{ Insert, Select, GrabId, deleteWorkout, updateWorkout } = require('../controllers/workoutController')

// Get all
rout.get ( "/", Select )

// get single
rout.get ( "/:id", GrabId )

// post
rout.post( "/", Insert )


// delete
rout.delete( "/:id", deleteWorkout )

// update
rout.patch( "/:id", updateWorkout )

module.exports = rout