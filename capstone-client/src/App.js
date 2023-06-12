import { useNavigate, Link } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import axios from "axios"
import Tasks from './components/Tasks';
import Addtask from './components/Addtask';
import Home from "./components/Home";
import Resend from "./components/Resend";


function App() {

  let navigate = useNavigate();

const [userData,setUserData] = useState({
  firstname: "",
  lastname: "",
  email: "",
  phone:"",
  password: "",
  password2: ""
})

// let {fullname,lastname,email,phone,password,password2} = userData

const onChange = (e)=>{
  setUserData({
    ...userData,
  [e.target.name]:e.target.value
  })
}

const onclick = async ()=>{
  try {
    console.log(userData)
    let res = await axios.post("/api/user/register",userData);
    console.log(res)
    if(res){
      navigate("/login")
    }
    console.log(res.data.success)
  } catch (error) {
    console.error(error.response.data);
  }
 
}
  return (
    <>
   <Routes>
  
      {/* Passing Props */}
      <Route path="/" element={<Home/>} />
      <Route path='/signup' element={<Signup onchange={onChange} onclick={onclick}></Signup>} />
      <Route path='/login' element={<Login onchange={onChange} onclick={onclick}></Login>} />
      <Route path='/task/alltasks' element={<Tasks/>} />
      <Route path='/verify/resend' element={<Resend/>} />
  {/* <Login/> */}
  </Routes>
  </>


  );
}

export default App;
