const CategoryModel = require("./../models/category_model");

const CategoryController = {
    createCategory : async function(req, res){
        try{
            const categoryData = req.body;
            const newCategory = new CategoryModel(categoryData);
            await newCategory.save();
            res.json({ success: true, data: newCategory, message: "Category Created!" })    
        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    },

    fetchAllCategory : async function(req, res){
        try{
            const allCategory = CategoryModel.find();
            res.json({ success: true, data: allCategory})    
        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    }
}

module.exports = CategoryController;