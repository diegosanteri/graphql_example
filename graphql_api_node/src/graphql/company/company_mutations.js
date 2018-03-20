import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
    GraphQLID
  } from "graphql";
  
  import companyType from "./company_type";
  import companyInput from "./company_input";
  import employeeAddInput from "./employee_add_input";
  import companyService from "./../../services/company_service";
  
  export default {
    createCompany: {
      type: companyType,
      args: {
          input: {
            type: companyInput
          }
      },
      resolve: companyService.createCompany
    },
    addEmployee: {
      type: companyType,
      args: {
          input: {
            type: employeeAddInput
          }
      },
      resolve: companyService.addEmployee
    }
  };