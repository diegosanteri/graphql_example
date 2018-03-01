import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
    } from "graphql";
  
  import userType from "./user_type"
  import user from "./../../services/user_service"
  
  export default {
    users: {
      type: new GraphQLList(userType),
      resolve: user.getAllUsers
    },
    userById: {
      type: userType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve: user.getUser
    },
    userByEmail: {
      type: userType,
      args: {
        email: {
          type: GraphQLString
        }
      },
      resolve: user.getUser
    }
  };