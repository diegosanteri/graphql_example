import CompanyModel from "./../models/company_model";
import UserModel from "./../models/user_model";
import BusinessError from './../context/exceptions/business_exception';
import Promise from "bluebird";

import userService from "../services/user_service";
import jobService from "../services/job_service";

class CompanyService {

    async addEmployee(parent, args) {

        try {
            
            const user = await userService.getUser(null, {_id: args.input.employeeId});

            if(!user) {
                throw new BusinessError("User doesn't exist");
            }

            await CompanyModel.update(
                {
                    _id: args.input.companyId, employees: {
                        $ne: args.input.employeeId
                    }
                },
                {
                    $push: { employees: user }
            });

            const job = await jobService.createJob(null, args.input.job);

            await userService.updateUser(null, {
                _id: user._id,
                job
            });

            return await CompanyModel.findById(args.input.companyId);
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async getAllCompanies(parent, args) {

        try {
            
            return await CompanyModel.find();
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async getCompany(parent, args) {

        try {
            
            return await CompanyModel.findOne({ ...args });
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async createCompany(parent, args) {

        try {
            
            return await new CompanyModel(args.input).save();
        } catch (e) {

            throw e;
        }
    }
}

module.exports = new CompanyService();