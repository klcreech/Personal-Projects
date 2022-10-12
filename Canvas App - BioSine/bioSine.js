//BioSine App  - Copyright 2020 Kerry Creech

//input form area with Jquery

//get canvasBox div
var mainDiv =  document.getElementById("CanvasBox");
// create Name input
var bsInput_bday = document.createElement ("input"); 

	bsInput_bday.id = "dpicker";	
	bsInput_bday.type = "text";
     	bsInput_bday.style.position ="absolute";
        bsInput_bday.style.top = "55px";		
	bsInput_bday.style.left = "150px";
        bsInput_bday.style.height = "15px"; 	
        bsInput_bday.style.width = "120px"; 
	bsInput_bday.style.fontSize = "12px";	
	bsInput_bday.style.color = "#fff";	
	bsInput_bday.style.border = "1px solid white";
	bsInput_bday.style.backgroundColor= "#40acff";
	bsInput_bday.style.opacity= ".75";
     	bsInput_bday.placeholder=" mm / dd / yyyy";		
	
		var bsInput_name_append = mainDiv.appendChild(bsInput_bday);	
		
		//jquery event setup for input box
      $(document).ready(function() {$("#dpicker").datepicker(); $("#dpicker").change(function() {			 
		  $("#dpicker").select();
		  $("#dpicker").blur();});});

// Canvas Graph Setup

 //Defne the constructor for the Graph class 
function Graph(config){
	// user defined properties
	this.canvas = document.getElementById(config.canvasId);
	this.minX = config.minX;
	this.minY = config.minY;
	this.maxX = config.maxX;
	this.maxY = config.maxY;
	this.unitsPerTick = config.unitsPerTick;
	this.waveBoxWidth = config.waveBoxWidth;
	this.waveBoxHeight = config.waveBoxHeight;

	// constants
	this.axisColor = "#fff";
	this.font = "8pt Calibri";
	this.tickSize = 10;
	this.canvas.style.background = "#40acff";

	// relationships
	this.context = this.canvas.getContext("2d");
	this.rangeX = this.maxX - this.minX ;
	this.rangeY = this.maxY - this.minY ;
	this.unitX = this.waveBoxWidth  / this.rangeX;
	this.unitY = this.waveBoxHeight / this.rangeY;
	this.centerY = Math.round(Math.abs(this.minY / this.rangeY ) *
	this.waveBoxHeight) ;
	this.centerX = Math.round(Math.abs(this.minX / this.rangeX) *
	this.waveBoxWidth);
	this.iteration = (this.maxX - this.minX) / 1000;
	this.scaleX = this.waveBoxWidth / this.rangeX ;
	this.scaleY = this.waveBoxHeight / this.rangeY ;

	// draw logo and label
	this.BioSineLogo();
	this.SelectBdayLabel();
}

// DatePicker EventListeners
var RangeNum = document.getElementById('dpicker');

RangeNum.addEventListener("select", RangeYear , false);

function RangeYear(){
	if (RangeNum.value) {
	FullDate = new Date(RangeNum.value);
	var curYear = FullDate.getFullYear();
	return curYear;}}

RangeNum.addEventListener("select", RangeMonth , false);

function RangeMonth(){
	if (RangeNum.value) {
	FullDate = new Date(RangeNum.value);
	var curMonth= FullDate.getMonth();
	return curMonth;}}

RangeNum.addEventListener("select", RangeDay , false);

function RangeDay(){
	if (RangeNum.value) {
	FullDate = new Date(RangeNum.value);
	var curDay= FullDate.getDay();
	return curDay;}}

// bday entry function
var  BdayConvert = function  (bDayYear, bDayMonth, bDayDay) {
	var bDay = new Date(bDayYear, bDayMonth - 1, bDayDay, 0, 0, 0);
	var toDay = new Date();
	var bDayMilliValue = bDay.valueOf(); 
	var toDayMilliValue = toDay.valueOf();
	var seconds = (toDayMilliValue - bDayMilliValue) / 1000;
	var minutes = seconds / 60;
	var hours =  minutes / 60;
	var days = hours / 24;
	var years = Math.floor(days / 365);
		return Math.floor(days);
};

