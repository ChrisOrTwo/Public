(function (global) {
	var EE;

	if (!global.rule) {
		global.rule = {};
	}

	EE = function () {
		//store the listeners somewhere
		this.listeners = {};
	};

	EE.prototype.on = function (eventName, listener, context) 
	{
		if(!this.listeners[eventName])
			this.listeners[eventName] = [];

		this.listeners[eventName].push(listener.bind(context));

		var id = this.listeners[eventName].length-1;

		return function()
		{
			delete this.listeners[eventName][id];
		}.bind(this);
	};

	EE.prototype.emit = function (eventName, data) 
	{
		var args =  Array.prototype.slice.call(arguments,1);

		for(var i=0; i<this.listeners[eventName].length; i++)
		{
			if(this.listeners[eventName][i])
				this.listeners[eventName][i].apply(this,args);
		}
	};

	
//	var ee = new EE();
//  var customCtx = { key: value }
//
//	var removeListener = ee.on('test', function (arg1, arg2) {
//		console.log(arg1, arg2); //1, 2
//		console.log(this.key); //value
//	}, customCtx);
//
//	ee.emit('test', [1, 2]);
//
//	removeListener(); //removes my listener from the event emitter;
//
//	ee.emit('test'); //nothing will execute

	global.rule.EventEmitter = EE;

}(window));
