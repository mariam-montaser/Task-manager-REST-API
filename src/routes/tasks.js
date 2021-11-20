
const express = require('express');

const Task = require('../models/task');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

// get all tasks
router.get('/', auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user._id).populate('tasks').exec();
        res.status(200).send(user.tasks);
    } catch (error) {
        // console.log(error);
        res.status(500).send('Unable to fetch data.');
    }
})

// get a single task
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task) return res.status(404).send();
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send('Unable to fetch data.');
    }
})

// create new task
router.post('/', auth, async (req, res) => {
    const task = new Task({...req.body, owner: req.user._id});
    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        // console.log(error);
        res.status(400).send(error)
    }
})

// update task
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'description', 'complete'];
    const isAllowed = updates.every(update => allowedUpdates.includes(update));
    if(!isAllowed) return res.status(400).send({error: 'Invalid Updates.'})
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task) return res.status(404).send();
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.status(200).send(task);
    } catch (error) {
        // console.log(error);
        res.status(400).send(error);
    }
})

// delete task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    } catch (error) {
        // console.log(error);
        res.status(500).send('Unable to delete task.')
    }
})

module.exports = router;