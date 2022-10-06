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
async function QueryListData(query,data,res) {
    return new Promise( function(resolve , reject ){
      
        connection.query(query,data,(err, result,cache) => {
            
            if(err) 
            {
                //console.log(err);
                logger.error(err);
               
            }
            
            //console.log(typeof result);
    
            if(result){
                if(cache.isCache==false)
            {
                sql.flush();
            }
            resolve(result);
            } 
                
            else resolve([]);
        });
      });
    };
async function get_first_img(result,req,res){
    return new Promise(async function(resolve, reject){
            for(var i=0; i<result.length;i++)
            {
                let query ="SELECT i.car_id, CONCAT(?, CASE WHEN i.car_image != '' THEN CONCAT(i.car_image) END) AS car_image FROM car_image i left JOIN car_details cd ON i.car_id=cd.id WHERE i.car_id=?";
                
                if(result[i]['car_image'] && typeof result[i]['car_image'] !=="undefined" && result[i]['car_image']>0){
                    var data =['/public/carsimage/',result[i]['car_image']];	
                }else{
                     var data =['/public/carsimage/',result[i].id];
                }
               
                 let reslt= await QueryListData(query,data,res);
               

                 if(reslt && reslt.length>0)
                 {
                     result[i]['car_image'] =reslt[0]['car_image'];
                 }
                 else
                 {
                     result[i]['car_image'] ='';
                 }
            }
       console.log("fffffff======>>>>",result)
            resolve(result);
        });
    };
