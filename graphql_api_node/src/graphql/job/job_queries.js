import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from "graphql";

import jobType from "./job_type"
import jobService from "./../../services/job_service"

export default {
  jobs: {
    type: new GraphQLList(jobType),
    resolve: jobService.getAllJobs
  },
  jobById: {
    type: jobType,
    args: {
      _id: {
        type: GraphQLID
      }
    },
    resolve: jobService.getJob
  }
};