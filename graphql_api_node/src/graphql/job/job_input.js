import {
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLID
} from "graphql";

const jobInputType = new GraphQLInputObjectType({
    name: "jobInput",
    description: "Job Input object",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        salary: {
            type: GraphQLFloat
        },
        company: {
            type: GraphQLID
        }
    })
});

export default jobInputType;