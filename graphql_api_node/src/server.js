import express from "express";
import expressGraphQL from "express-graphql";
import dotenv from "dotenv";

import mongoConfig from "./config/mongodb_config";
import schema from "./graphql/";
import TokenManager from './config/token_manager';

const app = express();
const tokenManager = new TokenManager();

dotenv.config();
mongoConfig.init();

app.use(
    '/graphql',
    async (req, res, next) => {

        const token = req.headers["authorization"]
        if (!token) {
            req.context = {};
            req.context.isAuthenticated = false;
            return next();
        }

        try {
            req.context = await tokenManager.decodeToken(token);
            req.context.isAuthenticated = true;

            console.log(req.context)
            return next();
        } catch (e) {
            req.context = {};
            req.context.isAuthenticated = false;
            return next();
        }
    },
    expressGraphQL((request, response, graphQLParams) => ({
        schema: schema,
        graphiql: true,
        context: {
            auth: request.context,
            request: request,
            test: 'Example context value'
        },
        formatError(err) {
            return {
                message: err.message,
                code: err.originalError && err.originalError.code
            };
        }
    }))
);

app.listen(3000, () => {
    console.log("Running on port 3000");
});