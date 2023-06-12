import jwt from "jsonwebtoken"
import config from "config"

function generateToken(payload){
    try {
        let private_key = config.get("PRIVATE_KEY")
        // console.log(private_key);
        const token = jwt.sign(payload,private_key,{expiresIn:"10h"})
        return token
    } catch (error) {
        console.error(error);
        return 
    }
}
export default generateToken;