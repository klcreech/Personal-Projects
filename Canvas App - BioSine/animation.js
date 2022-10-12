var Animation = function(canvasId) {
	this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.t = 0;
	this.timeInterval = 0;
	this.startTime = 0;
	this.lastTime = 0;
	this.frame = 0;
	this.animating = false;

		// provided by Paul Irish - but I really dont give a fuck..KC
		window.requestAnimFrame = (function(calback) {
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		}) ();
};

Animation.prototype.getContext = function(){
	return this.context;
};

Animation.prototype.getCanvas = function(){
	return this.canvas;
};

Animation.prototype.clear = function(){
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Animation.prototype.setStage = function(func) {
	this.stage = func;
};

Animation.prototype.isAnimating = function() {
	return this.animating;
};

Animation.prototype.getFrame = function() {
	return this.frame;
};

Animation.prototype.start = function() {
	this.animating = true;
	var date = new Date();
	this.startTime = date.getTime();
	this.lastTime = this.startTime;

		if (this.stage !== undefined) {
           this.stage();
           }
	this.animationLoop()
};

Animation.prototype.stop = function() {
	 this.animating = false;
};

Animation.prototype.getTimeInterval = function() {
	return this.timeInterval;
};

Animation.prototype.getTime = function() {
	return this.t;
};

Animation.prototype.animationLoop = function() {
	var that = this;

	this.frame++;
	var date = new Date();
	var thisTime = date.getTime();
	this.timeInterval = thisTime - this.lastTime;
    this.t += this.timeInterval;
	this.lastTime = thisTime;

		if (this.stage !== undefined) {
			this.stage();
		}

		if (this.animating) {
			requestAnimFrame(function(){
			   that.animationLoop();
			});
	}
};

	