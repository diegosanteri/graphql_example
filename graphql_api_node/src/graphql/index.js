import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import userQueries from "./user/user_queries";
import userMutations from "./user/user_mutations";
import authMutations from "./auth/auth_mutations";

let RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Realize Root Query",
  fields: () => ({
    ...userQueries
  })
});

let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Realize Root Mutations",
  fields: () => ({
    ...userMutations,
    ...authMutations
  })
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})