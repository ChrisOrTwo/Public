var http = require('http');
var uwp = require('uwp');
uwp.projectNamespace('Windows');
var calendar = new Windows.Globalization.Calendar();
var gpioController = Windows.Devices.Gpio.GpioController.getDefault();

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	var pin = gpioController.openPin(5);
	var value = pin.read();
    pin.close();
	res.end('Hello World from NODE wrapped with Universal App!\n' + String(calendar.getDateTime()) + '\npin 5 value:' + value);
}).listen(3333);