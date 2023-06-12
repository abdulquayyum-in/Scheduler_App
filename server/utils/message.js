import twilio from "twilio"

const accountSid = 'ACc40f913afd5ded30e9275346d9d40da7'; // Your Account SID from www.twilio.com/console
const authToken = 'f41f3538da5850e343c4fc7b5e879b4e'; // Your Auth Token from www.twilio.com/console
    const client =twilio(accountSid, authToken);

async function sendMessage(pno,phonetoken) {

  try {
    const message = await client.messages.create({
      body: `Welcome to Scheduler App 
      Click this link inorder to verify your profile
      https://localhost:5001/api/user/verify/phone/${phonetoken}`,
      to: pno, // Text this number
      from: '+13396751795', // From a valid Twilio number
    });
    console.log(message.sid);
  } catch (error) {
    console.error(error);
  }
}
// sendMessage("+918712204003","1234")
export default sendMessage;