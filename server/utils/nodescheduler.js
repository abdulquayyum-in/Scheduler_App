
import sendMail from "./mail.js";
import { scheduleJob, scheduledJobs } from "node-schedule";
const nodescheduler =(user_id, task_name, email,array ) =>{
let i = 1;
  array.forEach( ele => {
    // console.log(ele);
    scheduleJob(`${user_id}`, ele, () => {
      console.log("Reminder sent")
    sendMail({
      text: `This is the ${i} reminder for your task: ` + task_name,
      subject: "Task reminder",
      receiver: email,
    });
    i++;
  });
  });

   

}

export default nodescheduler




// scheduleJob(`Reminder 2 for ${user_id}`, r2, () => {
//   console.log("Reminder 2 sent")
// sendMail({
//   text: "This is the second reminder for your task: " + task_name,
//   subject: "Second reminder",
//   receiver: email,
// });
// });

// scheduleJob(`Reminder 3 for ${user_id}`, r3, () => {
//   console.log("Reminder 3 sent")
// sendMail({
//   text: "This is the last reminder for your task: " + task_name,
//   subject: "Last reminder",
//   receiver: email,
// });
// });

// scheduleJob(`Reminder 4 for ${user_id}`, deadline, () => {
//   console.log("Reminder 4 sent")
// sendMail({
//   text: "Your time is up for your task: " + task_name,
//   subject: "Time up",
//   receiver: email,
// });
// });
