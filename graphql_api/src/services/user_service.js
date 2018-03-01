import UserModel from "./../models/user_model";
import BusinessError from './../context/exceptions/business_exception'; 

class UserService {

    async getAllUsers(parent, args) {

        try {

            const users = await UserModel.find();
            return users;
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async getUser(parent, args) {

        try {

            const users = await UserModel.findOne({ ...args });
            return users;
        } catch (e) {

            throw new BusinessError("Something is wrong");
        }
    }

    async addUser(parent, args) {

        try {

            if(await UserModel.findOne({ email: args.email })) {

                throw new BusinessError("Email already exists");
            }
            const instance = new UserModel(args);
            return await instance.save();
        } catch (e) {

            console.log("aaaa")
            throw e;
        }
    }

    async updateUser(parent, args) {
        try {
            if(await UserModel.findOne({ email: args.email })) {
                
                throw new BusinessError("Email already exists");
            }

            await UserModel.update({_id: args._id}, {...args});
            return args ;
        } catch (e) {

            throw e;
        }
    }

    async deleteUser(parent, args) {
        try {
            if(!await UserModel.findOne({ _id: args._id })) {
                
                throw new BusinessError("User doesn't exist");
            }

            await UserModel.remove({_id: args._id});
            return args ;
        } catch (e) {

            throw e;
        }
    }
}

module.exports = new UserService();