const{ClientType}=  require("./types")
const { User, Client } = require("../models")
const { GraphQLString} = require("graphql")
const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');
const { createJwtToken } = require("../util/auth")
const express = require('express');
const path=require('path');

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
 
  },
  async resolve(parent, args) {
    const { username, email, password} = args
    const user = new User({ username, email, password })

    await user.save()
    const token = createJwtToken(user)
    return token
  },
}

const login = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const user = await User.findOne({ email: args.email }).select("+password")
    console.log(user)
    if (!user || args.password !== user.password) {
      throw new Error("Invalid credentials")
    }

    const token = createJwtToken(user)
    return token
  },
}



const addClient = {
  
  type: ClientType,
  description: "Create a client ",
  
  args: {

    cathegory: { type:GraphQLString},
    adress:{type:GraphQLString},
    image:{type:GraphQLUpload},
 
  },
  
  
  async resolve(parent, args, { verifiedUser }) {
   
    if (!verifiedUser) {
      throw new Error("Unauthorized")
    }
    console.log("Verified User: ", verifiedUser)
  

    const filename = `${Date.now()}.jpg`
    const { createReadStream } = await args.image
    //console.log(clientInput.image.Upload.file)
   console.log(args.image)
   const stream = createReadStream()
       const pathName = path.join(__dirname, "../uploads", filename)
       stream
        .pipe(
           fs.createWriteStream(pathName)
        )
       console.log(args.image)
      //const result = await cloudinary.v2.uploader.upload(args.image, {
//here i chose to allow only jpg and png upload
       // allowed_formats: ["jpg", "png"],
//generates a new id for each uploaded image
      //  public_id: "",
/*creates a folder called "your_folder_name" where images will be stored.
*/
      //  folder: "uploads",
     // });
   

    const client =  new Client({
      user: verifiedUser._id,
      cathegory: args.cathegory,
      adress: args.adress,
      image:"/uploads/"+filename,
   
    })
  
    return client.save()
  },
}    
const updateClient = {
  type: ClientType,
  description: "Update client",
  args: {
    id: { type: GraphQLString },
    adress: { type: GraphQLString },
    cathegory: { type: GraphQLString },
    image: { type: GraphQLUpload},
  },
  async resolve(parent, args, { verifiedUser }) {
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    
    const clientUpdated = await Client.findOneAndUpdate(
      {
        _id: args.id,
      },
      { adress: args.adress, cathegory: args.cathegory },
      {
        new: true,
   
      }
    )

    if (!clientUpdated) {
      throw new Error("No client with the given ID found for the user")
    }

    return clientUpdated
  },
}

const deleteClient = {
  type: GraphQLString,
  description: "Delete client",
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent, args, { verifiedUser }) {
    console.log(verifiedUser)
    if (!verifiedUser) {
      throw new Error("Unauthenticated")
    }
    const clientDeleted = await Client.findOneAndDelete({
      _id: args.id,
    })
    if (!clientDeleted) {
      throw new Error("No client with the given ID ")
    }

    return "Client deleted"
  },
}

module.exports = {
  register,
  login,
  addClient,
  updateClient,
  deleteClient
  
}
