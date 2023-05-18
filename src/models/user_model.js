const { Schema, model} = require("mongoose");
const uuid = require("uuid"); //UUID is used to generate unique user id
const bcrypt = require("bcrypt"); // Used for hashing the password

const userSchema = new Schema({

    id: { type: String, unique: true },
    fullName: { type: String, default: "" },
    email: { type: String, required: true, default: "" },
    password: { type: String, required: true },
    phoneNumber: { type: String, default:"" },
    address: { type: String, default:"" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    profileProgress: { type: Number, default: 0 },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});

userSchema.pre('save', (next)=>{
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
});


userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], (next)=>{
    const update = this.getUpdate();

    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});


const UserModel = model("User", userSchema);

module.exports = UserModel;

