const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch(err) {
        res.status(500).json({message: err.message}); //500 status code means server had error
    }
})
//Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
})
//Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        color: req.body.color,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); //201 means successfully created an object
    } catch(err) {
        res.status(400).json({message: err.message}); //400 means user sent bad data
    }
})
//Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.color != null) {
        res.user.color = req.body.color;
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message}) //400 means user fault
    }
})
//Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({message: 'Deleted user'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: "Cannot find user."}) //404 means server could not find something
        }
    } catch(err) {
        return res.status(500).json({message: err.message}); //500 means server fkd up
    }

    res.user = user;
    next();
}

module.exports = router;