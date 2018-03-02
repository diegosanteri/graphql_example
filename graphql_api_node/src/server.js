import express from "express";
import expressGraphQL from "express-graphql";
import dotenv from "dotenv";

import mongoConfig from "./config/mongodb.config";
import schema from "./graphql/";

const app = express();
 
dotenv.config();
mongoConfig.init();

app.use("/graphql", expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log("Running on port 3000");
});