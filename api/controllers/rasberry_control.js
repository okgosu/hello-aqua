var Gpio = require('onoff').Gpio;
var gpioArr = new Array();
gpioArr[0] = new Gpio(18, 'out'); // power
gpioArr[1] = new Gpio(21, 'out'); // LED

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
    }
  }
}
