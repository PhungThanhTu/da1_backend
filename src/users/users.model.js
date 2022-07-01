const mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username:{type:String,index:true},
    password:String,
    fullname:String,
    refreshtoken:String,
})
// convert schema to model
var User = mongoose.model('User',userSchema,'users');

exports.getUser = async username => {
    return await User.findOne().where('username').equals(username);
}

exports.createUser = async user => {
   
        // create document instance
        let newUser = new User(
            user);
        try {
            await newUser.save(function (err, user) {
                if (err) {console.error("cannot create user, error occured" + err)}
                console.log(user + " saved to user collection.");
            });
            return true;
        }
        catch {
            return false;
        }
       
}

exports.updateToken = async (username,refreshToken) => {
    const filter = {"username":username};
    const update = {"refreshtoken":refreshToken};
    try {
        let doc = await User.findOneAndUpdate(filter,update);
        console.log(`refresh token create ${doc}`);
        return true;
    }
    catch {
        console.log("update failed");
        return false;
    }


    
}