RangeNum.addEventListener("select", GraphWave , false);

function GraphWave(){

if (RangeNum.value) {
	//this is where the birth day is entered***********************
	dayRange = BdayConvert(RangeYear(), RangeMonth(), RangeDay());

	//Defne the drawEquation() method which takes in a function f(x) and then draws
	//the equation by looping through incremental values of x from minX to maxX:
	Graph.prototype.drawEquation = function(equation, color, thickness){
		var context = this.context;
		context.save();
		this.transformContext();
		context.beginPath();
		context.moveTo(dayRange, equation(dayRange));
			for (var x = dayRange + this.iteration; x <= (dayRange + this.maxX - 1.2); x +=
			this.iteration) {
				context.lineTo(x , equation(x));
				}
		context.restore();
		context.lineJoin = "round";
		context.lineWidth = thickness;
		context.strokeStyle = color;
		context.stroke();
		context.restore();
	};

	//Defne the transformContext() method which translates the context to the center
	//of the graph, stretches the graph to ft the canvas, and then inverts the y axis:
	Graph.prototype.transformContext = function(){
		var context = this.context;
		// move context to center of canvas
		var alignEquation = (this.centerX ) + ((this.unitsPerTick * this.unitX) * (dayRange * .10  ))
		this.context.translate((this.centerX - alignEquation + 10.5) , this.centerY * 5.71);
		/*
		* stretch grid to fit the canvas window, and
		* invert the y scale so that increments
		* as you move upwards
		*/
		context.scale(this.scaleX  , -this.scaleY);
	};
GraphWave()
}}


// Draw BioSine logo and header
Graph.prototype.BioSineLogo = function(){
	var context = this.context;
	var imageObj = new Image();
	imageObj.onload = function(){
		var destX = 12;
		var destY = 5;
		context.drawImage(this, destX, destY);
		};
	imageObj.src = "Logo.png";
	context.font = "7pt Century Gothic";
	context.fillStyle = "white";
	context.fillText("Copyright 2020 Syn", 175, 35);
	context.font = "7pt Century Gothic";
	context.fillStyle = "rgba(70, 241, 39, 1)";
	context.fillText("Apps",  260, 35);
	context.beginPath;
	context.moveTo(15,42);
	context.lineTo(285, 42);
	context.strokeStyle = "rgba(255, 255, 255, 1)";
	context.stroke();}

// Draw Bday Input Label
Graph.prototype.SelectBdayLabel = function(){
	var context = this.context;
	context.save();
	context.font = "12pt Century Gothic";
	context.fillStyle = "white";
	context.fillText("Select Birthday:",  20, 68);
	context.restore();}

