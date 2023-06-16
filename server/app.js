import express from "express"
import config from "config"
import "./dbConnect.js"

import userRouter from "./controller/users/index.js"
import TaskRouter from "./controller/tasks/index.js"
const app = express()

// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())

const port = config.get("PORT")
app.use("/api/user",userRouter)
app.use("/api/user",TaskRouter)
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
app.listen(port,()=>{
    console.log("Server started at",port)
})
// console.log(port)