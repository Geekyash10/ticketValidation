const user = require('../models/userModel');
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Mailgen } = require('mailgen');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports.generateQRCode = async (req, res) => {
    const { username, email } = req.body;
    const qr_id = uuidv4()

    const validated = false;
    if (!username || !email) {
        res.status(400).send('Please enter all fields');
    }

    const found = await user.findOne({ email });
    if (found) {
        res.status(400).send('User already exists with this mail');
    }

    const newUser = new user({ username, email, qr_id, validated });
    await newUser.save();
    res.json("User registered and Qr code generated successfully");
};

module.exports.getQRCode = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).send('Please enter all fields');
    }

    const found = await user.findOne({ email });

    if (!found) {
        res.status(400).send('User does not exist');
    }

    res.json(found.qr_id);
}


module.exports.validateUser = async (req, res) => {
    const { qr_id } = req.body;
    if (!qr_id) {
        res.status(400).send('Please enter all fields');
    }

    const found = user.findOne({ qr_id });
    if (!found) {
        res.status(400).send('User does not exist');
    }

    found.validated = true;
    await found.save();
    res.json("User validated successfully");
}

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:
        {
            user: 'mittalyas1234@gmail.com',
            pass: '123456',
        },

    });

const mailGenerator = new Mailgen(
    {
        theme: 'default',
        product:
        {
            name: 'Yash',
        },
    });
const { name, email } = req.body;
