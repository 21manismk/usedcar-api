const express = require('express');
const router = express.Router();
const carcontroller=require('./cardetails.controller')

router.get('/get_cars_types',carcontroller.getcarstypes);
router.post('/get_cars_by_types',carcontroller.getcarsbytypes);
router.post('/get_car_by_id',carcontroller.getcarbyid);
// router.post('/usedornewfiltertype',carcontroller.filtertype);
router.post('/getallcars',carcontroller.getallcars);
router.post('/get_carsbytype',carcontroller.get_carsbytype);
router.post('/carsdetailbyid',carcontroller.carsdetailbyid);
router.post('/getcars_similartype',carcontroller.getcars_similartype);
router.post('/listingfiltertype',carcontroller.filtertype);

router.post('/carmake',carcontroller.carmake);
router.post('/cartype',carcontroller.cartype);
router.post('/car_modal',carcontroller.car_modal);
router.post('/transmissionType',carcontroller.transmissionType);
router.post('/fuelType',carcontroller.fuelType);
module.exports = router;