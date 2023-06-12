import { useNavigate, Link } from "react-router-dom";
import Resend from "./Resend";

function Signup(props){

    let navigate = useNavigate()

    const nav = ()=>{
        return  navigate("/login")
       
      }
      const nav1 = ()=>{
        return  navigate("/verify/resend")
       
      }

  return(
        <>
             <section className="h-100 gradient-form" style={{backgroundColor:"#eee"}}>
  <div className="container py-3 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <img src="https://appadvice.com/cdn-cgi/mirage/eaec890b32ee033953d1542683469dcff009881bb0833aa6a0a8b9f19c50cef4/1280/https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/51/e2/9b/51e29b09-d791-3b39-5b5d-0296a2a89fe7/source/512x512bb.jpg"
                    style={{width: "125px"}} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">WELCOME TO TASKY APPLICATION</h4>
                </div>

                <form>
                  <center><p><b>Create your account</b></p></center>
                  <div className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control mb-4"
                      placeholder="First Name" name="firstname" onChange={props.onchange}/>
                    <input type="text" id="form2Example11" className="form-control mb-4"
                      placeholder="Last Name" name="lastname" onChange={props.onchange}/>
                       <input type="email" id="form2Example11" className="form-control mb-4"
                      placeholder="Email Address" name="email" onChange={props.onchange}/>
                           <input type="text" id="form2Example11" className="form-control mb-4"
                      placeholder="Mobile Number" name="phone" onChange={props.onchange}/>
                           <input type="password" id="form2Example11" className="form-control mb-4"
                      placeholder="Password" name="password" onChange={props.onchange}/>
                         <input type="password" id="form2Example11" className="form-control mb-4"
                      placeholder="Confirm Password" name="password2"onChange={props.onchange} />
                   
                  </div>
                  <div className="text-center pt-1 mb-3 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={props.onclick}>SignUp</button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Already have an account?</p>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={nav}>Login</button><br></br>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Didn't receive verification email?</p>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={nav1}>Resend</button><br></br>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <center><h4 className="mb-4">We are more than just a Application</h4></center>
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

export default Signup