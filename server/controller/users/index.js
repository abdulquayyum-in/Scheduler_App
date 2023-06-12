import express from "express"
import { errorMiddleware, loginValidations, registerValidations } from "../../middleware/validation/index.js"
import sendmail from "../../utils/mail.js"
import User from "../../models/users/index.js"
import bcrypt from "bcrypt"
import randomstring from "../../utils/index.js"
import nodemailer from "nodemailer"
import sendMessage from "../../utils/message.js"
import generateToken from "../../middleware/auth/generateToken.js"
import config from "config"
let URL = config.get("URL")
const router = express.Router()

/*
User Signup
API: /api/user/register
public

Validation:
Firstnamme canot be empty and max length is 30
Email cannot be Empty

Result:

*/
router.post("/register", registerValidations(), errorMiddleware, async (req, res) => {
    // console.log(req.body);
    let { firstname, lastname, email, password, password2, phone } = req.body
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
            return res.status(409).json({ error: "User Already Exists" })
        }
        const hashedpassword = await bcrypt.hash(password, 12);

        let userverifyToken = {
            email: randomstring(20),
            phone: randomstring(20)
        }
        console.log(userverifyToken.email)
        await sendmail({
            text: `Use this link to verify your email: \n
            ${URL}/api/user/verify/email/${userverifyToken.email}`,
            subject: "Email verification",
            receiver: email,
          });
        // sendMessage(phone,userverifyToken.phone)
        let user = new User({ firstname, lastname, email, password: hashedpassword, password2, phone, userverifyToken });
        await user.save();
        res.status(200).json({ success: "User Signup is Successful" })
        // res.redirect(`https:localhost:5003/api/user/verify/email/${userverifyToken.email}`)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server error" })
    }
})

router.post("/login", loginValidations(), errorMiddleware, async (req, res) => {
    try {
        let userFound = await User.findOne({ email: req.body.email })
        if (!userFound) {
            return res.status(401).json({ error: "Unauthorised Access" })
        }
        if (!(userFound.isVerified.email)) {
            return res.status(409).json({ error: "Email Not verified" });
        }

        let matchPassword = bcrypt.compare(req.body.password, userFound.password);
        if (!matchPassword) {
            return res.status(401).json({ error: "Unauthorised Access" });
        }
        let payload = {
            id: userFound._id,
            role: userFound.role
        }
        //Generate a JWT Token
        let token = generateToken(payload);
        // console.log(token);
        res.status(200).json({ success: "Login is Successful", token });
        await sendmail({
            text: `Welcome to Scheduler Application  \n
            Tasky Scheduler is a web-based productivity application designed to help users manage their tasks, to-do lists, and schedules more efficiently. With Tasky Scheduler, users can easily access their tasks and schedules from any device with an internet connection. Tasky Scheduler allows users to create tasks and set deadlines, create recurring tasks, and prioritize tasks by setting their importance and urgency levels. Users can also add notes and attachments to tasks, such as files, images, and links. The application features a calendar view that allows users to view all their tasks and deadlines in a monthly, weekly, or daily view. Users can also create custom reminders for their tasks, so they never miss an important deadline.`,
            subject: "Scheduler Application",
            receiver: req.body.email,
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/verify/email/:emailtoken", async (req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)
        let emailtoken = req.params.emailtoken
        console.log(req.body.email);
        const userFound = await User.findOne({ email: req.body.email });
        console.log(userFound)
        if (emailtoken == userFound.userverifyToken.email) {
            userFound.isVerified.email = true
            let user = User(userFound)
            await user.save()
            res.status(200).json({ success: "User Authorised" })

        } else {
            return res.status(409).json({ error: "Unauthorized Access" })
        }
    } catch (error) {
        res.status(400).json({ error: "Internal server error" })
    }
})

router.get("/verify/phone/:phonetoken", async (req, res) => {
    try {
        console.log(req.params)
        let emailtoken = req.params.phonetoken
        const userFound = await User.findOne({ email: req.body.email });
        if (emailtoken == userFound.userverifyToken.phone) {
            userFound.isVerified.phone = true
            let user = User(userFound)
            await user.save()
            res.status(200).json({ success: "User Authorised" })
        } else {
            return res.status(409).json({ error: "Unauthorized Access" })
        }
    } catch (error) {
        res.status(400).json({ error: "Internal server error" })
    }


    // console.log(emailtoken);
    // res.send(req.query)
})


router.post("/resend/email", async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.headers);
        // Find the user by email
        console.log(req.body.email);
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isVerified.email) {
            return res.status(409).json({ error: "Email already verified" });
        }
        user.userverifyToken.email = randomstring(20);
        await user.save();

        sendmail({
            text: `Use this link to verify your email: \n
            ${URL}/api/user/verify/email/${user.userverifyToken.email}`,
            subject: "Email verification",
            receiver: req.body.email,
          })


        res.status(200).json({ success: "Email verification link sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/resend/phone", async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isVerified.phone) {
            return res.status(409).json({ error: "Phone already verified" });
        }
        user.userverifyToken.phone = randomstring(20);
        await user.save();

        sendMessage(user.email, user.firstname + user.lastname, user.password, user.userverifyToken.phone)


        res.status(200).json({ success: "Text verification link sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router