import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    name: String,
    description: String,
    salary: Number,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    }
});

module.exports = mongoose.model("job", JobSchema);