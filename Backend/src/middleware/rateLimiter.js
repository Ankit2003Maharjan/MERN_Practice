import { Redis } from "@upstash/redis";
import ratelimit from "../config/upstash.js";




const rateLimiter = async(req,res,next)=>{

    try {
        const {success} = await ratelimit.limit("my-limit-keys");
        if(!success)   
             { return  res.status(429).json({message:'Too many request, Please try again later'})
             }
             next();
        
    } catch (error) {
    console.log("RATE LIMITER PROBLEM",error)
        next(error);
    }

}

export default rateLimiter;