import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID,
    GraphQLBoolean
   } from "graphql"
  
  
  export default new GraphQLObjectType({
    name: "Auth",
    description: "Auth object",
    fields: () => ({
      token:{
        type: GraphQLString
      },
      valid:{
        type: GraphQLBoolean
      }
    })
  });