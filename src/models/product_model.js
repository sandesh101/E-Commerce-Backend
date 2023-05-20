const {Schema , model} = require('mongoose');

const productSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title : { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});


productSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});


productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], (next)=>{
    //This getUpdate function will get the datas of user you want to update
    const update = this.getUpdate();


    //Deleting this id because we don't want to delete the user IDs
    delete update._id;

    //this.updatedOn will have the updated date stored in the current instance
    this.updatedOn = new Date();

    next();
});

const ProductModel = model("Products", productSchema); 
module.exports = ProductModel;