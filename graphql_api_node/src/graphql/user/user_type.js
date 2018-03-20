import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from "graphql"

import user from "./../../services/user_service"
import jobService from "./../../services/job_service"

import jobType from './../job/job_type'

const userType = new GraphQLObjectType({
  name: "User",
  description: "User object",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    email: {
      type: GraphQLString
    },
    job: {
      type: jobType,
      resolve: (parent) => {

        return jobService.getJob(parent, {_id: parent.job});
      }
    },
    friends: {
      type: new GraphQLList(userType),
      resolve: (parent) => {

        if (parent.friends != null) {

          return Promise.all(parent.friends.map(_id => user.getUser(parent, { _id })))
        }
      }
    }
  })

});

export default userType;