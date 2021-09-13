const nodemailer = require('nodemailer');

module.export = response = {
    status : Boolean,
    message : String
}

module.export = validateParams = (request,feilds) => {
    var postKeys = [];
    var missingFeilds = [];
    
    for(var key in request.body){
        postKeys.push(key);
    }
    for(var i=0;i<feilds.length;i++){
        if(postKeys.indexOf(feilds[i]) >= 0){
            if(request.body[feilds[i]] == "")
            missingFeilds.push(feilds[i]);
        } else{
            missingFeilds.push(feilds[i]);
        }
    }
    if(missingFeilds.length>0){
        response.status = false;
        response.message = "Following Fields are required : "+missingFeilds;
        return response;
    }
    response.status = true;
    response.message = "";
    return response;
}

module.export = getData = (Model,query) =>{
    return new Promise((resolve,reject)=>{
        Model.find(query)
        .exec((err,data)=>{
            if(err){
                response.status = false;
                response.message = err;
                delete response.data;
                resolve(response);
                return false;
            } 
            if(data.length === 0){
                response.status = false;
                response.message = "No Data Found !!!";
                delete response.data;
                resolve(response);
                return false;
            }
            response.status = true;
            response.message = "Data Found Successfully";
            response.data = data;
            resolve(response);
        });
    })
}

module.export = postData = (modalRefrence) =>{
    return new Promise((resolve,reject)=>{
        modalRefrence.save((err,savedData) => {
            if(err){
                response.status = false;
                response.message = err;
                resolve(response);
                return false;
            } 
            response.status = true;
            response.message = "Data Inserted Successfully";
            response.data = savedData._id;
            resolve(response);
        });
    })
}

module.export = updateData = (Model,DataObject,_id) =>{
    return new Promise((resolve,reject)=>{
        Model.findByIdAndUpdate(_id, { $set : DataObject},(err,updatedData) => {
            delete response.data;
            if(err){
                response.status = false;
                response.message = err;
                resolve(response);
                return false;
            } 
            response.status = true;
            response.message = "Data Updated Successfully";
            resolve(response);
        });
    });
}

module.export = sendMail = async (mail,subject,mailBody) => {
    return new Promise( async (resolve,reject) =>{
        let transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'apikey',
              pass: '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'
            }
        });
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Beautistic" <info@beautistic.com>', // sender address
            to: mail, 
            subject: subject, // Subject line
            html: mailBody // html body
        }).then((success) => {
            resolve(success);
        }).catch((err) => {
            reject(err.response)
        });
    })
}