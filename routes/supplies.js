const express = require('express');
const router = express.Router();
const Supply = require('../models/supply')

//Getting all
router.get('/', async (req, res) => {
    try {
        const supplies = await Supply.find()
        res.json(supplies);
    } catch(err) {
        res.status(500).json({message: err.message}); //500 status code means server had error
    }
})
//Getting one
router.get('/:id', getSupply, (req, res) => {
    res.json(res.supply);
})
//Creating one
router.post('/', async (req, res) => {
    const supply = new Supply({
        name: req.body.name,
        assigned_to: req.body.assigned_to,
        priority: false
    });

    try {
        const newSupply = await supply.save();
        res.status(201).json(newSupply); //201 means successfully created an object
    } catch(err) {
        res.status(400).json({message: err.message}); //400 means user sent bad data
    }
})
//Updating one
router.patch('/:id', getSupply, async (req, res) => {
    if (req.body.name != null) {
        res.supply.name = req.body.name;
    }
    if (req.body.assigned_to != null) {
        res.supply.assigned_to = req.body.assigned_to;
    }
    if (req.body.priority != null) {
        res.supply.priority = req.body.priority;
    }
    if (req.body.date_prioritized != null) {
        res.supply.date_prioritized = req.body.date_prioritized;
    }

    try {
        const updatedSupply = await res.supply.save()
        res.json(updatedSupply);
    } catch (err) {
        res.status(400).json({message: err.message}) //400 means user fault
    }
})
//Deleting one
router.delete('/:id', getSupply, async (req, res) => {
    try {
        await res.supply.deleteOne()
        res.json({message: 'Deleted subscriber'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getSupply(req, res, next) {
    let supply;
    try {
        supply = await Supply.findById(req.params.id);
        if (supply == null) {
            return res.status(404).json({message: "Cannot find supply."}) //404 means server could not find something
        }
    } catch(err) {
        return res.status(500).json({message: err.message}); //500 means server fkd up
    }

    res.supply = supply;
    next();
}

module.exports = router;