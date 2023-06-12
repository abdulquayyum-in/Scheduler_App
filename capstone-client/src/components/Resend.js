import React from 'react'
import { TextField } from '@mui/material'
import { useState } from 'react'
import axios  from 'axios';


function Resend() {

    const [email,setemaildata] = useState("")

     
    const onclick = async ()=>{
        try {
            console.log(email);
          let res = await axios.post("/api/user/resend/email",email);
          console.log(res.data.success)
          alert(res.data.success)
        } catch (error) {
          console.error(error.response.data);
          alert(error.response.data.error
            )
        }
      }


    const onChange = (e)=>{
        setemaildata({
            email:e.target.value
        }
        )
      }
  return (
    <>
    <center>
        <h1 className='blockquote'>Email Verification</h1>

  <div className="form-group">
    <label for="exampleInputEmail1 ">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <button type="submit" className="btn btn-primary" onClick={onclick}>Submit</button>
</center>
      </>

  )
}

export default Resend