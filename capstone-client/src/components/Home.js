import { height } from '@mui/system';
import React from 'react'
import { Link } from "react-router-dom";


function Home() {
const styles = {
    paperContainer: {
        backgroundImage: `url(${"https://mir-s3-cdn-cf.behance.net/projects/404/d1c4a6141575157.Y3JvcCwzNDkyLDI3MzIsOTMzLDA.png"})`
    }
};
    

  return (
    <>
<div className='has-bg-img bg-purple bg-blend-multiply' >
  <nav className="navbar navbar-light navbar-expand-lg fixed-top shadow-sm bg-white"><a href="/" class="navbar-brand">Task Scheduler</a>
    <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
    <div id="navbarSupportedContent" className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto">
      <li className="nav-item"><Link to='/login' className="nav-link">Login</Link></li>
<li className="nav-item"><Link to='/signup' className="nav-link">Signup</Link></li>
      </ul>
      <div className="navbar-text ml-lg-3">
        <a href="mailto:info@quayyum.in" className="btn btn-primary text-white shadow">Contact us</a>
      </div>
    </div>
  </nav>
  <img className='bg-img' src="https://mir-s3-cdn-cf.behance.net/projects/404/d1c4a6141575157.Y3JvcCwzNDkyLDI3MzIsOTMzLDA.png" style={{ width:"100%"}} alt="Cinque Terre"></img>
</div>


    </>
  )
}

export default Home