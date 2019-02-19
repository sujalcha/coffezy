cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-directions.Directions",
        "file": "plugins/cordova-plugin-directions/www/directions.js",
        "pluginId": "cordova-plugin-directions",
        "clobbers": [
            "directions"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.geolocation",
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "id": "cordova-plugin-geolocation.PositionError",
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "pluginId": "cordova-plugin-geolocation",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-directions": "0.4.4",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-geolocation": "2.4.3"
};
// BOTTOM OF METADATA
});