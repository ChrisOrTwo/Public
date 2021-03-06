(function (global) {
	if (!global.rule) {
		global.rule = {};
	}

	//Implement function that will work like a new operator;
	global.rule.createClassInstance = function (ClassFunction) {

		var obj = Object.create(ClassFunction.prototype);
		var args = Array.prototype.slice.call(arguments,1);
		var instance = ClassFunction.apply(obj,args);
		if(instance && typeof instance === 'object')
			return instance;
		return obj;
	};


	//Example usage:
	/*
	var inst = global.rule.createClassInstance(MyClass, arg1, arg2, arg3);
	*/

}(window));
