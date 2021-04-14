const mongoose = require("mongoose")
const {modelName} = require("./User")
const Schema = mongoose.Schema;


const clientSchema = new mongoose.Schema(
    
   /*  
   
              userId: {
                type: String,
                required: true,
              },
    
        */
          {
           
              user: {
                type: Schema.Types.ObjectId,
                ref: "user" ,
                autopopulate: true
              },
       
        cathegory:{
            type: String,
            required: false,
        },
        adress:{
            type:String,
            required:false
        },
        image:{
          type:String,
          required:false
      },
     
     },

)
clientSchema.plugin(require('mongoose-autopopulate'));
module.exports=mongoose.model("client", clientSchema)