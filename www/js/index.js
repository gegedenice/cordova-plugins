var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
     //Globalization
     document.getElementById("getLocaleName").addEventListener("click", getLocaleName);
function getLocaleName() {
   navigator.globalization.getLocaleName(onSuccess, onError);

   function onSuccess(locale) {
    $('#editLocaleName').append('<p>LocaleName is : '+ locale.value+ '</p>');
      //alert('locale: ' + locale.value);
   }

   function onError(){
      alert('Error getting locale');
   }
} 
    //camera
document.getElementById("getCamera").addEventListener("click", getCamera);
function getCamera() {
navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 50,
    sourceType: Camera.PictureSourceType.CAMERA});
function cameraSuccess(imageData) {
    var image = document.getElementById('editImage');
    image.src = "data:image/jpeg;base64," + imageData;

}

function cameraError(message) {
    alert('Failed because: ' + message);
}
} 
//barcode
document.getElementById("getBarcode").addEventListener("click", getBarcode);
function getBarcode() {
 cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
} 
//ezArVideoOverlay
document.getElementById("getEzArVideoOverlay").addEventListener("click", getEzArVideoOverlay);
function getEzArVideoOverlay() {
if (window.ezar) {
            ezar.initializeVideoOverlay(
                function() {
                ezar.getBackCamera().start();
                },
                function(err) {
                alert('unable to init ezar: ' + err);
            });
        } else {
            alert('Unable to detect the ezAR plugin');
        }

} 
//compassOrientation
document.getElementById("getCompassOrientation").addEventListener("click", getCompassOrientation);
function getCompassOrientation() {
/*window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;

  // Faites quelque chose avec les données acquises. ;)
  $('#heading').append('<p>LocaleName is : '+ alpha+ '</p>');
}*/
//function onSuccess(heading) {alert (' intitul' + heading.magneticHeading);} ;

//function onError(error) {alert ('CompassError: ' + error.code);} ;
var onSuccess = function(heading) {alert (' intitul' + heading.magneticHeading);} ;
function onError(error) {alert ('CompassError: ' + error.code);} ;
navigator.compass.getCurrentHeading (onSuccess, onError) ;
}  

  document.getElementById("getGeolocation").addEventListener("click", getGeolocation);
function getGeolocation() {
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}               
    }

};

app.initialize();
