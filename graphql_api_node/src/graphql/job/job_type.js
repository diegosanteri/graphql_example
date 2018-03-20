import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLFloat,
    GraphQLID
} from "graphql"

import companyType from '../company/company_type'
import companyService from "./../../services/company_service"

const jobType = new GraphQLObjectType({
    name: "Job",
    description: "Job object",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
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
            type: companyType,
            resolve: (parent)=> {
                return companyService.getCompany(parent, {_id: parent._id});
            }
        }
    })
});

export default jobType;