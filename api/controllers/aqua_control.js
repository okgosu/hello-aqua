'use strict';
var util = require('util');

var rasp_module = require('./rasberry_control.js');
var rasp = rasp_module();

module.exports = {
  aqua_info: getAquaInfo,
  aqua_light_list: getAquaLightList,
  aqua_light_get: getAquaLight,
  aqua_light_post: setAquaLight,
  aqua_cam: cam,
  aqua_cam_post: setAquaCam
};
/*
  Simple test api. This returns Aqua API information.
  Param 1: a handle to the request object
  Param 2: a handle to the response object
*/
function getAquaInfo(req, res) {
  var name = req.swagger.params.name.value;
  var msg = 'Hi, '+ name + ':) This is okgosu\'s Aqua APIs'
  res.json(msg);
}
/*
  This returns light device list with on/off status.
  Param 1: a handle to the request object
  Param 2: a handle to the response object
*/
function getAquaLightList(req, res) {
  console.log('====getAquaLightList module====');
  res.json(rasp.getAquaLightListModule());
}

var mockAquaLightList = {
     "aqualights": [
       {
         "id" : "0",
         "status" : "off",
         "description" : "~~~~~~0번등~~~~~~~~~~"
       },
       {
         "id" : "1",
         "status" : "off",
         "description" : "~~~~~~~1번등~~~~~~~~"
       }
       ]
};

function getAquaLight(req, res) {
  var id = req.swagger.params.id.value;
  console.log('====getAquaLight====' + id);
  res.json(
    {
      "id" : id,
      "status" : "off",
      "description" : id + "번등"
    }
  );
}
function setAquaLight(req, res) {
  var deviceId = req.body.id;
  var deviceOperation = req.body.operation;
  //res.json(mockOperationResult);
  res.json(rasp.setAquaLightModule(deviceId, deviceOperation));
}

function setAquaCam(req, res) {
  var deviceId = req.body.id;
  var deviceOperation = req.body.operation;
  console.log('====setAquaCam:operation===='+ deviceOperation);
  res.json(mockOperationResult);
}

var mockOperationResult = {
    "deviceId":"0",
    "deviceStatus":"on",
    "operationresult" : "success"
}

function cam(req, res) {
  res.json({
       "onoffstatus" : "cam off"
  });
}
