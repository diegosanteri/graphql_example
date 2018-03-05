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
import authService from "./../../services/auth_service"

export default {
  doLogin: {
    type: authType,
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
    resolve: authService.doLogin.bind(authService)
  }
};