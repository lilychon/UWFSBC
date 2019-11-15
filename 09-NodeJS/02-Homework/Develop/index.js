//Activity 20 changing colors of objects in HTML
//Activity 26 adding class to html
//Activity 33 Github 

const inquirier = require('inquirer');
const fs = require('fs');
const util = require('util');
const css = require('./generateHTML');
const axios = require('axios');
const pdf = require('html-pdf')

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const questions = [
  {
    type: "input",
    name: "username",
    message: "Enter your Github username"
  },
  {
    type: "list",
    message: "Choose your favorite color",
    name: "color",
    choices: [
      "green",
      "blue",
      "pink",
      "red"
    ]
  }
];

function promptUser() {
  inquirier.prompt(questions)
    .then(function (input) {

      username = input.username;
      favColor = input.color;

      const githubUrl = `https://api.github.com/users/${username}`;
      const repoUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
      return githubUrl;
      return repoUrl;
    })
    .then(function (githubUrl) {
      axios.get(githubUrl).then(function (res) {
        res.data.color = favColor;
        const html = css(res.data);
        return writeFileAsync("index.html", html);
        // convertPdf();
    })
    .then(function () {
      console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
      console.log(err);
    });
  });
}


// function convertPdf(htmlPdf, options) {

//   const htmlPdf = readFileAsync('./index.html', 'utf8');
//   const options = { format: 'Letter' };

//   pdf.create(htmlPdf, options).toFile('./resume.pdf', function(err, res) {
//     if (err) return console.log(err);
//     console.log(res);
//   })
// }

promptUser();

