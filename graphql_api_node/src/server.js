import express from "express";
import expressGraphQL from "express-graphql";
import dotenv from "dotenv";

import mongoConfig from "./config/mongodb_config";
import schema from "./graphql/";

const app = express();

dotenv.config();
mongoConfig.init();

app.use(
    '/graphql',
    expressGraphQL((request, response, graphQLParams) => ({
        schema: schema,
        graphiql: true,
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