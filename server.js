const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// Twilio credentials (replace with your Twilio account SID and Auth Token)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle ticket booking
app.post('/book-ticket', (req, res) => {
  const { mobileNumber, ticketId, foodItem, quantity } = req.body;

  if (!mobileNumber || !ticketId || !foodItem || !quantity) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Prepare the SMS message
  const message = `Your food order has been confirmed! Ticket ID: ${ticketId}\nFood Item: ${foodItem}\nQuantity: ${quantity}\nThank you for booking with us!`;

  // Send SMS using Twilio
  client.messages.create({
    body: message,
    from:'+14126936253', // Your Twilio phone number
    // messagingServiceSid: 'MG0d49df89d39473a2b31476790dc6677a',
    to: mobileNumber
  })
    .then((message) => {
      console.log('Message sent: ', message.sid);
      res.status(200).json({ message: 'Ticket booked and SMS sent!' });
    })
    .catch((error) => {
      console.error('Error sending SMS: ', error);
      res.status(500).json({ error: 'Failed to send SMS.',
        details: error.message,  // Log the error message from Twilio
        code: error.code,        // Log the error code from Twilio (if available)
        moreInfo: error.moreInfo // Provide a link for more information (Twilio docs)
       });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
