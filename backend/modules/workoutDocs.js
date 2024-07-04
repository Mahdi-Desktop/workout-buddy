const { default: mongoose } = require('mongoose')
const db = require('mongoose')
const Schema = db.Schema
const workoutSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        reps:{
            type: Number,
            required: true,
        },
        load:{
            type: Number,
            required: true,
        }

    }, {timestamps: true }
)

module.exports = db.model('Workout', workoutSchema)