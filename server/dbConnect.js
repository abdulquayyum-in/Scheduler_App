import config from "config"
import mongoose from "mongoose"

const db_url = config.get("DB_URL")

const dbconnect = async ()=>{
    try {
        await mongoose.connect(db_url)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("MongoDB failed to connect");
    }

}

dbconnect()

export default dbconnect