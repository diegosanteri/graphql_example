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

import userType from '../user/user_type'
import userService from "./../../services/user_service"

const companyType = new GraphQLObjectType({
    name: "Company",
    description: "Company object",
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        business: {
            type: GraphQLString
        },
        employees: {
            type: new GraphQLList(userType),
            resolve: (parent) => {

                if (parent.employees != null) {

                    return Promise.all(parent.employees.map(_id => userService.getUser(parent, { _id })))
                }
            }
        }
    })
});

export default companyType;