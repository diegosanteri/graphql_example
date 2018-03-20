import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
  } from "graphql";
  
  import companyType from "./company_type"
  import company from "./../../services/company_service"
  
  export default {
    companies: {
      type: new GraphQLList(companyType),
      resolve: company.getAllCompanies
    },
    companyById: {
      type: companyType,
      args: {
        _id: {
          type: GraphQLID
        }
      },
      resolve: company.getCompany
    }
  };