//When the page loads, instantiate a new Graph object, and then draw three sine equations
//using the drawEquation() method:
window.onload = function(){

var anim = new Animation("myCanvas");
var canvas = anim.getCanvas();
var context = anim.getContext();
var linearSpeed = 10; // pixels / second
	
var myGraph = new Graph({
canvasId: "myCanvas",
minX: -1,
minY: -1.2,
maxX: 31,
maxY: 1.2,
unitsPerTick: 10,
YunitsPerTick: 1,
waveBoxWidth: 300,
waveBoxHeight:140
});

// Add Event Listeners	
var datepicker = document.getElementById('dpicker');
datepicker.addEventListener("select", DateConv , false);

function DateConv () { 
//Cover old Date 
context.textAlign = "center";
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 10, 78, 280, 30);

// Draw result date once it is selected**************
FullDate = new Date(datepicker.value);
var months = ["Janurary","February","March","April","May","June","July","August","September","October","November","December"];
var curMonth= months[FullDate.getMonth()];
var curDay= FullDate.getDate();
var curYear= FullDate.getFullYear();
 context.font = "18pt Century Gothic";
context.fillStyle = "rgba(255, 255, 255, 1)";
context.fillText(curMonth + " " + curDay + "," + " " + curYear,  150, 100) ;

//MeterBox Object
var Meterbox = {
phyX: 120,
phyY: 161,
intX: 120,
intY: 201,
emoX: 120,
emoY: 241,
width: 3,
height: 9
};

// PhyMeter Box Reset Cover
context.fillStyle = "rgba(60, 160, 238, 1)";
context.fillRect( 120, 161, 70, 9);

// IntMeter Box Reset Cover
context.fillStyle = "rgba(60, 160, 238, 1)";
context.fillRect( 120, 201, 70, 9);

// EmoMeter Box Reset Cover
context.fillStyle = "rgba(60, 160, 238, 1)";
context.fillRect( 120, 241, 70, 9);

// Clear Phy Meter Data Num
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 193, 158, 40, 15);

// Clear Phy Meter Desc
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 120, 173, 70, 13);

// Clear Int Meter Data Num
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 193, 198, 40, 15);

// Clear Int Meter Desc
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 120, 213, 70, 13);

// Clear Emo Meter Data Num
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 193, 238, 40, 15);

// Clear Emo Meter Desc
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 120, 253, 70, 13);

// Clear Faces
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 240, 143, 36, 125);

//Clear Wave Box
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 10, 330, 280, 140);


