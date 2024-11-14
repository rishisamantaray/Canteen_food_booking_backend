const twilio = require('twilio');

const accountSid = 'AC51c1c8130d9b6f1c20a0a928aaa1790b';  // Use your Twilio account SID
const authToken = '670493439ce7f6de465ece4fc7c9d80a';    // Use your Twilio auth token
const client = new twilio(accountSid, authToken);

client.messages.create({
  body: 'Hello from Twilio!',
  from: '+14126936253',  // Replace with your Twilio phone number
  to: '+918249017577'     // Replace with a valid recipient phone number
})
.then(message => console.log('Message SID:', message.sid))
.catch(error => console.error('Twilio Error:', error));
