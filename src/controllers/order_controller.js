const OrderModel = require("./../models/cart_model");

const OrderController = {

    createOrder: async function(req,res){
        try{
            const { user, items } = req.body;
            const newOrder = OrderModel({
                user: user,
                items: items
            });

            await newOrder.save();
            return res.json({ success: false, data: newOrder, message: "Order Placed" })

        }
        catch(e){
            return res.json({ success: false, message: e.toString() })
        }
    },

    fetchOrderForUser: async function(req,res){
        try{
            const userId = req.params.userId;
            const foundOrders = await OrderModel.find({
                "user.id": userId
            });
            return res.json({ success: true, data: foundOrders })
        }
        catch(e){
            return res.json({ success: false, message: "Failed" })
        }
    },

    updateOrderStatus: async function(req,res){
        try{
            const { orderId, status} = req.body;

            const updatedOrder = await OrderModel.findOneAndUpdate(
                { "_id": orderId },
                { "status": status },
                { new: true }
                );
            return res.json({ success: true, data: updatedOrder })
        }
        catch(err){
            return res.json({ success: false, message: err.toString() })
        }
    }
};

module.exports = OrderController;