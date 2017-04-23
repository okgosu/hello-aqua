'use strict';
var util = require('util');

var rasp_module = require('./rasberry_control.js');
var rasp = rasp_module();

var request = require('request');

module.exports = {
  aqua_info: getAquaInfo,
  aqua_light_list: getAquaLightList,
  aqua_light_get: getAquaLight,
  aqua_light_post: setAquaLight,
  aqua_cam: cam,
  aqua_cam_post: setAquaCam,
  aqua_cam_image: getCamImage,
  aqua_cam_stream: getCamStream
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
//  res.json(mockAquaLightList);
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
  res.json(rasp.getAquaLightModule(id));
  //  res.json(mockAquaLightResult);
}

var mockAquaLightResult = {
    "id":"0",
    "status":"on",
    "description" : "0번등"
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
//  res.json(mockOperationResult);
  res.json(rasp.setAquaCamModule(deviceId, deviceOperation));
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
function getCamImage(req, res) {
  console.log('getCamImage');
  rasp.getCamImageStreamModule('snapshot', req, res);
}

function getCamStream(req, res) {
  console.log('=======getCamStream=====');
  rasp.getCamImageStreamModule('stream', req, res);
}
