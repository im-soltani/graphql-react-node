// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")

// Import queries
const { user,client,clients } = require("./queries")

// Import mutations
const {
    register,
    login,
    addClient,
    updateClient,
    deleteClient,

  } = require("./mutations")

  // Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { user,client,clients },
  })


  // Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {
      register,
      login,
      addClient,
      updateClient,
      deleteClient,
 
    },
  })
  module.exports = new GraphQLSchema({
   
    query: QueryType,
    mutation: MutationType,
  })
