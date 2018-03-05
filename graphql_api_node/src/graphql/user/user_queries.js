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
import withAuth from 'graphql-auth';

export default {
  users: {
    type: new GraphQLList(userType),
    resolve: withAuth(['user:read'], user.getAllUsers)
  },
  userById: {
    type: userType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: withAuth(['user:read'], user.getUser)
  },
  userByEmail: {
    type: userType,
    args: {
      email: {
        type: GraphQLString
      }
    },
    resolve: withAuth(['user:read'], user.getUser)
  }
};