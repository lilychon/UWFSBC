var length;
var specials = '!"#$%&()*+,-./:;<=>?@[\]^_`{|~';
var numbers = '1234567890';
var lowers = 'abcdefghijklmnopqrstuvwxyz';
var uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var passBox = document.getElementById("password");
var rPassword = '';

function generatePassword() {
    rPassword = "";
    
    while (length !== null) {
        length = prompt("Choose a length between 8 and 128");
        
        if (length >=8 && length <=128) {
        alertThis("Length = " + length); 
        placeholder = true;
        }   
        else if (isNaN(length)) {
        prompt("It is not a number. Please enter a number between 8 and 128");
        } 
        else {
        prompt("You need to choose a number between 8 and 128");
        }
    }
    alertThis("Please choose at least 1 Character type.")
    var special = confirm("Would you like Special characters (!#$%&'()*+,-./:;<=>?@[\]^_`{|}~) in your random password?");
    var number = confirm("Would you like Numeric Characters (0123456789) in your random password?");
    var lower = confirm("Would you like Lowercase Characters (abcdefghijklmnopqrstuvwxyz) in your random password?");
    var upper = confirm("Would you like Uppercase Characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ) in your random password?");



    if (special === false && number === false && lower === false && upper === false) {
        alert("You must choose at least 1 Character type.");
    } 
    if (special === true) {
        // add special to password
        rPassword += specials;
    } 
    if (number === true) {
        // add number to password
        rPassword += numbers;
    } 
    if (lower === true) {
        // add lower to password
        rPassword += lowers;
    } 
    if (upper === true) {
        // add upper to password
        rPassword += uppers;
    }

    
    

    
    passBox.innerHTML = rPassword;
}


function alertThis(message) {
    alert(message);
}

function copyToClip() {
	var value = document.getElementById("password").innerHTML;
	var input_temp = document.createElement("input");
	input_temp.value = value;
	document.body.appendChild(input_temp);
	input_temp.select();
	document.execCommand("copy");
	document.body.removeChild(input_temp);

	alert("Password copied!");
}