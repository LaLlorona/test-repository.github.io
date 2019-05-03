// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

let myTable = document.getElementById("table");
let capitalList = [];
let pairs;
let initialNumber = getRandomInt(0, 205);
let randomCountry;
let randomCapital;
let randomNumber;
let entryNumber = 1;	
let n = 0;

var question = document.getElementById("pr2_question");
var answer = document.getElementById("pr2_answer");

$( document ).ready(function() {
    $.ajax({
        url: "https://cors.io/?https://s3.ap-northeast-2.amazonaws.com/ec2-54-144-69-91.compute-1.amazonaws.com/country_capital_pairs_2019.csv",
        dataType: "text",
        success: function(){
            d3.csv("https://cors.io/?https://s3.ap-northeast-2.amazonaws.com/ec2-54-144-69-91.compute-1.amazonaws.com/country_capital_pairs_2019.csv").then(function(data) {
            console.log(data);
            pairs = data;
            while (pairs == undefined) {
              console.log("loading data");
            }
            randomCountry = pairs[initialNumber].country;
            randomCaptial = pairs[initialNumber].capital;
            document.getElementById("pr2__question").innerHTML = randomCountry;
          
            
            let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=" + randomCountry + "&maptype=roadmap&language=en'";
            let map = document.getElementById("GoogleMap");
            map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:0;' src=" + src + "></iframe>";

            document.getElementById("pr3__clear").disabled = true;

            for (i = 0; i < pairs.length; i += 1){
              capitalList.push(pairs[i].capital);
            }

            $("#pr2__answer").autocomplete({
              source: capitalList,
              autoFocus: true
            });


          });
        },
    });
  });
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get the input field
var input = document.getElementById("pr2__answer");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("pr2__submit").click();
  }
});

function clearEntry() {
    /*
    write code here for pr3__clear
    */
   var rowsCount = myTable.rows.length;
   while (rowsCount > 4) {
        myTable.deleteRow(-1);
        rowsCount -= 1;
   }
}


function refreshList() {
  document.getElementById("pr3__clear").disabled = false;
    inputValue = document.getElementById("pr2__answer").value;
    if (inputValue != ""){

    let previousAnswer;
    

    if (n == 0) {
      previousAnswer = pairs[initialNumber].capital;
    } else {
      previousAnswer = pairs[randomNumber].capital;
    }

    n += 1;
  randomNumber = getRandomInt(0, 205);
	randomCountry = pairs[randomNumber].country;
    
    previousQuestion = document.getElementById("pr2__question").innerHTML;
	document.getElementById("pr2__question").innerHTML = randomCountry;
	document.getElementById("pr2__answer").value = "";

  // Update the Map
  let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyApvJ3f-gP8vj_w8YGHT8iVb19GBd0o_KA&q=" + randomCountry + "&maptype=roadmap&language=en'";
    let map = document.getElementById("GoogleMap");
    map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:0;' src=" + src + "></iframe>";

  var row = myTable.insertRow(3);
  row.id = "country" + n.toString();
    var cell1 = row.insertCell(0);
    cell1.style.textAlign = "left";
    cell1.id = previousQuestion;
  var element1 = document.createTextNode(previousQuestion);
  cell1.onmouseover = function() {
    let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=" + cell1.id + "&maptype=roadmap&language=en'";
    let map = document.getElementById("GoogleMap");
    map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:1px black solid;' src=" + src + "></iframe>";
  }
  cell1.onmouseout = function() {
    let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=" + randomCountry + "&maptype=roadmap&language=en'";
    let map = document.getElementById("GoogleMap");
    map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:0;' src=" + src + "></iframe>";
  }
	
  var cell2 = row.insertCell(1);
  cell2.style.textAlign = "left";
	var element2 = document.createTextNode(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
	
    var cell3 = row.insertCell(2);
    cell3.style.textAlign = "left";
    cell3.id = previousAnswer;
    var element3 = document.createTextNode((previousAnswer + " "));
    var element4 = document.createElement("button");
    element4.innerHTML = "Delete";
    element4.id = entryNumber;
    cell3.onmouseover = function() {
      let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=" + cell3.id + "&maptype=roadmap&language=en&zoom=5'";
      let map = document.getElementById("GoogleMap");
      map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:1px black solid;' src=" + src + "></iframe>";
    }
    cell3.onmouseout = function() {
      let src = "'https://www.google.com/maps/embed/v1/place?key=AIzaSyBO_WwFts0d4UEd2BBjxoBTTqLHvi0FyqA&q=" + randomCountry + "&maptype=roadmap&language=en'";
      let map = document.getElementById("GoogleMap");
      map.innerHTML = "<iframe id = 'map' width='500px' height='400px' frameborder='0' style='border:0;' src=" + src + "></iframe>";
    }

    let truthVal = ((inputValue.charAt(0).toUpperCase() + inputValue.slice(1)) == previousAnswer);

    writeDatabase(row.id, element1, element2, truthVal, element3);

    if (truthVal) {
      cell1.style.color = "green";
      cell2.style.color = "green";
      cell3.style.color = "green";
      row.id = "correct";
    } else {
      cell1.style.color = "red";
      cell2.style.color = "red";
      cell2.style.textDecoration = "line-through";
      cell3.style.color = "red";
      row.id = "false";
    }

    cell1.appendChild(element1);
    cell2.appendChild(element2);
    cell3.appendChild(element3);
    cell3.appendChild(element4);
  }
}
 

function showCorrectOnly() {

}

function showFalseOnly() {

}


// Firebase
var config = {
  apiKey: "AIzaSyBLAQEQ8lBLHO_ItyG1rzjJWCK4lHGZvIo",
  authDomain: "pr3-cs374-1556512888986.firebaseapp.com",
  databaseURL: "https://pr3-cs374-1556512888986.firebaseio.com",
  projectId: "pr3-cs374-1556512888986",
  storageBucket: "pr3-cs374-1556512888986.appspot.com",
  messagingSenderId: "582338224096"
};

firebase.initializeApp(config);

function writeDatabase(countryid, Country, Input, Capital, TruthVal) {
  let newKey = firebase.database().ref(countryid).push();
  newKey.set({
    "country": Country,
    "input": Input,
    "truth_value": Capital,
    "capital": TruthVal
  })
}

function removeDatabase(countryid) {
  let newKey = firebase.database().ref(countryid).remove();

}

function readDatabse() {
  return firebase.database().ref().once("value", function(snapshot) {
    var myValue = snapshot.val();
    console.log(myValue);
  });
  
}

function clearEntry(){
  while(n != 0){
    myTable.deleteRow(3);
    removeDatabase("country"+n.toString());
    console.log(n);
    n -= 1;
  } 
  document.getElementById("pr3__clear").disabled = true;
}
