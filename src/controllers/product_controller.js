const ProductModel = require("./../models/product_model");
const ProductController = {
    createProduct: async function(req,res){
        try{
            const productData = req.body;
            const newProduct  = new ProductModel(productData);
            await newProduct.save();

            res.json({ successs: true, data: newProduct, message: "Product Created Successfully" })
        }catch(e){
            res.json({ successs: false, message: e.toString() })
        }
    },
    fetchAllProduct: async function(req,res){
        try{
            const allproduct = await ProductModel.find();

            res.json({ successs: true, data: allproduct })
        }catch(e){
            res.json({ successs: false, message: e.toString() })
        }
    },
    fetchProductByCategory: async function(req,res){
        try{
            const categoryId = req.params.id;
            const fetchedProduct = await ProductModel.find({ category: categoryId });
            res.json({ successs: true, data: fetchedProduct })
        }catch(e){
            res.json({ successs: false, message: e.toString() })
        }
    },
}


module.exports = ProductController;