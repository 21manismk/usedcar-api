var connection = require('../../config/db');
async function carslisting(id) {
    return new Promise(function (resolve, reject) {
        // console.log("kk")
        // console.log("kk",id)
              var qry2="SELECT COUNT(cd.id) as count FROM car_model_details cd INNER JOIN car_type ct ON cd.car_type=ct.id WHERE cd.car_type=?"
        connection.query(qry2,[id],function(err,result){
            
            if (err) {
				//logger.error(err);
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
async function carimages(id) {
    return new Promise(function (resolve, reject) {
        console.log("kk")
      
              var qry2="SELECT i.car_id, CONCAT(?, CASE WHEN i.car_image != '' THEN CONCAT(i.car_image) END) AS car_image FROM car_image i left JOIN car_details cd ON i.car_id=cd.id WHERE i.car_id=?"
        connection.query(qry2,['/public/carsimage/',id],function(err,result){
            console.log(result)
            if (err) {
				logger.error(err);
				//console.log(err);
				resolve([]);
			}
			if (result) {
				
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
    var qry="SELECT * FROM car_details WHERE id=?"
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
    var qry="SELECT cd.car_id,mdl.car_model AS car_name,cd.price,f.fuel_type,t.transmission_type AS gear_type FROM car_details cd INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type LEFT JOIN car_model_details cm ON cd.car_id=cm.id LEFT JOIN car_model mdl ON cm.car_model=mdl.id "
    let data=[]
    console.log("req.query.value",req.body.value)
    if (req.body.value) {
        qry += "where cd.used_car IN (?)";
        data.push(req.body.value);
}
connection.query(qry,[data],async function(err,result){
    console.log(result)
   // console.log(result.length)
    console.log(err)
    if(err){
        res.send({
            status:400,
            message:"err"
        })
    }
    else if(result){
             
        for(let i=0;i<result.length;i++){
            result[i].img= await carimages(result[i].car_id)
        console.log("im",result[i].car_id)
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
const get_carsbytype=(req,res)=>{
    let result={}
    var qry="SELECT ct.id,ct.car_type,CONCAT(?,CASE WHEN ct.car_image != '' THEN  Concat(ct.car_image) end) as car_image  FROM car_type ct"
    connection.query(qry,['/public/carsimage/'],async function(err,result){
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
const carsdetailbyid=(req,res)=>{
var qry="SELECT cd.id AS car_id,ck.car_make,ct.car_type,mdl.car_model,ft.fuel_type, tt.transmission_type,"
+"(SELECT GROUP_CONCAT(CONCAT(?, CASE WHEN ci.car_image != '' THEN CONCAT(ci.car_image) END)) "
+"FROM car_image ci "
+"JOIN car_details cd ON ci.car_id=cd.id "
+"WHERE ci.car_id=?) AS car_image, "
+"(SELECT GROUP_CONCAT(CONCAT('', CASE WHEN cc.cars_conveninance != '' THEN CONCAT(cc.cars_conveninance) END)) "
+"FROM cars_conveninance cc "
+"JOIN car_details cd ON cc.car_id=cd.id "
+"WHERE cc.car_id=?) AS cars_conveninance,"
+"(SELECT GROUP_CONCAT(CONCAT('', CASE WHEN ce.cars_entertainment != '' THEN CONCAT(ce.cars_entertainment) END)) "
+"FROM cars_entertainment ce "
+"JOIN car_details cd ON ce.car_id=cd.id "
+"WHERE ce.car_id=?) AS cars_entertainment, "
+"(SELECT GROUP_CONCAT(CONCAT('', CASE WHEN cex.cars_exterior != '' THEN CONCAT(cex.cars_exterior) END)) "
+"FROM cars_exterior cex "
+"JOIN car_details cd ON cex.car_id=cd.id "
+"WHERE cex.car_id=?) AS cars_exterior, "
+"(SELECT GROUP_CONCAT(CONCAT('', CASE WHEN cin.cars_interior != '' THEN CONCAT(cin.cars_interior) END)) "
+"FROM cars_interior cin "
+"JOIN car_details cd ON cin.car_id=cd.id "
+"WHERE cin.car_id=?) AS cars_interior, "
+"(SELECT GROUP_CONCAT(CONCAT('', CASE WHEN cs.cars_safety != '' THEN CONCAT(cs.cars_safety) END)) "
+"FROM cars_safety cs "
+"JOIN car_details cd ON cs.car_id=cd.id "
+"WHERE cs.car_id=?) AS cars_safety,co.cars_overview,cd.price,cd.used_car,cd.total_owner,cd.kilometer_driven,cd.total_review,cd.avg_review,cd.year_ofsale,cd.color,cd.mileage,cd.engine_size,cd.door,cd.cylinder,cd.vin,cdt.driven_type "
+"FROM car_details cd "
+"LEFT JOIN car_model_details cm ON cd.car_id=cm.id "
+"LEFT JOIN car_make ck ON cm.car_make=ck.id LEFT JOIN car_type ct ON cm.car_type=ct.id  LEFT JOIN car_model mdl ON cm.car_model=mdl.id LEFT JOIN fuel_type ft ON cd.fuel_type=ft.id "
+"LEFT JOIN transmission_type tt ON cd.transmission_type=tt.id JOIN cars_overview co ON co.car_id=cd.id LEFT JOIN car_driven_type cdt ON cd.driven_type=cdt.id "
+"WHERE cd.is_featured='1' AND cd.id=?"
connection.query(qry,['/public/carsimage/',req.body.id,req.body.id,req.body.id,req.body.id,req.body.id,req.body.id,req.body.id],async function(err,result){
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
            data:result,
           

        })
    }
})
}
const getcars_similartype=(req,res)=>{
      var qry="SELECT cd.id,cd.car_name,cd.price,f.fuel_type,Concat(?,CASE WHEN cd.car_image != '' THEN  Concat(cd.car_image) end) as car_image,t.transmission_type AS gear_type,cd.avg_review FROM car_details cd INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type where cd.car_type=?"
     let data=[req.body.car_type]
     connection.query(qry,['/public/carsimage/',data],function(err,result){
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
//  const listingfilter=(req,res)=>{
//    // var data=['/public/carsimage/','0']
//     var qry="SELECT cd.id,cd.car_name,cd.price,f.fuel_type,Concat(?,CASE WHEN cd.car_image != '' THEN  Concat(cd.car_image) end) as car_image,t.transmission_type AS gear_type FROM car_details cd INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type where cd.status=?"
//     let data=[]
//     console.log("req.query.value",req.body.value)
//     if (req.body.value) {
//         qry += "AND cd.used_car IN (?)";
//         data.push(req.body.value);
// }
// if (req.body.value) {
//     qry += "AND cd.used_car IN (?)";
//     data.push(req.body.value);
// }
// connection.query(qry,['/public/carsimage/','0',data],function(err,result){
//     console.log(result)
//    // console.log(result.length)
//     console.log(err)
//     if(err){
//         res.send({
//             status:400,
//             message:"err"
//         })
//     }
//     else if(result){
//         res.send({
//             status:200,
//             message:"success",
//             data:result
//         })
//     }
// })
// }
module.exports={
    getcarstypes,getcarsbytypes,getcarbyid,getallcars,get_carsbytype,carsdetailbyid,getcars_similartype,
    // filtertype,
}