import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import userQueries from "./user/user_queries";
import userMutations from "./user/user_mutations";
import companyQueries from "./company/company_queries";
import companyMutations from "./company/company_mutations"
import jobQueries from "./job/job_queries";

let RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Realize Root Query",
  fields: () => ({
    ...userQueries,
    ...companyQueries,
    ...jobQueries
  })
});

let RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Realize Root Mutations",
  fields: () => ({
    ...userMutations,
    ...companyMutations
  })
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})