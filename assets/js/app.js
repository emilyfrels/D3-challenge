// @TODO: YOUR CODE HERE!
// console.log because we can
console.log("This is app.js");

// pull in data from data.csv
d3.csv("./assets/data/data.csv").then(function(stateData) {

    // confirm we are pulling in data correctly
    console.log(stateData);

});
