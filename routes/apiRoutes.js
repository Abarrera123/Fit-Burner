
const Workout = require("../models/wokrout");
const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
//route to create a new workout
router.post("/api/workouts", ({body}, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(({error}) => {
            console.log(error);
        });
});
//route to edit a new workout
router.put("/api/workouts/:id", ({body, params}, res) => {
    console.log("PARAMS", body, params);

    Workout.findOneAndUpdate(
        {_id: params.id},
        {   $inc: {totalDuration: body.duration},
            $push: {exercises: body}},
        { new: true}
    )
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(({error}) => {
        console.log(error);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
    .limit(7)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(({error}) => {
        console.log(error);
    });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch(({error}) => {
        console.log(error);
    });
});


 module.exports = router; 