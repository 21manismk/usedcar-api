var connection = require('../../config/db');
//  var images = require ('../../public/image/img1.jpeg');


const signup=(req,res)=>{
    var name=req.body.name
    var password=req.body.password
    var email=req.body.email
    var phone=req.body.phone
    var confirm_password=req.body.confirm_password

    var qry="select * from users where user_name=? and email=? "
    connection.query(qry,[name,email],function(err, result){
        if(err){
            res.send({
                status: '400',
                        message: err,
                        data:[]
            })
        }
        else if(result.length>0){
            res.send({
                status: '400',
                        message: "Given Username or emailId is Already Exist",
                        data:[],
            })
        }
        else{   
     var qry1="INSERT INTO users  (user_name,password,email) VALUE (?,?,?)"
    connection.query(qry1,[name,password,email],function(err, result1){
if(err){
    res.send({
        status: '400',
                message: err,
                data: []
    })
}
else if(result1.affectedRows>0>0){
    res.send({
        status: '200',
                message: "Registered successfully",
                data: result1,
    })
}
else{
    res.send({
        status: '400',
                message: "register failed",
                data:[]
    })
}
    })
}
})

}
const login=(req,res)=>{
    var name=req.body.name
    var password=req.body.password
  
    var qry="select * from users where user_name=? and password=?"
    connection.query(qry,[name,password],function(err, result){
if(err){
    res.send({
        status: '400',
                message: err,
                data: []
    })
}
else if(result.length>0){
    res.send({
        status: '200',
                message: "success",
                data: result,
    })
}
else{
    res.send({
        status:400,
        message:"invalid username and password",
        data:[]
    })
}
    })

}
const Banner=(req,res)=>{ 
    
    let qry ="SELECT CONCAT(?, CASE WHEN car_image != '' THEN  Concat(car_image) end) as  car_image from banner"
   
    connection.query(qry,['/public/image/'],function(err, result){
        console.log("res",result)
    if(result)
    {
        res.send({
            success: true,
            message: 'successfull..!',
            data: result
        });
    }
    else
    {
        res.send({
            success: false,
            message: 'Unsuccessfull..!',
            data: []
        }); 
    }
})
}
module.exports={
    signup,login,Banner
}