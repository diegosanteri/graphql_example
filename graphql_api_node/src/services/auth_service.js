import UserModel from "./../models/user_model";
import BusinessError from './../context/exceptions/business_exception'; 

class UserService {

    async checkToken(parent, args) {

        if(args.token != "ABCDE") {
            
            throw new BusinessError("Token is invalid");
        }

        return {
            ...args,
            valid: true
        }
    }

    async doLogin(parent, args) {

        return new Promise(async (resolve, reject) => {

            try {
                const user = await UserModel.findOne({email: args.email});
                if(!user) {
                    throw new BusinessError("Username or password is invalid");
                }

                if(!await user.comparePassword(args.password)) {

                    throw new BusinessError("Username or password is invalid");
                }

                return resolve({
                    valid: true,
                    token: "ABCDE"
                });
            } catch(e) {

                reject(e);
            }
        })
    }
}

module.exports = new UserService();