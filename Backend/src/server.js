import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv';

import usersRoutes from './routes/userRoutes.js'
import {connectDB} from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

//Middle ware
app.use(cors(
{  origin:'http://localhost:5173'}
))
app.use(express.json());

app.use(rateLimiter)

// app.use((req,res,next)=>{
  //   console.log(`we got ${req.method} and we got ${req.url}` );
  //   next();
  // })
  
  
  

  app.use("/api/users", usersRoutes);
  
  
  
  
  connectDB().then(()=>{

    
    
    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  })
