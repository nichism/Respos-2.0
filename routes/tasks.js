const express = require('express');
const router = express.Router();
const Task = require('../models/task')

//Getting all
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks);
    } catch(err) {
        res.status(500).json({message: err.message}); //500 status code means server had error
    }
})
//Getting one
router.get('/:id', getTask, (req, res) => {
    res.json(res.task);
})
//Creating one
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        assigned_to: req.body.assigned_to,
        priority: false
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask); //201 means successfully created an object
    } catch(err) {
        res.status(400).json({message: err.message}); //400 means user sent bad data
    }
})
//Updating one
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.name != null) {
        res.task.name = req.body.name;
    }
    if (req.body.assigned_to != null) {
        res.task.assigned_to = req.body.assigned_to;
    }
    if (req.body.priority != null) {
        res.task.priority = req.body.priority;
    }
    if (req.body.date_prioritized != null) {
        res.task.date_prioritized = req.body.date_prioritized;
    }

    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({message: err.message}) //400 means user fault
    }
})
//Deleting one
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.deleteOne()
        res.status(204).json({message: 'Deleted subscriber'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

//Delete all
router.delete('/deleteAll', async (req,res) => {
    try {
        await Task.deleteMany({}) //empty filter
        res.status(204).json({message: "Successfully deleteed all tasks."});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

async function getTask(req, res, next) {
    let task;
    try {
        task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({message: "Cannot find task."}) //404 means server could not find something
        }
    } catch(err) {
        return res.status(500).json({message: err.message}); //500 means server fkd up
    }

    res.task = task;
    next();
}

module.exports = router;