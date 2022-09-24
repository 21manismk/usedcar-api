var connection = require('../../config/db');

const getcarstypes=(req,res)=>{
    var qry="SELECT car_type from car_type"
connection.query(qry,function(err,result){
    if(err){
        res.send({
            status:400,
            message:"err"
        })
    }
    else if(result){
        res.send({
            status:200,
            message:"success",
            data:result
        })
    }
})
}
const getcarsbytypes=(req,res)=>{
    var qry="SELECT * FROM car_details cd INNER JOIN car_type ct ON cd.car_type=ct.id WHERE ct.car_type=?"
connection.query(qry,[req.body.car_type],function(err,result){
    console.log(result)
    if(err){
        res.send({
            status:400,
            message:"err"
        })
    }
    else if(result){
        res.send({
            status:200,
            message:"success",
            data:result
        })
    }
})
}
const getcarbyid=(req,res)=>{
    var qry="SELECT * FROM car_details WHERE id=?; "
connection.query(qry,[req.body.cartype],function(err,result){
    if(err){
        res.send({
            status:400,
            message:"err"
        })
    }
    else if(result){
        res.send({
            status:200,
            message:"success",
            data:result
        })
    }
})
}
const filtertype=(req,res)=>{
    var qry="SELECT * FROM car_details cd WHERE cd.used_car='?'"
    connection.query(qry,[req.body.value],function(err,result){
        console.log(result)
        if(err){
            res.send({
                status:400,
                message:"err"
            })
        }
        else if(result){
            res.send({
                status:200,
                message:"success",
                data:result
            })
        }
    })
}
module.exports={
    getcarstypes,getcarsbytypes,getcarbyid,filtertype
}