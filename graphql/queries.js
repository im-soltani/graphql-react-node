const { GraphQLID,GraphQLList } = require("graphql")
const { UserType, ClientType,ClientsType} = require("./types")
const { User,Client } = require("../models")



const user = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    return User.findById(args.id)
  },
}

/*const client = {
  type: ClientType,
  description: "Retrieves one client",
  args: { id: { type: GraphQLID } },
  resolve(_, args) {
    return Client.findById(args.id).populate("user");
  },
}*/
const client = {
  type: ClientType,
  description: "Retrieves one client",
  args: { user: { type: GraphQLID } },
  resolve(_, user) {
    return Client.findOne(user).populate("user");
   
 
  },

}


const clients = {
  type: new GraphQLList(ClientType),
  description: "Retrieves list of clients",
  resolve() {
    return Client.find()
  },
}



module.exports = { user,client,clients }