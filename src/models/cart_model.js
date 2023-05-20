const {Schema, model} = require('mongoose');

const userCartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: { type: [userCartSchema], default: [] },
    updatedOn: { type: Date },
    createdOn: { type: Date }
});


cartSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});


cartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    //This getUpdate function will get the datas of user you want to update
    const update = this.getUpdate();


    //Deleting this id because we don't want to delete the user IDs
    delete update._id;

    //this.updatedOn will have the updated date stored in the current instance
    this.updatedOn = new Date();

    next();
});

const CartModel = model("Cart", cartSchema); 
module.exports = CartModel;