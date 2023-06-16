import React from 'react'
import { Button } from '@mui/material'
import { useState } from 'react'
import axios from "axios"

function Edittask(props) {

    const [updatetask,setupdatetask] = useState({
        taskname:"",
        deadline:"",
        isCompleted:""
    })

    const onChange = (e)=>{
        setupdatetask({
          ...updatetask,
        [e.target.name]:e.target.value
        })
      }
    const onclick = (e)=>{
       if(e.target.value){
        e.target.value = e.target.checked
       }
    }

    let tasks = props.task
  const onclicktask = async (e) => {
    try {
      let token = localStorage.getItem("token")
      token = JSON.parse(token)
      let taskid = e.target.id
      let { data } = await axios.put(`/api/user/task/${taskid}`,updatetask, {
        headers: {
          "auth-token": token
        },
      })
      alert(data.success)
      let res = await axios.post("/api/user/task/alltasks", {}, {
        headers: {
          "auth-token": token
        },
      })
      props.settask(res.data.tasks)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }


  return (
   <>
   
   <div className="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header text-center">
        <h4 className="modal-title w-100 font-weight-bold">Edit task</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body mx-3">
        <div className="md-form mb-5">
          <i className="fas fa-envelope prefix grey-text"></i>
          <input type="text" id="defaultForm-email" className="form-control validate" name='taskname' required placeholder='Enter a task' onChange={onChange} />
          <label data-error="wrong" data-success="right" for="defaultForm-email">Your Task</label>
        </div>

        <div className="md-form mb-4">
          <i className="fas fa-lock prefix grey-text"></i>
          <p>Leave this blank if you want just task to be completed</p>
          <input type="datetime-local" id="defaultForm-pass" className="form-control validate" name='deadline' onChange={onChange} />
          <label data-error="wrong" data-success="right" for="defaultForm-pass">Deadline</label>
        </div>
      </div>
      <div className="form-check">
  <input className="form-check-input" type="checkbox" onClick={onclick} name='isCompleted' id="flexCheckDefault" onChange={onChange}/>
  <label className="form-check-label" for="flexCheckDefault">
    <b>Task Completed</b>
  </label>
  </div>
      <div className="modal-footer d-flex justify-content-center">

        <button className="btn btn-default" id={props.taskid} onClick={onclicktask}>Edit Task</button>
      </div>
    </div>
  </div>
</div>

<div className="text-center">
<Button><a href="" className="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Edit task</a></Button>
</div>
   </>
  )
}

export default Edittask