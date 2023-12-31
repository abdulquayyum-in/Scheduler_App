

import nodemailer from "nodemailer";
import config from "config";

let {HOST, AUTH, PORT} = config.get("EMAIL_SMTP")
async function sendMail(obj) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: AUTH.USER, 
      pass: AUTH.PASS, 
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Scheduler Application" <info@quayyum.in>', // sender address
    to: obj.receiver, // list of receivers
    subject: obj.subject, // Subject line
    text: obj.text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// sendMail({text: "HELLO NEW MAIL ", subject: "New Mail", receiver: "adnanali.in@gmail.com"} )
export default sendMail