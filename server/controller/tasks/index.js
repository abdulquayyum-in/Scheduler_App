import express, { Router } from "express"
import User from "../../models/users/index.js"
import authvalidator from "../../middleware/auth/auth.js"
import { taskValidations } from "../../middleware/validation/index.js"
import { errorMiddleware } from '../../middleware/validation/index.js';
import { body } from 'express-validator';
import nodescheduler from "../../utils/nodescheduler.js"
import setReminders from "../../utils/setreminder.js";
import schedule from 'node-schedule';
import { scheduledJobs } from 'node-schedule';
import { object } from "mongoose/lib/utils.js";
const router = express.Router()

// router.post("/task/addtask",authvalidator,taskValidations(),errorMiddleware, async(req,res)=>{
//     // console.log(req.payload)
//     // console.log(req.body)

//    const user = await User.findOne({_id : req.payload.id})
//    console.log(user)
//     // console.log(user)
//     let todos=user.todos
//     let { taskname, deadline } = req.body;
//     let tdate = Date.parse(deadline);
//     console.log(tdate)
//     let pdate = Date.now()
//     let intervel = (tdate-pdate)/4
//     let reminder = [
//         new Date(pdate + intervel),
//         new Date(pdate + intervel * 2),
//         new Date(pdate + intervel * 3)
//         ]

//     // console.log(todos)
//     // console.log(req.body.taskname)

//     todos.push({taskname:taskname,deadline:deadline,reminders:user[0].push(reminder)})
//     user.todos = todos
//     console.log(todos);
//     // console.log(user)
//     // console.log(todos)
//     let userdata = User(user)
//     userdata.save()
//     nodescheduler(req.payload.id,taskname,user.email,User.reminder)
//     res.status(200).json({json:"Task Added Successfully"})
// })



router.post("/task/addtask", authvalidator, taskValidations(), errorMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.payload.id });
    // console.log(user)
    const { taskname, deadline } = req.body;
    const tdate = Date.parse(deadline);
    const pdate = Date.now();
    const intervel = (tdate - pdate) / 4;
    const reminders = [
         new Date(pdate + intervel),
         new Date(pdate + intervel * 2),
         new Date(pdate + intervel * 3),
    ];
    const newTodo = {
        taskname: taskname,
        deadline: deadline,
        reminders: reminders,
    };
    // console.log(newTodo)
    const updatedUser = await User.updateOne(
        { _id: req.payload.id },
        { $push: { todos: newTodo } }
    );
    // console.log(updatedUser)
    if (updatedUser.acknowledged === true) {
        nodescheduler(req.payload.id, taskname, user.email, reminders);
        res.status(200).json({ success: "Task added successfully" });
    } else {
        res.status(500).json({ error: "Failed to add task" });
    }
});


router.post("/task/alltasks",authvalidator,async (req,res)=>{
    console.log(req.headers)
    try {
        const user = await User.findOne({_id:req.payload.id})
        res.status(200).json({tasks:user.todos})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Failed to get all task"})
    }
});

// router.put("/task/:taskid",authvalidator,taskValidations(),errorMiddleware,async (req,res)=>{
//     try {
//         const taskid = req.params.taskid
//         let taskname = req.body.taskname
//         let deadline = req.body.deadline
//         console.log(User)
//         const user = await User.findOne({ _id: req.payload.id }
    
//         )
//         res.status(200).json({res:"okk"})
//         console.log(user)
//     } catch (error) {
//         console.log(error)
//     }
// })


router.put("/task/:taskid",authvalidator,async (req,res)=>{
    try {
        console.log(req.body);
        let taskid = req.params.taskid
        // console.log(taskid);
        let task = await User.findOne({_id:req.payload.id})
        let task_list = task.todos
        task_list.forEach(async (ele)=>{
            if(ele._id==taskid){
              let updatetask = ele
              console.log(ele);
                if(!(req.body.taskname)){
                    req.body.taskname = updatetask.taskname
                    console.log(req.body.taskname)
                }
                if(!(req.body.deadline)){
                    req.body.deadline = updatetask.deadline
                    console.log(req.body.deadline)
                }
                // if(!(req.body.isCompleted)){
                //     req.body.deadline = updatetask.deadline
                //     console.log(req.body.deadline)
                // }
              if(req.body.taskname || req.body.deadline || req.body.isCompleted){
                updatetask.taskname = req.body.taskname
                updatetask.deadline = req.body.deadline
                const current = Date.now()
                const deadline = Date.parse(req.body.deadline)
                let rem = setReminders(deadline,current)
                // console.log(rem)
                updatetask.reminders = rem
                updatetask.isCompleted = req.body.isCompleted
                console.log(updatetask);
                let id = updatetask._id
                // console.log(scheduledJobs)
                // console.log(updatetask)
                // console.log(updatetask._id)
             
            //    console.log(task_list)
            //    console.log(task)
               task.todo = task_list
            //    console.log(task)
               let taskupdated = User(task)
               await taskupdated.save()
            //    console.log(updatetask._id,updatetask.taskname,task.email,rem);
                nodescheduler(updatetask._id,updatetask.taskname,task.email,rem)
            }
            // console.log(schedule.scheduledJobs)
            // console.log(updatetask.isCompleted)
                if (updatetask.isCompleted) {
                    // console.log("object");
                    // console.log(Object.keys(schedule.scheduledJobs))
                    // console.log(updatetask._id);
                    // Get all the scheduled jobs
                    const scheduledJobs = schedule.scheduledJobs;
                    // Loop through the scheduled jobs and cancel any job with a name that matches the task ID
                    Object.keys(scheduledJobs).forEach(jobName => {
                        // console.log(jobName);
                      if (jobName == updatetask._id) {
                        // console.log("object");
                        schedule.cancelJob(jobName);
                        // console.log(scheduledJobs)
                      }
                    });
                  }
                 
                }
               
        })
        res.status(200).json({success:"Task Edited Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"Failed to edit task"})
    }
})


router.delete("/task/:taskid",authvalidator,async (req,res)=>{

    try {
        let user = await User.findOne({_id:req.payload.id})
    // console.log(user)
    let taskid = req.params.taskid
    let task_list = user.todos
    // console.log(task_list)
    task_list.forEach(async (ele)=>{
        if(ele._id==taskid){
           let a = task_list.indexOf(ele)
           console.log(ele)
           console.log(a)
          task_list.splice(a,1)
           console.log(task_list)
           user.todo = task_list
           let taskupdated = User(user)
               await taskupdated.save()
        }
    })
    res.status(200).json({success:"User deleted Successfully"})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"User deletion failed"})
    }
    
    
})

export default router