const express = require('express');

const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

// register 
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateToken();
        res.status(201).send({user, token});
    } catch (error) {
        // console.log(error);
        res.status(400).send('Invalid Credentials.')
    }
})


// login user
router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()
        res.status(200).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid Email or Password.')
    }
})


// logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send('Unable to logout.');
    }
})


// logout from all devices
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send('Unable to logout.');
    }
})


// edit user data
router.patch('/', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password', 'email'];
    const isAllowed = updates.every(update => allowedUpdates.includes(update));
    if(!isAllowed) return res.status(400).send({error: 'Invalid Updates.'})
    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).send(req.user);
    } catch (error) {
        // console.log(error);
        res.status(400).send(error);
    }
})


// delete user
router.delete('/', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user)
    } catch (error) {
        // console.log(error);
        res.status(500).send('Unable to Delete user.')
    }
})

module.exports = router;