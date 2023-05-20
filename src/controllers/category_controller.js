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

    fetchAllCategory: async function(req, res){
        try{
            const allCategory = await CategoryModel.find();
            res.json({ success: true, data: allCategory })    
        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    },

    fetchCategoryById: async function(req, res){
        try{
            const categoryId = req.params.id;
            const foundCategory = await CategoryModel.findById(categoryId);
            if(!foundCategory){
                res.json({ success: false, message: "Category Not Found" })
            }

            res.json({ success: true, data: foundCategory })    
        }catch(e){
            res.json({ success: false, message: e.toString() })
        }
    }

}

module.exports = CategoryController;