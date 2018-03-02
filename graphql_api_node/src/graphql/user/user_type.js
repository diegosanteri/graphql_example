import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from "graphql"

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
      type: new GraphQLList(userType)
    }
  })
});

export default userType;