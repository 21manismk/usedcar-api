var connection = require('../../config/db');

const signup=(req,res)=>{
    var name=req.body.name
    var password=req.body.password
    var confirm_password=req.body.confirm_password

    var qry="select * from user where username=?"
    connection.query(qry,[name],function(err, result){
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
                        message: "Username Already Exist",
                        data:[],
            })
        }
        else{   
     var qry1="INSERT INTO USER  (username,password,confirm_password) VALUE (?,?,?)"
    connection.query(qry1,[name,password,confirm_password],function(err, result1){
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
  
    var qry="select * from user where username=? and password=?"
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
module.exports={
    signup,login
}