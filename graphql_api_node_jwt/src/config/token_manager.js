import jwt from 'jsonwebtoken';

export default class TokenManager {
    async encodeToken(payload) {

        if (typeof payload === 'undefined' || payload === null) {
            return null;
        }

        try {
            return await jwt.sign(payload, process.env.JWT_KEY);
        } catch (e) {
            return null;
        }

    };

    async decodeToken(token) {

        try {
            return await jwt.verify(token, process.env.JWT_KEY);
        } catch (e) {
            return null;
        }
    }
}