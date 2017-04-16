module.exports = function (name) {
  return {
    getAquaLightListModule: function() {
      console.log('====getAquaLightListModule====');
      return null;
    },
    setAquaLightModule: function(lightId, lightOperation) {
      console.log('====setAquaLightListModule====' + lightId + lightOperation);
      var operationResult = {
        "deviceId":lightId,
        "deviceStatus":lightOperation,
        "operationresult" : "success"
      }
      return operationResult;
    }
  }
}
