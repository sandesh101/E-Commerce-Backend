const CartModel = require("./../models/cart_model");

const CartController = {
    addToCart: async function(req,res){
        try{
            const { product, user, quantity } = req.body;
            const foundCart = CartModel.findOne({ user: user });

            //If cart doest exists
            if(!foundCart){
                const newCart = new CartModel({ user: user });
                newCart.items.push({
                    product: product,
                    quantity: quantity
                });
                await newCart.save();
                return res.json({ success:true, data: newCart, message: "Product Added Successfully" })
            }

            //If cart exists
            const updatedCart = await CartModel.findOneAndUpdate(
                {user: user},
                {$push: {items: { product: product, quantity: quantity }}},
                {new: true}
                );
            return res.json({ success: true, data: updatedCart, message: "Product Added Successfully" })

        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    },

    removeCart: async function(req, res){
        try{

        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    }
};

module.exports = CartController;