async function carimages(id) {
    return new Promise(function (resolve, reject) {
        console.log("resu",id)
              var qry2="SELECT i.car_id, CONCAT(?, CASE WHEN i.car_image != '' THEN CONCAT(i.car_image) END) AS car_image FROM car_image i left JOIN car_details cd ON i.car_id=cd.id WHERE i.car_id=?"
        connection.query(qry2,['/public/carsimage/',id],function(err,resu){
            console.log(qry2)
            if (err) {
				logger.error(err);
				//console.log(err);
				resolve([]);
			}
			if (resu) {
                console.log("resu",resu)
            first_img=resu[0].car_image
                
				
            }
            console.log("first_img",first_img)
            resolve(first_img);
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
    var qry="SELECT cd.id,mdl.car_model AS car_name,ct.car_type,cd.price,f.fuel_type,t.transmission_type AS gear_type FROM car_details cd left JOIN transmission_type t ON t.id=cd.transmission_type left JOIN fuel_type f ON f.id=cd.fuel_type LEFT JOIN car_model_details cm ON cd.id=cm.id LEFT JOIN car_model mdl ON cm.car_model=mdl.id LEFT JOIN car_type ct ON ct.id=cm.car_type "
    let data=[]
    console.log("req.query.value",req.body.value)
    if (req.body.value) {
        qry += "where cd.used_car IN (?)";
        data.push(req.body.value);
}
connection.query(qry,[data],async function(err,result){
       if(err){
        res.send({
            status:400,
            message:"err"
        })
    }
    else if(result){
       await get_first_img(result,req,res)
       console.log("img",result)
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
function splitStr(str, separator) {
    var separator = ",";
    // Function to split string
    var string = str.split(separator);
      
    console.log(string);
}
const carsdetailbyid=(req,res)=>{
    
 var image={}
 var conveninance={}
 var entertainment={}
 var exterior={}
 var interior={}
 var safety={}
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
    if(result.length>0){
        console.log(result)
        console.log(result[0].car_id)
        firstimg=await carimages(result[0].car_id)
        var separator=',';
         image=result[0].car_image
         conveninance=result[0].cars_conveninance
         entertainment=result[0].cars_entertainment
         exterior=result[0].cars_exterior
         interior=result[0].cars_interior
         safety=result[0].cars_safety
       // var car_image= splitStr(image)
        var car_image= image.split(separator)
        var cars_conveninance=conveninance.split(separator)
        var cars_entertainment= entertainment.split(separator)
        var cars_exterior= exterior.split(separator)
        var cars_interior= interior.split(separator)
        var cars_safety= safety.split(separator)
          console.log("car_image",car_image)

             res.send({
            status:200,
            message:"success",
            data:result,
             car_image:car_image,
             cars_conveninance:cars_conveninance,
             cars_entertainment:cars_entertainment,
             cars_exterior:cars_exterior,
             cars_interior:cars_interior,
             cars_safety:cars_safety,
             firstimg:firstimg
            

        })
    }
    else if(result.length==0)
    {
        res.send({
            status:400,
            message:"no data found"
        })
    }
})
}
const getcars_similartype=(req,res)=>{
      var qry="SELECT cd.id,cm.car_model,cd.price,f.fuel_type,t.transmission_type AS gear_type,cd.avg_review FROM car_details cd INNER JOIN car_image ci ON ci.id=cd.id INNER JOIN car_model_details cmd ON cmd.id=cd.id INNER JOIN car_model cm ON cm.id=cmd.car_model INNER JOIN transmission_type t ON t.id=cd.transmission_type INNER JOIN fuel_type f ON f.id=cd.fuel_type INNER JOIN car_type ct ON ct.id=cmd.car_type where ct.car_type=?"
      connection.query(qry,[req.body.car_type],async function(err,result){
     console.log("ss",result)
     console.log(err)
     if(err){
         res.send({
             status:400,
             message:"err"
         })
     }
     else if(result){
        await get_first_img(result,req,res)
        console.log("img",result)
         res.send({
             status:200,
             message:"success",
             data:result
             
         })
}
 })
 }
 const filtertype=(req,res)=>{
    // var data=['/public/carsimage/','0']
     var qry="SELECT cd.id,mdl.car_model AS car_name,cd.price,ct.car_type,f.fuel_type,t.transmission_type AS gear_type,cd.total_review FROM car_details cd LEFT JOIN transmission_type t ON t.id=cd.transmission_type LEFT JOIN fuel_type f ON f.id=cd.fuel_type LEFT JOIN car_model_details cm ON cd.id=cm.id LEFT JOIN car_model mdl ON cm.car_model=mdl.id LEFT JOIN car_type ct ON ct.id=cm.car_type  where cd.is_featured='1' "
   let data=[]
     console.log("car_make",req.body.car_make)
     console.log("car_type",req.body.car_type)
     console.log("car_type",req.body.value)
    
       if (req.body.car_make!=null&&req.body.car_make!=""&&req.body.car_make!=undefined) {
        console.log("k")
         qry += " And cm.car_make ="+req.body.car_make;
         data.push(req.body.car_make);
        }
 if (req.body.car_type!=null&&req.body.car_type!=""&&req.body.car_type!=undefined ) {
    qry += " AND cm.car_type="+req.body.car_type;
    data.push(req.body.car_type);
   }
console.log(data);
 if (req.body.car_model!=null&&req.body.car_model!=""&&req.body.car_model!=undefined) {
    qry += " AND cm.car_model="+req.body.car_model;
    data.push(req.body.car_model);
}
if (req.body.fuel_type!=null&&req.body.fuel_type!=""&&req.body.fuel_type!=undefined) {
    qry += " AND cd.fuel_type="+req.body.fuel_type;
    data.push(req.body.fuel_type);
}
if (req.body.transmission_type!=null&&req.body.transmission_type!=""&&req.body.transmission_type!=undefined) {
    qry += " AND cd.transmission_type="+req.body.transmission_type;
    data.push(req.body.transmission_type);
}
if (req.body.startYearOfSale!=null&&req.body.startYearOfSale!=""&&req.body.startYearOfSale!=undefined) {
    qry += " AND cd.year_ofsale>"+req.body.startYearOfSale;
    data.push(req.body.startYearOfSale);
}
if (req.body.endYearOfSale!=null&&req.body.endYearOfSale!=""&&req.body.endYearOfSale!=undefined) {
    qry += " AND cd.year_ofsale<"+req.body.endYearOfSale;
    data.push(req.body.endYearOfSale);
}
if (req.body.startKilometerDriven!=null&&req.body.startKilometerDriven!=""&&req.body.startKilometerDriven!=undefined) {
    qry += " AND cd.kilometer_driven>"+req.body.startKilometerDriven;
    data.push(req.body.startKilometerDriven);
}
if (req.body.endKilometerDriven!=null&&req.body.endKilometerDriven!=""&&req.body.endKilometerDriven!=undefined) {
    qry += " AND cd.kilometer_driven<"+req.body.endKilometerDriven;
    data.push(req.body.endKilometerDriven);
}
if (req.body.value!=null&&req.body.value!=""&&req.body.value!=undefined) {
    qry += " and cd.used_car IN "+"('"+req.body.value+"'"+")";
    data.push(req.body.value);
}
console.log(qry)
 connection.query(qry,[data],async function(err,result){
    console.log(err)
        if(err){
         res.send({
             status:400,
             message:"err"
         })
     }
     else if(result){
        await get_first_img(result,req,res)
        console.log("img",result)
         res.send({
             status:200,
             message:"success",
             data:result
             
         })
     }
     else if(result.length<0){
        res.send({
            status:400,
            message:"No data found",
            data:[]
        })
     }
   
 })
 }
 const carmake=(req,res)=>{
    var qry="SELECT * FROM car_make;"
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
const cartype=(req,res)=>{
    var qry="SELECT * FROM car_type"
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
const car_modal=(req,res)=>{
    var qry="SELECT * FROM car_model"
connection.query(qry,function(err,result){
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
const transmissionType=(req,res)=>{
    var qry="SELECT * FROM transmission_type"
connection.query(qry,function(err,result){
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
const fuelType=(req,res)=>{
    var qry="SELECT * FROM fuel_type"
connection.query(qry,function(err,result){
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
const Getallbookingdetails=(req,res)=>{
    var qry="SELECT * FROM car_booking"
connection.query(qry,function(err,result){
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
const Savecontactdetails=(req,res)=>{
    var qry="INSERT INTO `contact_form` (`first_name`, `last_name`, `email`, `phone`, `message`) VALUES (?,?,?,?,?)"
connection.query(qry,[req.body.first_name,req.body.last_name,req.body.email,req.body.phone,req.body.message],function(err,result){
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
            message:"conatct saved successfully",
            data:result
        })
    }
})
}
module.exports={
    getcarstypes,getcarsbytypes,getcarbyid,getallcars,get_carsbytype,carsdetailbyid,getcars_similartype,
     filtertype,carmake,cartype,car_modal,transmissionType,fuelType,Getallbookingdetails,Savecontactdetails
}