// once date and meterbox has appeared set stage for all animations
anim.setStage(function(){

// Draw Meter Frame Title
context.save;
context.beginPath();
context.font = "13pt Century Gothic";
context.fillStyle =  "rgba(255, 255, 255, .01)";
context.fillText("Todays Biorythmic Cycles",  150, 130);
context.restore;

// Draw BioCycle Meter Box Frame
context.beginPath();
context.moveTo(10, 160);
context.lineTo(10, 260);
context.moveTo(10, 160);
context.arc(20, 150, 10, 3.15,-1.6, 0);
context.moveTo(20, 140);
context.lineTo(280, 140);
context.moveTo(290, 155);
context.arc(280, 150, 10, -.15, -1.6, 1);
context.moveTo(290, 155);
context.lineTo(290, 260);
context.moveTo(290, 260);
context.arc(280, 260, 10, .15, 1.6, 0);
context.moveTo(280, 270);
context.lineTo(20, 270);
context.moveTo(10, 260);
context.arc(20, 260, 10, -3.15, 1.6, 1);

// set the line width and stroke color
context.lineWidth = 1;
context.strokeStyle= "rgba(255, 255, 255, .01)";
context.stroke();

//Labels
context.beginPath();
context.font = "11pt Century Gothic";
context.fillStyle ="rgba(255, 255, 255, .01)";
context.fillText("Physical:",  83, 170);
context.fillText("Intellectual:",  70, 210);
context.fillText("Emotional:",  75, 250);

// Meters
context.beginPath();
context.rect(120, 160.5, 70, 10); //physical
context.rect(120, 200.5, 70, 10); //intellegence
context.rect(120, 240.5, 70, 10); // emotional
context.stroke();

//Physical Data Number

var PhySineRange =  BdayConvert(RangeYear(),RangeMonth(),RangeDay());
var PhySine = Math.sin(2*Math.PI * PhySineRange / 23)
context.beginPath();
context.font = "11pt Century Gothic";
context.fillStyle =   "rgba(221, 251, 251, .0289)";
context.fillText(PhySine.toFixed(2),  215, 170);
context.font = "7pt Century Gothic";
context.fillStyle =  "rgba(221, 251, 251, .0289)";

//Phy Meter Descriptions
PhySine === 0 ? context.fillText("Neutral",  155, 182) : 
// Good Desc
(PhySine > 0 && PhySine < 0.1)  ? context.fillText("Fit",  155, 182) : (PhySine > 0.1 && PhySine < 0.3) ? context.fillText("Motivated!",  155, 182) : (PhySine > 0.3 && PhySine < 0.6) ? context.fillText("Energized!",  155, 182) : (PhySine > 0.6 && PhySine < 0.9) ? 
context.fillText("Strong!",  155, 182) : (PhySine > 0.9 && PhySine <= 1) ? context.fillText("Herculean!",  155, 182) :
// Bad Desc
(PhySine > -0.1 && PhySine < 0) ? context.fillText("Tired",  155, 182) : (PhySine > -0.3 && PhySine < -0.1) ? context.fillText("Lazy",  155, 182) : (PhySine > -0.6 && PhySine < -0.3) ? context.fillText("Sluggish",  155, 182) : (PhySine > -0.9 && PhySine < -0.6) ? context.fillText("Aching",  155, 182) : (PhySine => -1 && PhySine < -0.9) ? context.fillText(" Sloth",  155, 182) :"";


//Intelligence Data Number
var IntSineRange =  BdayConvert(RangeYear(),RangeMonth(),RangeDay());
var IntSine = Math.sin(2*Math.PI * IntSineRange / 33)
context.font = "11pt Century Gothic";
context.fillStyle =  "rgba(221, 251, 251, .0289)";
context.fillText(IntSine.toFixed(2),  215, 210);
context.font = "7pt Century Gothic";
context.fillStyle =  "rgba(221, 251, 251, .0289)";

//Int Meter Descriptions

(IntSine === 0) ? context.fillText("Neutral",  155, 222) : 
// Good Desc
(IntSine > 0 && IntSine < 0.1) ? context.fillText("I think I can.",  155, 222) : (IntSine > 0.1 && IntSine < 0.3) ? context.fillText("Contemplation",  155, 222) : (IntSine > 0.3 && IntSine < 0.6) ? context.fillText("Intuitive",  155, 222) : (IntSine > 0.6 && IntSine < 0.9) 
? context.fillText("Creative",  155, 222) : (IntSine > 0.9 && IntSine <= 1) ? context.fillText("E=Mc2",  155, 222) :
// Bad Desc
(IntSine > -0.1 && IntSine < 0) ? context.fillText("Bored",  155, 222) : (IntSine > -0.3 && IntSine < -0.1) ? context.fillText("Blank",  155, 222) :
(IntSine > -0.6 && IntSine < -0.3) ? context.fillText("1+1=3",  155, 222) : (IntSine > -0.9 && IntSine < -0.6) ? context.fillText("Alzheimers",  155, 222) : (IntSine => -1 && IntSine < -0.9) ? context.fillText("Me find brain.",  155, 222) : "";


//Emotional Data Number
var EmoSineRange =  BdayConvert(RangeYear(),RangeMonth(),RangeDay());
var EmoSine = Math.sin(2*Math.PI * EmoSineRange / 28)
context.beginPath();
context.font = "11pt Century Gothic";
context.fillStyle =   "rgba(221, 251, 251, .0289)";
context.fillText(EmoSine.toFixed(2),  215, 250);
context.font = "7pt Century Gothic";
context.fillStyle =  "rgba(221, 251, 251, .0289)";

//Emo Meter Descriptions
(EmoSine === 0)  ? context.fillText("Neutral",  155, 262) :
// Good Desc
(EmoSine > 0 && EmoSine < 0.1) ? context.fillText("O.k.",  155, 262) : (EmoSine > 0.1 && EmoSine < 0.3) ? context.fillText("Alright",  155, 262) :  (EmoSine > 0.3 && EmoSine < 0.6) ? context.fillText("Great!",  155, 262) : (EmoSine > 0.6 && EmoSine < 0.9) ? context.fillText("Awesome!",  155, 262) : (EmoSine > 0.9 && EmoSine <= 1) ? context.fillText("Ectasy!",  155, 262) :
// Bad Desc
(EmoSine > -0.1 && EmoSine < 0) ? context.fillText("So So.",  155, 262) : (EmoSine > -0.3 && EmoSine < -0.1) ? context.fillText("Down...",  155, 262) : (EmoSine > -0.6 && EmoSine < -0.3) ? context.fillText("Annoyed!",  155, 262) : (EmoSine > -0.9 && EmoSine < -0.6) ? context.fillText("Frustrated!",  155, 262) : (EmoSine => -1 && EmoSine < -0.9) ? context.fillText("Arrrggghh!",  155, 262) : "";


// update Meter data bar fill
var linearDistEachFrame = linearSpeed * this.getTimeInterval() / 1000;

Meterbox.phyX < ( (66  * Math.abs(PhySine) ) + 120) ? Meterbox.phyX += linearDistEachFrame : "";
Meterbox.intX < ( (66  * Math.abs(IntSine) ) + 120) ? Meterbox.intX += linearDistEachFrame : "";
Meterbox.emoX < ( (66  * Math.abs(EmoSine) ) + 120) ? Meterbox.emoX += linearDistEachFrame : "";

// draw Physical Meter data
context.beginPath();
PhySine < 0 ? context.fillStyle = "rgba(255, 113, 163, 1)" : context.fillStyle = "rgba(70, 241, 39, 1)";
context.fillRect(Meterbox.phyX, Meterbox.phyY, Meterbox.width, Meterbox.height);

// draw intellegence Meter data
IntSine < 0 ? context.fillStyle = "rgba(255, 113, 163, 1)" : context.fillStyle = "rgba(70, 241, 39, 1)";
context.fillRect(Meterbox.intX, Meterbox.intY, Meterbox.width, Meterbox.height);

// draw Emotional Meter data
EmoSine < 0 ? context.fillStyle ="rgba(255, 113, 163, 1)" : context.fillStyle = "rgba(70, 241, 39, 1)";
context.fillRect(Meterbox.emoX, Meterbox.emoY, Meterbox.width, Meterbox.height);	

//Draw Phy Face*******
context.beginPath();
//head
context.moveTo(274, 162);
context.arc(258, 166, 16, 0, 2 * Math.PI, false);

//eyes
context.moveTo(252, 161);
context.arc(252, 161, 1, 0, 2 * Math.PI, false);
context.moveTo(263, 161);
context.arc(263, 161, 1, 0, 2 * Math.PI, false);

//Dynamic mouth..Wish I had a chick with a dynamic mouth
var phyMouthCurve = 0;
phyMouthCurve = ( PhySine * 10);
context.moveTo(247, 171.45);
context.quadraticCurveTo(258, 170 + phyMouthCurve, 268, 171.45);

context.lineWidth = 2;
context.strokeStyle = "rgba(221, 251, 251, .0289)";
context.stroke();

//Draw Int Face*******
context.beginPath();
//head
context.moveTo(274, 201);
context.arc(258, 205, 16, 0, 2 * Math.PI, false);

//eyes
context.moveTo(252, 201);
context.arc(252, 201, 1, 0, 2 * Math.PI, false);
context.moveTo(263, 201);
context.arc(263, 201, 1, 0, 2 * Math.PI, false);

//Dynamic mouth..Wish I had a chick with a dynamic mouth
var intMouthCurve = 0;
intMouthCurve = ( IntSine * 10);
context.moveTo(247, 210.45);
context.quadraticCurveTo(258, 210 + intMouthCurve, 268, 210.45);

context.lineWidth = 2;
context.strokeStyle =  "rgba(221, 251, 251, .0289)";
context.stroke();

//Draw Emo Face*******
context.save;
context.beginPath();

//head
context.moveTo(274, 240);
context.arc(258, 245, 16, 0, 2 * Math.PI, false);

//eyes
context.moveTo(252, 240);
context.arc(252, 240, 1, 0, 2 * Math.PI, false);
context.moveTo(263, 240);
context.arc(263, 240, 1, 0, 2 * Math.PI, false);

//Dynamic mouth..Wish I had a chick with a dynamic mouth
var emoMouthCurve = 0;
emoMouthCurve = ( EmoSine * 10);
context.moveTo(247, 250.45);
context.quadraticCurveTo(258, 250 + emoMouthCurve, 268, 250.45);

context.lineWidth = 2;
context.strokeStyle =  "rgba(221, 251, 251, .0289)";
context.stroke();
context.restore;

// Draw WaveBox 

//Draw Right Border Wall
context.save();
context.beginPath();
context.moveTo(291 , 330);
context.lineTo(291 , 470);
context.strokeStyle = "rgba(255, 255, 255,  .1)";
context.lineWidth = 2;
context.stroke();
context.restore();

// Draw WaveBox Left Border Wall
context.save();
context.beginPath();
context.moveTo(9 , 330);
context.lineTo(9 , 470);
context.strokeStyle = "rgba(255, 255, 255,  .1)";
context.lineWidth = 2;
context.stroke();
context.restore();

//Draw GoodDay Wave Screen
context.save();
context.fillStyle = "rgba(0, 184, 147, .05)";
context.fillRect( 10, 330, 280, 70);
context.font = "9pt Calibri";
context.fillStyle = "rgba(255, 255, 255,  .3)";
context.fillText("Good Day",  40, 392);
context.restore();

//Draw BadDay Wave Screen

context.fillStyle = "rgba(255,113, 163, .05)";
context.fillRect( 10, 400, 280, 69);
context.font = "9pt Calibri";
context.fillStyle =  "rgba(255, 255, 255,  .3)";
context.fillText("Bad Day",  40, 415);

//Draw Wave Box X Axis Line
context.save();
context.beginPath();
context.moveTo(10, 70 * 5.71);
context.lineTo(290, 70 * 5.71);
context.strokeStyle =  "rgba(255, 255, 255,  .3)";
context.lineWidth = 1;
context.stroke();
context.restore();

 // Draw top of wave box
context.save();
context.beginPath();
context.moveTo(7, 70 * 4.71);
context.lineTo(292, 70 * 4.71);
context.strokeStyle = "rgba(255, 255, 255,  .3)";
context.lineWidth = 1;
context.stroke();
context.restore();

 // Draw bottom of wave box
context.beginPath();
context.moveTo(8, 70 * 6.71);
context.lineTo(292, 70 * 6.71);
context.strokeStyle = "rgba(255, 255, 255,  .3)";
context.lineWidth = 1;
context.stroke();

// draw tick marks
context.save();
var xPosIncrement = myGraph.unitsPerTick * myGraph.unitX;
var xPos, unit;
context.font = myGraph.font;
context.fillStyle = "rgba(255, 255, 255,  .3)";
context.textAlign = "center";
context.textBaseline = "top";

// X unit setup
//Ceate Date Unit
// units per tick to milliseconds
var day2hrs = myGraph.unitsPerTick * 24;
var hrs2min = day2hrs * 60;
var min2sec = hrs2min * 60;
var sec2milli = min2sec *1000;

// get milliseconds from current date
var currDate = new Date();
var newmilli = currDate.valueOf();

// create new millisecond date
newmilli += sec2milli; 

// create new date
var newDate = null;
var newDate = new Date(newmilli);
var newYear = newDate.getFullYear();
var newDay = newDate.getDate();
var newMonth = newDate.getMonth() + 1;
var dash = "-";

//assign date to unit and draw tic
xPos = myGraph.centerX + xPosIncrement;
unit = newMonth+=dash+=newDay+=dash+=newYear;
var waveBoxWidth = 300;
while (xPos < waveBoxWidth) {
context.moveTo(xPos, myGraph.centerY * 5.71 - myGraph.tickSize / 2);
context.lineTo(xPos, myGraph.centerY * 5.71 + myGraph.tickSize / 2);
context.stroke();
context.fillText(unit, xPos, myGraph.centerY * 5.71 + myGraph.tickSize / 2 + 3);

//Create Next Date Unit
var newDate = null;
var newDate = new Date(newmilli);
var newYear = newDate.getFullYear();
var newDay = newDate.getDate();
var newMonth = newDate.getMonth() + 1;
var dash = "-";

// create new millisecond date
newmilli += sec2milli; 

// create new date
newDate = new Date(newmilli);
newmilli = newDate.valueOf();
newYear = newDate.getFullYear();
newDay = newDate.getDate(); 
newMonth = newDate.getMonth() + 1;
unit = newMonth+=dash+=newDay+=dash+=newYear;
xPos = Math.round(xPos + xPosIncrement);
}
context.restore();

// Draw Y Axis Tick Marks
 // Draw top tic
context.save();
context.beginPath();
context.moveTo(7, 342);
context.lineTo(15, 342);
context.strokeStyle = "rgba(255, 255, 255,  .1)";
context.lineWidth = 1;
context.stroke();
context.font = myGraph.font;
context.fillStyle = "rgba(255, 255, 255,  .2)";
context.fillText("1",  20, 345);
context.restore();

 // Draw bottom tic
context.save();
context.beginPath();
context.moveTo(7, 460);
context.lineTo(15, 460);
context.strokeStyle = "rgba(255, 255, 255,  .1)";
context.lineWidth = 1;
context.stroke();
context.font = myGraph.font;
context.fillStyle = "rgba(255, 255, 255,  .2)";
context.fillText("  - 1",  20, 463);
context.restore();

//Draw WaveBox Left Screen 
context.save;
context.beginPath();
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 0, 327, 8, 148);
context.restore;

//Draw waveBox Right Screen
context.save();
context.fillStyle = "rgba(64, 172, 255, 1)";
context.fillRect( 292, 327, 8, 149);
context.restore();

// Draw Wave Box Title
context.save;
context.textAlign = "center";
context.font = "11pt Century Gothic";
context.fillStyle = "rgba(255, 255, 255,  .01)";
context.fillText("30 Day Biorythmic Forecast",  150, 308);
context.restore;

// Draw Physicall Legend 
context.fillStyle = "rgba(70, 241, 39, .01)";
context.textAlign = "center";
context.fillRect( 12 ,315, 10, 10);
context.font = "7pt Century Gothic";
context.fillStyle = "rgba(255, 255, 255,  .01)";
context.fillText("Physical Cycle",  58, 324);

// Draw Intelligence Legend 
context.fillStyle = "rgba(233, 196, 32, .01)";
context.fillRect( 99,315, 10, 10);
context.font = "7pt Century Gothic";
context.fillStyle ="rgba(255, 255, 255,  .01)";
context.fillText("Intelligence Cycle",  153, 324);

// Draw Emotional Legend 
context.fillStyle = "rgba(16, 217, 232, .01)";
context.fillRect( 200,315, 10, 10);
context.font = "7pt Century Gothic";
context.fillStyle = "rgba(255, 255, 255,  .01)";
context.fillText("Emotional Cycle",  250, 324);

myGraph.drawEquation(function(x){
return   Math.sin(2*Math.PI * x/ 23)  ;
}, "rgba(70, 241, 39, .9)", 1.5); //Physical
myGraph.drawEquation(function(x){
return   Math.sin(2*Math.PI * x/ 28)  ;
}, "rgba(16, 217, 232, .9)", 1.5); //Emotional
myGraph.drawEquation(function(x){
return   Math.sin(2*Math.PI * x/ 33)  ;
}, "rgba(233, 196, 32, .9)", 1.5); //Intellectual
});
anim.start();
};
};



