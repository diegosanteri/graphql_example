import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: String,
    business: String,
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

module.exports = mongoose.model("company", CompanySchema);