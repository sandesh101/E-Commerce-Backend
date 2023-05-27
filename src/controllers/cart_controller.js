const CartModel = require("./../models/cart_model");

const CartController = {

    //Get cart for user
    getCartForUser: async function(req,res){
        try{
            const foundCart = await CartModel.findOne({ user: user });

            if(!foundCart){
                res.json({ success: true, message: [] })
            }
            res.json({ success: true, data: foundCart.items })
        }
        catch(e){
            res.json({ success: false, message: "Error for getting user cart" })
        }
    },


    addToCart: async function(req,res){
        try{
            const { product, user, quantity } = req.body;
            const foundCart = await CartModel.findOne({ user: user });
            // console.log(`CART: ${foundCart}`);

            //If cart doest exists
            if(!foundCart){
                const newCart = new CartModel({ user: user })
                newCart.items.push({
                    product: product,
                    quantity: quantity
                });
                await newCart.save();
                return res.json({ success:true, data: newCart, message: "New Product Added Successfully" })
            }

            //If cart exists
            const updatedCart = await CartModel.findOneAndUpdate(
                {user: user},
                {$push: {items: { product: product, quantity: quantity } } },
                {new: true}
                );
                // await updatedCart.save();
            console.log(updatedCart);
            return res.json({ success: true, data: updatedCart, message: "Product Updated Successfully" })

        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    },

    removeCart: async function(req, res){
        try{

            const { user, product } = req.body;
            const updatedCart = await CartModel.findOneAndUpdate(
                {user: user},
                {$pull: { items: { product:  product } } },
                { new: true }
            );
            return res.json({ success: true, data: updatedCart, message: 'Product Removed Successfully' })
        }
        catch(e){
            res.json({ success: false, message: e.toString() })
        }
    }
};

module.exports = CartController;