import {body,validationResult} from "express-validator";

function registerValidations(){
    return[
        body('firstname', "First Name is Required").notEmpty().isLength({ max: 30 }),
        body('lastname', "Lastname is Required ").notEmpty().isLength({ max: 30 }),
        body('email', "Email Is Invalid").isEmail(),
        body('password', "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character").isStrongPassword(),
        body("password2").custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm Password do not match");
                } else {
                    return true;
                }
            }
        ),
        body('phone',"Mobile Phone is Invalid").isMobilePhone(),
    ]
}
function errorMiddleware(req,res,next){
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    return next();
}

function loginValidations(){
    return[
      body('email', "Email Is Invalid").isEmail(),
      body("password","Password Cannot be Empty").notEmpty()
    ]
  }


  function taskValidations(){
    return[
      body('taskname', "task is required").notEmpty(),
      body("deadline","Deadline is required").notEmpty().custom(
     
        (value) => {
            console.log(value)
            if (Date.parse(value) <= Date.parse(new Date())) {
                throw new Error("Entered deadline is not valid");
            } else {
                return true;
            }
        })
    ]
  }

export {errorMiddleware,registerValidations,loginValidations,taskValidations};