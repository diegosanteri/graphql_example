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

import jobType from "./../job/job_input"

const companyInputType = new GraphQLInputObjectType({
    name: "employeeAddInput",
    description: "Input object",
    fields: () => ({
        employeeId: {
            type: GraphQLID
        },
        companyId: {
            type: GraphQLID
        },
        job: {
            type: jobType
        }
    })
});

export default companyInputType;