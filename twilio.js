require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSms = (question) => {
  
  let feq = parseFloat(question.frequency).toFixed(2);
  let topics = question.topics.map(topic => topic.name).join(', ');

  client.messages
    .create({
       body: `Today's question:\n\nLC ${question.id} - ${question.title}\n${question.lvl} - ${feq}\n${topics}\n${question.url}`,
       from: process.env.TWILIO_FROM_PHONE_NUMBER,
       to: process.env.TWILIO_TO_PHONE_NUMBER
     })
    .then(message => console.log(message.sid));
}

module.exports = sendSms;