import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"
import { Button } from '@mui/material';
import Addtask from './Addtask';
import Edittask from './Edittask';
import { useNavigate } from "react-router-dom";

function Tasks() {
  let i = 0;
  let navigate = useNavigate()

  const [tasks, settask] = useState([])

  const signout = () => {
    localStorage.removeItem("token")
    navigate("/")


  }


  const onclick = async (e) => {
    try {
      let token = localStorage.getItem("token")
      console.log(token)
      token = JSON.parse(token)
      let taskid = e.target.id
      console.log(token);
      // eslint-disable-next-line
      let { data } = await axios.delete(`/api/user/task/${taskid}`, {
        headers: {
          "auth-token": token
        },
      })

      let res = await axios.post("/api/user/task/alltasks", {}, {
        headers: {
          "auth-token": token
        },
      })
      settask(res.data.tasks)
      alert("Task deleted Successfully")
    } catch (error) {
      console.log(error)
      alert(error.data.error)
    }
  }
  useEffect(() => {
    let gettasks = async () => {
      try {
        let token = localStorage.getItem("token")
        token = JSON.parse(token)
        let res = await axios.post("/api/user/task/alltasks", {}, {
          headers: {
            "auth-token": token
          },
        })
        settask(res.data.tasks)
      } catch (error) {
        console.log(error)
      }
    }
    gettasks()
  }, [])

  const onclickid = (e)=>{
   
    console.log(e.target.id);
  }



  return (
    <>
      <div className="row">
        <div className="main">
          <center>
            <h1><u>Task List</u></h1>
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Task Name</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Reminders-1</th>
                  <th>Reminders-2</th>
                  <th>Reminders-3</th>
                  <th>Delete</th>
                  <th>Edit task</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((ele, index) => (
                  <tr key={index}>
                    <td>{++i}</td>
                    <td>{ele.taskname}</td>
                    <td>{ele.isCompleted ? "Completed" : "Incomplete"}</td>
                    <td>{new Date(ele.deadline).toLocaleString()}</td>
                    <td>{new Date(ele.reminders[0]).toLocaleString()}</td>
                    <td>{new Date(ele.reminders[1]).toLocaleString()}</td>
                    <td>{new Date(ele.reminders[2]).toLocaleString()}</td>
                    <td><Button id={ele._id} onClick={onclick}>X</Button></td>
                    <td id={ele._id}><Edittask taskid={ele._id} settask={settask} name={ele.taskname} date={ele.deadline} tasks={tasks} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <h1 className='mt-4'><Button>ADD TASK</Button></h1>
      <h1 className='mt-4'><Button>UPDATE TASK</Button></h1>
      <h1 className='mt-4'><Button>DELETE TASK</Button></h1> */}
          </center>
        </div>
      </div>
      <Addtask settask={settask} />
      <center>
        <Button onClick={signout}>Signout</Button>
      </center>




    </>
  )
}

export default Tasks