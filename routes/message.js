const Message = require('../models/Message');
const router = require("express").Router();

// twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioSid = process.env.TWILIO_SID;
router.post('/send', async(req, res) => {
    const { phone, message } = req.body;
    client.messages.create({
        body: message,
        messagingServiceSid: twilioSid,
        to: '+91' + phone,
    }).then((message) => {
        let dbMessage = {...req.body, status: message.status };
        console.log("dbmessage", dbMessage)
        Message.create(dbMessage, function(err) {
            if (!err) {
                res.status(200).json({ message: 'SMS Send Successfully.' });
            } else {
                res.status(400).json({ message: err.message });
            }
        });
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
})


router.get('/history', async(req, res) => {
    try {
        const history = await Message.find({}).sort({ _id: -1 }).lean().exec();
        res.status(200).json(history)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;