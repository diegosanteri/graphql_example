import UserModel from "./../models/user_model";
import BusinessError from './../context/exceptions/business_exception';
import Promise from "bluebird";

class UserService {

    async getAllUsers(parent, args) {

        try {
            return await UserModel.find();
        } catch (e) {
            console.log(e)
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

            if (await UserModel.findOne({ email: args.email })) {

                throw new BusinessError("Email already exists");
            }

            const instance = new UserModel({
                ...args,
                friends: [],
                roles: ["user:read", "user:write", "user:delete"]
            });

            return await instance.save();
        } catch (e) {

            throw e;
        }
    }

    async updateUser(parent, args) {
        try {
            const user = await UserModel.findOne({ _id: args._id });
            if (!user) {

                throw new BusinessError("User doesn't exist");
            }

            if (args.email) {

                user.email = args.email;
                if (await UserModel.findOne({ email: args.email })) {
                    throw new BusinessError("Email already exists");
                }
            }

            await UserModel.update({ _id: args._id }, {
                ...user
            });

            return args;
        } catch (e) {

            throw e;
        }
    }

    async deleteUser(parent, args) {
        try {
            if (!await UserModel.findOne({ _id: args._id })) {
                console.log(e)
                throw new BusinessError("User doesn't exist");
            }

            await UserModel.remove({ _id: args._id });
            return args;
        } catch (e) {


            throw e;
        }
    }

    async addFriend(parent, args) {
        try {
            if (!await UserModel.findOne({ _id: args._id })) {

                throw new BusinessError("User doesn't exist");
            }

            const friend = await UserModel.findOne({ _id: args.friendId });
            if (!friend) {

                throw new BusinessError("Friend user doesn't exist");
            }

            await UserModel.update(
                {
                    _id: args._id, friends: {
                        $ne: friend._id
                    }
                },
                {
                    $push: { friends: friend }
                });

            return {
                _id: args._id
            }
        } catch (e) {

            throw e;
        }
    }
}

module.exports = new UserService();