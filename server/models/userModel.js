const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    u_id : String,
    u_fname : String,
    u_lname : String,
    u_email : String,
    u_email_verified : Boolean,
    u_password : String,
    u_mobile : String,
    u_profile : String,
    u_status : Boolean,
    u_created_on : String,
    u_updated_on  : String,
});
module.exports = mongoose.model("user",userSchema,'users');