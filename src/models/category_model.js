const {Schema , mongoose, model} = require('mongoose');

const categorySchema = new Schema({
    title : { type: String, required: true },
    description: { type: String, default: "" }
});


categorySchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});


categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], (next)=>{
    //This getUpdate function will get the datas of user you want to update
    const update = this.getUpdate();


    //Deleting this id because we don't want to delete the user IDs
    delete update._id;

    //this.updatedOn will have the updated date stored in the current instance
    this.updatedOn = new Date();

    next();
});

const CategoryModel = model("Category", categorySchema); 
module.exports = CategoryModel;