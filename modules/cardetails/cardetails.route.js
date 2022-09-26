const express = require('express');
const router = express.Router();
const carcontroller=require('./cardetails.controller')

router.get('/get_cars_types',carcontroller.getcarstypes);
router.post('/get_cars_by_types',carcontroller.getcarsbytypes);
router.post('/get_car_by_id',carcontroller.getcarbyid);
router.post('/usedornewfiltertype',carcontroller.filtertype);
router.post('/getallcars',carcontroller.getallcars);
router.post('/get_carsbytype',carcontroller.get_carsbytype);

module.exports = router;