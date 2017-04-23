var Gpio = require('onoff').Gpio;
var gpioArr = new Array();
gpioArr[0] = new Gpio(18, 'out'); // power
gpioArr[1] = new Gpio(21, 'out'); // LED 
var request = require('request');
var exec = require('child_process').exec;

module.exports = function (name) {
  return {
    getAquaLightModule: function(lightId) {
      console.log('====getAquaLightModule====' + lightId);
      var led_state = gpioArr[lightId].readSync() == 0 ? "off" : "on"; 
      var aqualights = {
        "id" : lightId,
        "status" : led_state,
        "description" : lightId + "번등"
      }
      return aqualights;
    },
    getAquaLightListModule: function() {
      console.log('====getAquaLightListModule====');
      var led_state = new Array();
      led_state[0] = (gpioArr[0].readSync() == 0) ? 'off' : 'on';
      led_state[1] = (gpioArr[1].readSync() == 0) ? 'off' : 'on';
      var aquaLightList = {
           "aqualights": [
             {
               "id" : "0",
               "status" : led_state[0],
               "description" : "~~~~~~0번등~~~~~~~~~~"
             },
             {
               "id" : "1",
               "status" : led_state[1],
               "description" : "~~~~~~~1번등~~~~~~~~"
             }
             ]
      };
      return aquaLightList;
    },
    setAquaCamModule: function(id, oper) {
      console.log('====setAquaCamModule====' + id + oper);
      var cmd = '';
      if(oper == 'on') {
        cmd = './mjpg.sh';
      } else {
        cmd = './mjpgstop.sh';
      }
      exec(cmd, function (error, stdout, stderr) {
         console.log(stdout);
      });
      var operationResult = {
        "deviceId":id,
        "deviceStatus":oper,
        "operationresult" : "success"
      }
      return operationResult;      
    },
    setAquaLightModule: function(lightId, lightOperation) {
      console.log('====setAquaLightListModule====' + lightId + lightOperation);
      led_state = (lightOperation == 'on') ? 1 : 0;
      gpioArr[lightId].writeSync(led_state); 
      var operationResult = {
        "deviceId":lightId,
        "deviceStatus":lightOperation,
        "operationresult" : "success"
      }
      return operationResult;
    },
    getCamImageStreamModule: function(action, req, res)  {
      console.log('====getCamImageStreamModule action ====' + action);
      var req_options = {
        url: 'http://192.168.0.21:8080/?action='+action
      };
      var req_pipe = request(req_options);
      req_pipe.pipe(res);
      req_pipe.on('error', function(e){
         console.log(e)
      });
      //client quit normally
      req.on('end', function(){
        console.log('end');
        req_pipe.abort();
      });
      //client quit unexpectedly
      req.on('close', function(){
         console.log('close');
         req_pipe.abort()
      });
      //var res = {
      //     "action" : action
      //};
      //return res;
    }
  }
}

