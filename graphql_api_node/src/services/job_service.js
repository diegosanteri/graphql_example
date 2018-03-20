import JobModel from "./../models/job_model";
import BusinessError from './../context/exceptions/business_exception';
import Promise from "bluebird";

class JobService {

    async getAllJobs(parent, args) {

        try {
            
            return await JobModel.find();
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async getJob(parent, args) {

        try {
            return await JobModel.findOne({ ...args });
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async createJob(parent, args) {

        try {
            
            return await new JobModel(args).save();
        } catch (e) {

            throw e;
        }
    }
}

module.exports = new JobService();