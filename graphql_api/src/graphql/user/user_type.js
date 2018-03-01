import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
   } from "graphql"
  
  export default new GraphQLObjectType({
    name: "User",
    description: "User object",
    fields: () => ({
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      email:{
        type: GraphQLString
      }
    })
  });