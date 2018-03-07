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
    friends: {
      type: new GraphQLList(userType),
      resolve: (parent) => {

        if(parent.friends != null) {
          
          return Promise.all(parent.friends.map(_id => user.getUser(parent, {_id}))) 
        }
      }
    }
  })
  
});

export default userType;