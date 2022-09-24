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
    var data=req.body.value
    var qry="SELECT * FROM car_details cd WHERE cd.status=?"
    console.log("result")
        if (req.query.value && req.query.value > 0) {
        qry += " and cd.used_car IN ('?')";
        data.push(req.query.value);
    }
    connection.query(qry,['0'],function(err,result){
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
const getallcars=(req,res)=>{
    var qry="SELECT cd.price,f.fuel_type,Concat(?, CASE WHEN cd.car_image != '' THEN  Concat(cd.car_image) end) as car_image,t.transmission_type AS gear_type FROM car_details cd INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type where cd.status=?"
connection.query(qry,['/public/carsimage/','0'],function(err,result){
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
    getcarstypes,getcarsbytypes,getcarbyid,filtertype,getallcars
}