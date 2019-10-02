//put this in btn.onlick function for generatePassword
var length;
var special;
var number;
var lower;
var upper;
var rPassword = document.getElementById("password");
// how to randomize a string or array
var charTypes = ["@", "%", "+", "'", "!", "#", "$", "^", "?", ":", ".", "~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 0,1,2,3,4,5,6,7,8,9]
var characters = [];
var passwordArray = [];

const MIN = 8;
const MAX = 128;

function generatePassword() {
    length = prompt("Choose a length between 8 and 128");
    alertThis("Length = " + length);
    alertThis("Please choose at least 1 Character type.")
    special = confirm("Would you like Special characters (!#$%&'()*+,-./:;<=>?@[\]^_`{|}~) in your random password?");
    number = confirm("Would you like Numeric Characters (0123456789) in your random password?");
    lower = confirm("Would you like Lowercase Characters (abcdefghijklmnopqrstuvwxyz) in your random password?");
    upper = confirm("Would you like Uppercase Characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ) in your random password?");

    rPassword.innerHTML = "";
    passwordArray=[];
    characters = charTypes;
    const pwLength = parseInt(length.value);

    if (special === true) {
        characters = characters.join("").replace(/[@%+'!#$^?:.~]/g,'').split('')
    }
    if (number === true) {
        characters = characters.join("").replace(/[0-9]/g,'').split('')
    }
    if (lower === true) {
        characters = characters.join("").replace(/[a-zA-Z]/g,'').split('')
    }
    if (upper === true) {
        characters = characters.join("").replace(/[1Ilo0]/g,'').split('')
    }

    if (pwLength < MIN || pwLength > MAX) {
        errorMessage.innerHTML = "You must pick a password between " + MIN + " and " + MAX;
        return;
    }
}

function alertThis(message) {
    alert(message);
}

// var generateBtn = document.getElementById("generate");
// var copyBtn = document.getElementById("copy");
// var passwordText = document.getElementById("password");

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

function getMin() {return MIN;}
function getMax () {return MAX;}