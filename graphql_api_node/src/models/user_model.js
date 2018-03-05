import crypto from "crypto";
import mongoose from "mongoose";
import Promise from "bluebird";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const bcryptPromisified = Promise.promisifyAll(bcrypt);

const UserSchema = new Schema({
    email: String,
    password: String,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    roles: [{
        type: String
    }]
});

function autoPopulateSubs(next) {
    this.populate('friends');
    next();
}

UserSchema.pre('findOne', autoPopulateSubs)
    .pre('find', autoPopulateSubs);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcryptPromisified.hashAsync(this.password, 10);

        this.password = hash;
        next();

    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcryptPromisified.compareAsync(candidatePassword, this.password);
}

module.exports = mongoose.model("user", UserSchema);