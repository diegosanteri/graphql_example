import UserModel from "./../models/user_model";
import BusinessError from './../context/exceptions/business_exception';
import TokenManager from './../config/token_manager'

class UserService {

    constructor() {
        this.tokenManager = new TokenManager();
    }

    async checkToken(parent, args) {

        if (!this.tokenManager.decodeToken(args.token)) {

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
                const user = await UserModel.findOne({ email: args.email });
                if (!user) {
                    throw new BusinessError("Username or password is invalid");
                }

                if (!await user.comparePassword(args.password)) {

                    throw new BusinessError("Username or password is invalid");
                }

                return resolve({
                    valid: true,
                    token: this.tokenManager.encodeToken({
                        scope: [
                            ...user.roles
                        ]
                    })
                });
            } catch (e) {

                reject(e);
            }
        })
    }
}

module.exports = new UserService();