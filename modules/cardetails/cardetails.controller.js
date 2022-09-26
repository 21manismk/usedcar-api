var connection = require('../../config/db');
async function carslisting(id) {
    return new Promise(function (resolve, reject) {
        // console.log("kk")
        // console.log("kk",id)
              var qry2="SELECT COUNT(cd.id) as count FROM car_details cd INNER JOIN car_type ct ON cd.car_type=ct.id WHERE cd.car_type=?"
        connection.query(qry2,[id],function(err,result){
            
            if (err) {
				logger.error(err);
				//console.log(err);
				resolve([]);
			}
			if (result) {
				console.log(result);
				resolve(result);
			}
        })
      
       
   // }
})
}   
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
// const filtertype=(req,res)=>{
    
//     var query="SELECT * FROM car_details cd WHERE cd.status=?"
//     console.log("result")
//     var data=['0']
//         if (req.query.value && req.query.value > 0) {
//             query += " and cd.used_car IN ('?')";
//         data.push(req.query.value);
//     }
//     connection.query(query,[data],function(err,result){
//         console.log(result)
//         if(err){
//             res.send({
//                 status:400,
//                 message:"err"
//             })
//         }
//         else if(result){
//             res.send({
//                 status:200,
//                 message:"success",
//                 data:result
//             })
//         }
//     })
// }

const getallcars=(req,res)=>{
   // var data=['/public/carsimage/','0']
    var qry="SELECT cd.car_name,cd.price,f.fuel_type,Concat(?,CASE WHEN cd.car_image != '' THEN  Concat(cd.car_image) end) as car_image,t.transmission_type AS gear_type FROM car_details cd INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type where cd.status=?"
    let data=[]
    console.log("req.query.value",req.body.value)
    if (req.body.value) {
        qry += " and cd.used_car IN ('?')";
        data.push(req.body.value);
}
connection.query(qry,['/public/carsimage/','0',data],function(err,result){
    console.log(result)
    console.log(err)
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
const get_carsbytype=(req,res)=>{
    let result={}
    var qry="SELECT ct.id,ct.car_type,CONCAT(?,CASE WHEN ct.car_image != '' THEN  Concat(ct.car_image) end) as car_image  FROM car_type ct"
    connection.query(qry,['/public/cartype/'],async function(err,result){
        if(err){
            res.send({
                status:400,
                message:"err"
            })
        }
        else if(result.length>0){
             for(let i=0;i<result.length;i++){
                result[i].count=await carslisting(result[i].id)
                // console.log("resu",result[i].length)  
                // console.log("resu",result[i].id) 
   
             }
             status = 200;
             success = true;
             result.msg = 'success..!';

             result.data = result;
    // console.log("resu",result)

    res.send(result);
             }
            
        
    })
}
module.exports={
    getcarstypes,getcarsbytypes,getcarbyid,getallcars,get_carsbytype,
    // filtertype,
}