import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from "graphql";

import userType from "./user_type";
import userService from "./../../services/user_service";
import authService from "./../../services/auth_service";
import withAuth from 'graphql-auth';

export default {
  register: {
    type: userType,
    args: {
      email: {
        name: "email",
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        name: "password",
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: userService.addUser
  },
  updateUser: {
    type: userType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      email: {
        name: "email",
        type: GraphQLString
      }
    },
    resolve: withAuth(['user:write'], userService.updateUser)
  },
  deleteUser: {
    type: userType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: withAuth(['user:delete'], userService.deleteUser)
  },
  addFriend: {
    type: userType,
    args: {
      _id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      friendId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: withAuth(['user:write'], userService.addFriend)
  }
};