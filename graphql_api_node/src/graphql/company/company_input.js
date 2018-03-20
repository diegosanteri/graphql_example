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

const companyInputType = new GraphQLInputObjectType({
    name: "companyInput",
    description: "Company Input object",
    fields: () => ({
        name: {
            type: GraphQLString
        },
        business: {
            type: GraphQLString
        }
    })
});

export default companyInputType;