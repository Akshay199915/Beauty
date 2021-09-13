require('../connection');
require("../functions");
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const UserModel = require('../models/userModel');

const multer = require("multer");
const storage = multer.diskStorage({
    destination : (req,file,action)=>{
        action(null,'./src/assets/images/');
    },
    filename : (req, file, action) => {
        let filename = file.originalname;
        let ext = filename.split(".");
        action(null, Math.floor(Math.random()*1000000)+"."+ext[ext.length-1]);
    }
})
const filefilter = (req,file,action) => {
    console.log(req);
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" ||file.mimetype === "image/png"){
        action(null,true)
    }else{
        action(null,false)
    }
}
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*10
    },
    fileFilter : filefilter
});

//to get list of all users
router.post('/get_all', async (req,res) => {
    res.json(await getData(UserModel,{}))
});

router.post('/get', async (req,res) => {
    let requiredfeilds = ['user_id'];
    let validateResult = validateParams(req,requiredfeilds);
    if(!validateResult.status){
        res.json(validateResult);
        return false;
    }
    let { user_id } = req.body;
    res.json(await getData(UserModel,{'_id' : user_id}));
});

router.post('/register', async (req,res) => {
    let requiredfeilds = ['fname','lname','email','password','mobile'];
    let validateResult = validateParams(req,requiredfeilds);
    if(!validateResult.status){
        res.json(validateResult);
        return false;
    }
    let newUser = new UserModel();
    let {fname, lname, email, password, mobile} = req.body;
    newUser.u_fname = fname;
    newUser.u_lname = lname;
    newUser.u_email = email;
    newUser.u_password = md5(password);
    newUser.u_mobile = mobile;
    newUser.u_status = true;
    newUser.u_email_verified = false;
    newUser.u_created_on = Math.round(new Date().getTime()/1000);
    // verify email already exists
    let emailResponse = await getData(UserModel,{'u_email' : email});
    if(emailResponse.status){
        response.status = false;
        response.message = "Email is Already Exist";
        delete response.data;
        return res.json(response);
    }
    // verify mobile already exists
    let mobileResponse = await getData(UserModel,{'u_mobile' : mobile});
    if(mobileResponse.status){
        response.status = false;
        response.message = "Mobile Number is Already Exist";
        delete response.data;
        return res.json(response);
    }
    res.json(await postData(newUser))
});

router.post('/login', async (req,res) => {
    let requiredfeilds = ['email','password'];
    let validateResult = validateParams(req,requiredfeilds);
    if(!validateResult.status){
        res.json(validateResult);
        return false;
    }
    let {email, password} = req.body;
    let result = await getData(UserModel,{
        'u_status':true, 
        'u_email':email,
        'u_password': md5(password)
    });
    return res.json(result);
});

router.post('/verify_email_send', async (req,res) => {
    let response = {};
    let requiredfeilds = ['user_id'];
    let validateResult = validateParams(req,requiredfeilds);
    if(!validateResult.status){
        return res.json(validateResult);
    }
    let { user_id } = req.body;
    let userResponse = await getData(UserModel,{'_id':user_id});
    if(userResponse.status){
        let user_email = userResponse.data[0].u_email;
        let verified = userResponse.data[0].u_email_verified;
        if(!verified){
            let subject = "Email Verification";
            let mailBody = "<div style='width:100%;background:#eee;padding:50px 0 50px 0'><div style='"+
            "width:70%;background:white;padding:25px;margin:auto;text-align:center'><p style='margin:20px;"+
            "font-size:2.5em;text-align:center'>E-Mail Verification</p><div style='clear:both'></div>"+
            "<span style='font-size:1.2em;margin:20px 0'>To Verify your Email Address with Beautistic.com"+
            "</span><br><br><label >Click on Below Link to Verify your Email Address</label><br>"+
            "<a href='http://localhost:3000/api/v1/user/verify_now/"+user_email+"/"+user_id+"' "+
            "target='_blank'><button style='font-size: 15px;text-align: center;padding: 7px 100px;"+
            "border: none;cursor:pointer;background:darksalmon;color: white;margin: 25px 0;'>Verify Now"+
            "</button></a><br><span style='font-size:0.9em;text-align:center;margin-bottom:30px;color:burlywood'>"+
            "If you already verified your email address then simply ignore this email</span></div><p "+
            "style='text-align:center;font-size:0.9em;margin-top:50px;color:dimgrey'>This is a system "+
            "generated email, Please don't reply back</p></div>";
            sendMail(user_email,subject,mailBody)
            .then(() => {
                response.status = true;
                response.message = "Verification Email has been sent to Your Registered Email Address"
                res.json(response);
            })
            .catch(() => {
                response.status = false;
                response.message = "Error While Sending Email";
                res.json(response);
            });
            return false;
        }
        response.status = false;
        response.message = "Your Email is Already Verified";
        res.json(response);
        return false;
    }
    response.status = false;
    response.message = "Invalid User Request";
    res.json(response);
    return false;
});

router.get('/verify_now/(:email)/(:u_id)', async (req,res) => {
    let { email, u_id } = req.params;
    let userResponse = await getData(UserModel,{'_id':u_id,'u_email':email});
    if(userResponse.status){
        let dataObject = {
            "u_email_verified" : true
        }
        let result = await updateData(UserModel,dataObject,u_id);
        if(result.status){
            response.status = true;
            response.message = "Email Address has been Verified Successfully"
            delete response.data;
            return res.json(response);
        }
        response.status = false;
        response.message = "Token Expired"
        delete response.data;
        return res.json(response);
    }
    response.status = false;
    response.message = "Invalid User Request";
    delete response.data;
    return res.json(response);
});

// router.post('/update_user_profile', upload.single('profile_pic'), async (req,res) => {
//     let requiredfeilds = ['user_id'];
//     let validateResult = validateParams(req,requiredfeilds);
//     if(!validateResult.status){
//         res.json(validateResult);
//         return false;
//     }
//     let { user_id } = req.body;

//     if(req.file === undefined){
//         response.status = false;
//         response.message = "Invalid File Type";
//         delete response.data;
//         res.json(response);
//         return false;    
//     }
//     response.status = true;
//     response.message = "success";
//     response.data = req.file;
//     res.json(response);
//     return false;
// });


// forgot password/
// set html page to verification email send
// set html page to verify email now
// remember me check working play with cookies
// upload profile pic task
// update user profile 

//login with facebook and google



// error Requests
router.get('*', async (req,res) => {
    response.status = false;
    response.message = "unAuthorized Request";
    res.json(response);
});

router.post('*', async (req,res) => {
    response.status = false;
    response.message = "unAuthorized Request";
    res.json(response);
});

module.exports = router;