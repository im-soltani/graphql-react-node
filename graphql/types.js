
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,  
    GraphQLList,
  } = require("graphql")
 
  const { GraphQLUpload } = require('graphql-upload');

  const { User,Client} = require("../models")
  
  const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      email: { type: GraphQLString },

    }),
  })

  const ClientType = new GraphQLObjectType({
    name: "Client",
    description:"Client type",
    fields: () => ({
      id: { type: GraphQLID},
      cathegory: { type: GraphQLString },
      adress: { type: GraphQLString},
      image: { type: GraphQLString},
     
      user: {
        type: UserType,
        resolve(parent, args) {
          return User.findById(parent.user)
        },
      },

    })
  })
  const ClientsType = new GraphQLObjectType({
    name: "Clients",
    description:"Client type",
    fields: () => ({
      clients: {
        type: new GraphQLList(ClientType),
        description: 'List of client',
        resolve: () => Client.find().populate("user"),
      },

    })
  })
 
 
  module.exports = { UserType , ClientType,ClientsType}

  