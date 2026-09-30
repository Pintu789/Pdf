const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET'
});

// Order Create Route
app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: 199 * 100, // Amount paise mein hota hai (199 INR = 19900 paise)
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send("Kuch error aa gaya!");
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
