const Workout = require('../modules/workoutDocs')
const db = require('mongoose')
// get all workout
const Select = async (req, res) => {
    const display = await Workout.find({}).sort({createdAt: -1})
    
    res.status(200).json(display)
}

// get a single workout
const GrabId = async (req, res) => {
    const {id} = req.params
    if (!db.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.stauts(404).json({error: 'No such workout'})
    } res.status(200).json(workout)
}

// post (create new one)
const Insert = async (req, res) => {

    const {title, reps, load} = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

// update
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if (!db.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, 
        {
            ...req.body
        })

    if (!workout) {
        return res.stauts(404).json({error: 'No such workout'})
    } res.status(200).json(workout, 'Workout Updated')
}

// delete
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!db.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.stauts(404).json({error: 'No such workout'})
    } res.status(200).json(workout, 'This Workout has been Deleted')
}


module.exports = { Insert, Select, GrabId, deleteWorkout, updateWorkout }