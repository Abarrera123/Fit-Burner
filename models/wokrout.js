const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercise: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type"
                },
                name: {
                    type: String,
                    trim: true,
                    require: "Enter an exercise name"
                },
                duration: {
                    type: Number,
                    require: "Enter an exercise duration in minutes"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        toJSON:{
            virtuals: true
        }
    }
);

//adding a dynamic property to the schema
workoutSchema.virtual("totalDuration").get(function(){
    return this.exercise.reduce((total, exercise) =>{
        return total +exercise.duration;
    }, 0)
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;