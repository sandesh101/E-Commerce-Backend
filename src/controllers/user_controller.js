const UserModel = require("./../models/user_model");
const bcrypt = require('bcrypt');

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

    // /signIn endpoint || TO SIGN IN THE USERS
    signIn: async function(req, res){
        try{
            //getting only the email and password of user
            const { email, password} = req.body;
            //Searching for the user based on the email ID
            const foundUser = await UserModel.findOne( { email: email } )
            // console.log(foundUser);
            //Handing the NOT FOUND USER
            if(!foundUser){
                res.json( { success: false, message: "User NOT Found!" } )
            }

            //comparing the password of the user    
            const isPasswordEqual = bcrypt.compareSync(password, foundUser.password);

            //Handling the not matched password
            if(!isPasswordEqual){
                res.json( { success: false, message: "Password DIDN'T Match"} )
            }

            //Returning the found user data
            res.json( { success: true, data: foundUser } )
        }
        catch(e){
            res.json({ success: false, message: e.toString() })
        }
    }

};

module.exports = UserController;
