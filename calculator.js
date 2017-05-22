$(document).ready(function () {
  var display_div = document.getElementById("display");
  var display = "0"
  var memory = "";
  var op_minus = /^[-]$/;
  var op_all = /^[\*/+-]$/;
  var numbers = /^[0-9]$/;

  /*If two operator buttons are pressed after each other, this function replaces the first by the second*/
  function NoTwoOps(str) { 
    if (op_all.test(str.charAt(str.length-2)) === true) {
      memory = str.slice(0,str.length-2) + str.charAt(str.length-1);
    }
    return memory;
  }
  display_div.innerHTML = "0";

  /* This function updates the display with the current
  value of the display variable. It deletes a zero from the numbers in the display in case this zero is the first digit in the number, and it shortens the number in displays to 13 digits */
  function Update() {
    if (display.charAt(0) === "0" && display.charAt(1) != "." && display.length > 1) {
      display = display.substr(1);
    }
    if (display.length > 14) {
      display = display.substr(0,14)
    }
    display_div.innerHTML = display;
  }

  // Buttons 0-9
  $("#1").on('click', function() {
    memory += "1";
    display += "1";
    Update();
  });
  $("#2").on('click', function() {
    memory += "2";
    display += "2";
    Update();
  });
  $("#3").on('click', function() {
    memory += "3";
    display += "3";
    Update();
  });
  $("#4").on('click', function() {
    memory += "4";
    display += "4";
    Update();
  });
  $("#5").on('click', function() {
    memory += "5";
    display += "5";
    Update();
  });
  $("#6").on('click', function() {
    memory += "6";
    display += "6";
    Update();
  });
  $("#7").on('click', function() {
    memory += "7";
    display += "7";
    Update();
  });
  $("#8").on('click', function() {
    memory += "8";
    display += "8";
    Update();
  });
  $("#9").on('click', function() {
    memory += "9";
    display += "9";
    Update();
  });
  $("#0").on('click', function() {

    //If there is already a "0" in the display, no further 0s are added when "0" is pressed.
    if (display == "0") {  
    } 
    else {
      memory += "0";
      display += "0";
      Update();
    }
  });
  $("#decimal").on('click', function() {

    //If there is already a decimal point in the display, no more are added when the button is pressed.
    if (display == ".") { 
    } 
    else {
      memory += ".";
      display += ".";
      Update();
    }
  });

  //operation buttons
  $("#multiply").on('click', function() {
    memory += "*";
    memory = NoTwoOps(memory);
    display = "";
  });
  $("#minus").on('click', function() {
    memory += "-";
    memory = NoTwoOps(memory);
    display = "";
  });
  $("#plus").on('click', function() {
    memory += "+";
    memory = NoTwoOps(memory);
    display = "";
  });
  $("#divide").on('click', function() {
    memory += "/";
    NoTwoOps(memory);
    memory = NoTwoOps(memory);
    display = "";
  });
  $("#equals").on('click', function() {
    memory = eval(memory);
    display = memory.toString();
    Update();
  })
  $("#AC").on('click', function() { //Button deletes memory and puts display back on 0//
    memory = "";
    display = "0";
    display_div.innerHTML = "0";
  })

  /*Button has the effect of changing the sign in front of the number that is in 
  the display. To do so, the function loops through the memory string starting from 
  its end and takes the number in front of the last operator in the string (or
  simply the whole string if there are no operators). This number is the
  number in the display, except in cases where the display does not show
  the whole last number in memory when this number has more digits than can
  be displayed.*/
  $("#plusminus").on('click', function() {
    var i = memory.length-1;
    while (op_all.test(memory[i]) === false && i >= 0) {
      i--;
    }

    //this condition finds the display number in memory strings with operators, where the display number is not negative
    if (i > -1 && op_all.test(memory[-1]) === false) {
      var memory_last = memory.substr(i+1,memory.length);
      memory = memory.substr(0,i+1) + eval(memory_last+"*-1");
      display = eval(memory_last+"*-1");
    }

    //this condition finds the display number in memory strings with operators, where the display number is negative 
    else if (i > -1 && op_all.test(memory[-1]) === true) {
      var memory_last2 = memory.substr(i,memory.length);
      memory = memory.substr(0,i) + eval(memory_last2+"*-1");
      display = eval(memory_last2+"*-1");
      console.log(display);
    } 

    //this condition finds the display number in memory strings with no operators.
    else {
      memory = eval(memory + "*-1");
      display = eval(memory);
      console.log(display);
    } 
    display_div.innerHTML = display
  })
})
