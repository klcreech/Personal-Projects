// SynApps Copyright 2020 Kerry Creech 

"use strict";

window.addEventListener("load", clickevent("wwd"), false);

var wwdclick = document.getElementById('wwd');
var opclick = document.getElementById('op');
var raqclick = document.getElementById('raq');

// Add Event Listeners		
wwdclick.addEventListener("click", navAs1, false);
opclick.addEventListener("click", navAs2, false);
raqclick.addEventListener("click", navAs3, false) ;

// Biosine link Event Listener

var bioSineLink = document.getElementById('bioSineLink');
bioSineLink.addEventListener("click", WinOpen , false);

function WinOpen() {
var openWin = window.open("Canvas/bioSine.html", "BioSine", "toolbar=no, menubar=no, location=no, scrollbars=no, resizable=no, width=330, height=500");

openWin.focus();
}

// nav variable assignment functions

function navAs1 () { var nav = "wwd"; clickevent(nav) }
function navAs2 () { var nav = "op"; clickevent(nav) } 
function navAs3 () {var nav = "raq"; clickevent(nav) }
 														   
function clickevent(nav) {

	var wwdimg = "images/wwdph.png"				   
	var opimg = "images/opcyc.png"
	var csstransition = " transition: opacity .8s ease-in;  "

	var reqform = "<form method='post' action='http://localhost/demo.php'><label for='myName'>*Name:</label><input type='text' name='myName' id='myName' required='required' placeholder='  your first and last name'> <label for='compnayName'>*Company:</label> <input type='text' name='companyName' id='companyName' required='required' placeholder=' your company name'><label for='myEmail'>*E-mail:</label> <input type='email' name='myEmail' id='myEmail' required='required' placeholder='  you@yourdomain.com'> <input id='mySubmit' type='submit' value='Submit'></form>"

	var raqquote = "<span class='wwdtit'>Request a Quote</span><br><br>Required fields marked with an asterisk *"

	var wwdquote = "<span class='wwdtit'>What We Do</span><br><br>Syn<span class='wwdlog'>Apps </span>is a <span class='wwdquo'>Web Development Consulting Firm</span> that specializes in <span class='wwdquo'>Web Application Development</span>. Lorem ipsum sit amet, consecutur adilphoin interdum nunc dictum rutrum scelerisque erat a parturient condimentum potenti dapibus vestibulum condimentum per tristique porta."

	var opquote = "<span class='wwdtit'>Our Process</span><br><br>Syn<span class='wwdlog'>Apps </span>uses the <span class='wwdquo'>Solid Cycle Concept</span> when constructing lasting web applications. Through this process we are able to identify <span class='wwdquo'>P</span>roblems, <span class='wwdquo'>S</span>trengths,and <span class='wwdquo'>T</span>enants '<span class='wwdquo'>PST</span>s' and use those to have the product work as you intend it to."
   
	// nav check
	var chknav = "chk_" + nav;	

    // append to main and create and append left and right main conatins
	var chk_wwd = document.getElementById('wwd_main_contain');
	var chk_wwd_left = document.getElementById('wwd_main_left');
	var chk_wwd_right = document.getElementById('wwd_main_right');
    var chk_op = document.getElementById('op_main_contain');        
    var chk_op_left = document.getElementById('op_main_left');
	var chk_op_right = document.getElementById('op_main_right');
    var chk_raq = document.getElementById('raq_main_contain');        
	var chk_raq_left = document.getElementById('raq_main_left');
    var chk_raq_right = document.getElementById('raq_main_right');
	var mainEl =  document.getElementsByTagName("main") [0]; 

	// if previous link main_contain  and children are present then remove

	chknav === "chk_wwd" &&  chk_op != null ? mainEl.removeChild(chk_op) : chknav === "chk_wwd" &&  chk_raq != null ? mainEl.removeChild(chk_raq) : "";
    chknav === "chk_op" && chk_wwd  != null ? mainEl.removeChild(chk_wwd) : chknav === "chk_op" &&  chk_raq != null ? mainEl.removeChild(chk_raq) : "";
    chknav === "chk_raq" && chk_wwd  != null ? mainEl.removeChild(chk_wwd) : chknav === "chk_raq" &&  chk_op != null ? mainEl.removeChild(chk_op) : ""; 

	// check to see if main_contain exists if so do not recreate
	var chkcontain = nav + "_main_contain";

	if (!document.getElementById(chkcontain)) {

		// create main_contain div and assign id
		var syn_main_contain = document.createElement ("div"); syn_main_contain.id = nav + "_main_contain";
   	
		// append main contain
		var main_append = chknav ? mainEl.appendChild(syn_main_contain) : ""     
		      
		//create main left contain
		var main_left = document.createElement ("div"); main_left.id = nav + "_main_left";                    

		// append main left contain
		syn_main_contain.appendChild(main_left); 
              
		// create main right contain                   
		var main_right = document.createElement ("div");	main_right.id = nav +"_main_right";         

		// append wwd main right
		var main_append_right =  syn_main_contain.appendChild(main_right);

		// create main right image
		var main_right_img = document.createElement ("img"); main_right_img.id = "rimg";

		// append wwd main right image
		var wwd_append_Image = main_right.appendChild(main_right_img); 

		// apply load transition
        document.getElementById('csstran').href = "transition.css";
		document.getElementById(chkcontain).style = csstransition ; 
     
		// append nav code for left contain
		var chkcontain_left = nav + "_main_left";
		chknav === "chk_wwd" ?  document.getElementById(chkcontain_left).innerHTML  = wwdquote : "";
		chknav === "chk_op" ? document.getElementById(chkcontain_left).innerHTML  = opquote : "";
		chknav === "chk_raq" ? document.getElementById(chkcontain_left).innerHTML  = raqquote : "";

		// append nav code for right contain
		chknav === "chk_wwd" ? document.getElementById('rimg').src = wwdimg : "";		
		chknav === "chk_op" ? document.getElementById('rimg').src = opimg  : "";
		chknav === "chk_raq" ? document.getElementById('raq_main_right').innerHTML = reqform : "";
	
	}   
}

