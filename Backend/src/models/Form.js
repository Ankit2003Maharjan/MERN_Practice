import mongoose from "mongoose";

const formSchema=  new mongoose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
    
type:String,
required:true

},
email: {
  type: String,
  required: true,
  
},
password:{
    type:String,
    required:true
}
}, {timestamps:true})

const Form = mongoose.model('userDetails',formSchema)
export default Form;
    
