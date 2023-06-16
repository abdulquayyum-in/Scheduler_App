import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";


function Login() {    
let navigate = useNavigate();
    const [loginData,setloginData] = useState({
        email:"",
        password:""
      })
      
      let {email,password} = loginData

      const nav = ()=>{
        return navigate("/signup")
       
      }
      
      const onChange = (e)=>{
        setloginData({
          ...loginData,
        [e.target.name]:e.target.value
        })
      }
      
      const onclick = async ()=>{
        try {
          console.log(loginData)
          let res = await axios.post("/api/user/login",loginData);
          console.log(res.data)
          let token = res.data.token
          localStorage.setItem("token", JSON.stringify(token));
          if(token){
            navigate("/task/alltasks")
          }
        } catch (error) {
          console.error(error.response.data);
          alert(error.response.data.error)
          
        }
       
      }
  return (
    <>
     <section className="h-100 gradient-form" style={{backgroundColor:"#eee"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                        <img src="https://f-droid.org/repo/com.thatsmanmeet.taskyapp/en-US/icon_APUGcyU_Nzfgc0HWHVi1rQ5upKZvazIjxNV0LKdhruU=.png"
                    style={{width: "185px"}} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">WELCOME TO TASKY APPLICATION</h4>
                </div>

                <form>
                  <center><p><b>Please login to your account</b></p></center>


                  <div className="form-outline mb-4">
                  <label className="form-label" for="form2Example11">Username:</label>
                    <input type="email" id="form2Example11" className="form-control"
                      placeholder="Email address" onChange={onChange} name="email"/>
                   
                  </div>

                  <div className="form-outline mb-4">
                  <label className="form-label" for="form2Example22">Password:</label>
                    <input type="password" id="form2Example22" className="form-control" placeholder='Password' onChange={onChange} name="password" />
                   
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={onclick}>Log
                      in</button>
                    <a className="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" className="btn btn-outline-danger" onClick={nav}  >Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a Application</h4>
                <p className="small mb-0">Tasky Scheduler is a web-based productivity application designed to help users manage their tasks, to-do lists, and schedules more efficiently. With Tasky Scheduler, users can easily access their tasks and schedules from any device with an internet connection.

Tasky Scheduler allows users to create tasks and set deadlines, create recurring tasks, and prioritize tasks by setting their importance and urgency levels. Users can also add notes and attachments to tasks, such as files, images, and links.

The application features a calendar view that allows users to view all their tasks and deadlines in a monthly, weekly, or daily view. Users can also create custom reminders for their tasks, so they never miss an important deadline.

</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Login