import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";



function Addtask(props) {
    let navigate = useNavigate()
    const [addtask,setaddtask] = useState({
        taskname:'',
        deadline:''
    })

    const onChange = (e)=>{
        setaddtask({
          ...addtask,
        [e.target.name]:e.target.value
        })
      }


const onclick = async ()=>{
    try {
      console.log(addtask)
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      let res = await axios.post("/api/user/task/addtask",addtask,{
        headers:{
            'auth-token':token
        }
      });
      if(res)
        alert("Task has been added Sucessfully")
      let res1 = await axios.post("/api/user/task/alltasks", {}, {
        headers: {
          "auth-token": token
        },
      })
      {props.settask(res1.data.tasks)}
      } catch (error) {
      console.error(error);
      alert("Time cannot be backward")
    }
   
  }
  return (
    <>
    <div className="modal fade" id="addtask" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Add Task</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body mx-3">
        <div className="md-form mb-5">
          <i className="fas fa-envelope prefix grey-text"></i>
          <input type="text" id="defaultForm-email" className="form-control validate" name='taskname' required placeholder='Enter a task' onChange={onChange}/>
          <label data-error="wrong" data-success="right" for="defaultForm-email">Your Task</label>
        </div>

        <div className="md-form mb-4">
          <i className="fas fa-lock prefix grey-text"></i>
          <input type="datetime-local" id="defaultForm-pass" className="form-control validate" name='deadline' required onChange={onChange}/>
          <label data-error="wrong" data-success="right" for="defaultForm-pass">Deadline</label>
        </div>
      </div>
      <div className="modal-footer d-flex justify-content-center">
        <button className="btn btn-default" onClick={onclick}>Add Task</button>
      </div>
    </div>
  </div>
</div>

<div className="text-center">
<Button><a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#addtask">Add Task</a></Button>
</div>
    </>
  )
}
export default Addtask