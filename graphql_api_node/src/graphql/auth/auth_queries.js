import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from "graphql";

import authType from "./auth_type";
import authService from "./../../services/auth_service";

export default {

  checkToken: {
    type: authType,
    args: {
      token: {
        type: GraphQLString
      }
    },
    resolve: authService.checkToken
  }
};