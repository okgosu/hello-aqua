// non rasberry_control

module.exports = function (name) {
  return {
    getAquaLightModule: function(lightId) {
      console.log('====getAquaLightModule====' + lightId);
      var aqualights = {
        "id" : lightId,
        "status" : "off",
        "description" : lightId + "번등 test"
      }
      return aqualights;
    },
    getAquaLightListModule: function() {
      console.log('====getAquaLightListModule====');
      var aquaLightList = {
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
      return aquaLightList;
    },
    setAquaLightModule: function(lightId, lightOperation) {
      console.log('====setAquaLightListModule====' + lightId + lightOperation);
      var operationResult = {
        "deviceId":lightId,
        "deviceStatus":lightOperation,
        "operationresult" : "success"
      }
      return operationResult;
    },
    getCamImageStreamModule: function(action) {
      console.log('====getCamImageStreamModule action ====' + action);
      var res = {
           "action" : action
      };
      return res;
    }
  }
}
