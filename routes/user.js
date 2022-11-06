const User = require('../models/User');
const router = require("express").Router();

// create an user
router.post('/create', async(req, res) => {
    // check if phone number is not provided. then return error
    if (!req.body.phone) {
        res.status(406).send({ "message": "Phone Number missing" })
    }
    try {
        // check if the phone number provided already exists.
        let user = await User.findOne({ phone: req.body.phone }).lean().exec();

        // if it already exists throw an error
        if (user) return res.status(400).json({ "status": "failed", "messsage": "Please provide a different phone number" });

        // else we will create the user
        user = await User.create(req.body);

        res.status(201).json({ user })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
});

// find all users in the db
router.get('/all', async(req, res) => {
    try {
        const users = await User.find({}).sort({ _id: -1 }).lean().exec();
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
});

// find a single user by their id
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
});

module.exports = router;