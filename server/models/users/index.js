import mongoose from "mongoose";

const taskSchema = {
    taskname:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false

    },
    deadline:{
        type:Date,
    },
    reminders:[]
}

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:30
    },
    lastname:{
        type:String,
        required:true,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String
    },
    userverifyToken:{
        email:{
            type:String,
            default:null
        },
        phone:{
            type:String,
            default:null
        }
    },
    isVerified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
        }
    },
    role:{
        type:String,
        default:"user"
    },
    todos:[taskSchema]

})

let User = mongoose.model("User",userSchema,"users")

export default User