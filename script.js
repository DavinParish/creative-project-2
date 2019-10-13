/*global fetch*/
var key = "$2a$10$9Q3FcsJi06VL856epPTxluO.qJoICCBGIyCKUWUGVLus6YMk7sV3G";
var mfunc = function(id, suggestionsBox, route){
				var part = document.getElementById(id).value;
				console.log("Partial: " + part);
    	  const url = "https://www.potterapi.com/v1/" + route + "?key=" + key;
    	  console.log(url);
    	  if(part != ""){
        fetch(url)
          .then(function(response) {
            return response.json();
          }).then(function(json) {
              
              var target;
          		var inner = "<ul>";
      				for (var i = 0; i < Object.keys(json).length; i++){
      					if(route == "spells"){
                  target = json[i].spell;
                }
                else if(route == "characters"){
                  target = json[i].name;
                }
                else{
                  target = json[i].name;
                }
      					if(target.toLowerCase().startsWith(part.toLowerCase())){
      						inner += "<li>" + target +"</li>";
      					}
      				}
      				inner += "</ul>";
      				console.log(inner);
      				var suggestions = document.getElementById(suggestionsBox);
      				suggestions.innerHTML = inner;
      				
      				
      	  });
    	  }
    	  else{
    	    var suggestions = document.getElementById(suggestionsBox);
      				suggestions.innerHTML = "<br>";
    	  }
		};
			
			
	document.getElementById("castSpell").addEventListener("click", function(event) {
	  event.preventDefault();
	   document.getElementById("resultsBox").innerHTML = "<h2 id = 'resultsHeader' >See Results Here</h2><hr>";
	  let results = "<ul>";
	  let spellFound = false;
	  const spell = document.getElementById("userSpell").value;
	  const url = "https://www.potterapi.com/v1/spells?key=" + key;
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {	
      	for(var i = 0; i < (Object.keys(json).length)  && (spellFound == false); i++){
      	  if(json[i].spell.toLowerCase() === spell.toLowerCase()){
      	    for (var property in json[i]) {
              if (json[i].hasOwnProperty(property)) {
                // Do things here
                if(property != "_id" && property != "__v"){
                  results += "<li>" + property + ": " + json[i][property] + "</li>";
                }
              }
            }
      	    spellFound = true;
      	    
      	  }
    	  }
    	  results += "</ul>";
    	  var suggestions = document.getElementById("resultsBox");
		    suggestions.innerHTML += results;
		    document.getElementById("userSpell").value = "";
  	});
	});
	
	
	document.getElementById("findCharacter").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("resultsBox").innerHTML = "<h2 id = 'resultsHeader' >See Results Here</h2><hr>";
        let nameFound = false;
        let results = "<ul>";
        const characterName = document.getElementById("userInput").value;
        const url = "https://www.potterapi.com/v1/characters?key=" + key;
        fetch(url)
          .then(function(response) {
            return response.json();
          }).then(function(json) {	
          	for(var i = 0; i < (Object.keys(json).length)  && (nameFound == false); i++){
          	  if(json[i].name.toLowerCase() === characterName.toLowerCase()){
          	    for (var property in json[i]) {
                  if (json[i].hasOwnProperty(property)) {
                    // Do things here
                    if(property != "_id" && property != "__v"){
                      results += "<li>" + property + ": " + json[i][property] + "</li>";
                    }
                  }
                }
          	    nameFound = true;
          	  }
        	  }
        	  results += "</ul>";
        	  var suggestions = document.getElementById("resultsBox");
		        suggestions.innerHTML += results;
		        document.getElementById("userInput").value = "";
          });
          
	});
  	
// =======

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("data-include");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("data-include");
          includeHTML();
          // document.getElementById("home").classList.add('active');
          // document.getElementById("menu").classList.remove('active');
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

//changing selected menu items
//document.getElementById("weatherSubmit").addEventListener("click", function(event) {
//});
// >>>>>>> 0f3b94fd58b2a8230186adb71e34ac5a98cc72da
