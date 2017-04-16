'use strict';
var util = require('util');

module.exports = {
  aqua_light_list: getAquaLightList,
  aqua_light_get: getAquaLight,
  aqua_light_put: setAquaLight,
  aqua_cam: cam,
  aqua_cam_put: setAquaCam
};

function getAquaLightList(req, res) {
  console.log('====getAquaLightList====');
  res.json({
       "aqualights": [
         {
           "id" : "0",
           "status" : "off",
           "description" : "0번등"
         },
         {
           "id" : "1",
           "status" : "off",
           "description" : "1번등"
         }
         ]
  });
}

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
  var operation = req.body.operation;
  console.log('====setAquaLight:operation===='+ operation);
  res.json({
       "operationresult" : operation
  });
}
function setAquaCam(req, res) {
  var operation = req.body.operation;
  console.log('====setAquaCam:operation===='+ operation);
  res.json({
       "operationresult" : operation
  });
}

function cam(req, res) {
  res.json({
       "onoffstatus" : "cam off"
  });
}
