const UserModel = require("./../models/user_model");

const UserController = {
  // /createAccount endpoint || TO CREATE ACCOUNT OF USERS
  createAccount: async function (req, res) {
    try {
        //creating a new user
      const userData = req.body;
      const newUser = new UserModel(userData);
      await newUser.save();
      //sending the suceess message if user creates successfully
      res.json({ success: true, data: newUser, message: "User Created Successfully!!" })
    } catch (e) {
        res.json({ success: false, message: e.toString() })
    }
  },
};

module.exports = UserController;
