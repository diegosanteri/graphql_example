import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
    } from "graphql";
  
  import authType from "./auth_type"
  import auth_service from "./../../services/auth_service"
  
  export default {
   
    checkToken: {
      type: authType,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve: auth_service.checkToken
    }
  };