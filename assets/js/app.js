// console.log because we can
console.log("This is app.js");


//-------------------------------------------------------//
//                DEFINE SVG AREA                        //
//-------------------------------------------------------//


// // define SVG area dimensions
// var svgHeight = window.innerHeight;
// var svgWidth = window.innerWidth;

var svgHeight = 500;
var svgWidth = 800;

console.log(`SVG Height: ${svgHeight}`);
console.log(`SVG Width: ${svgWidth}`);

// define margins
var margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
};

// define chart area
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

console.log(`Chart Height: ${chartHeight}`);
console.log(`Chart Width: ${chartWidth}`);


// create svg container
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// transform the chart
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Set initial parameters***
// var chosenXAxis = "poverty_healthcare";

// // function to update x-scale var upon x-axis label click ***
// function xScale(stateData, chosenXAxis) {

//     // create scales
//     var xLinearScale = d3.scaleLinear()
//         .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.8,
//             d3.max(stateData, d => d[chosenXAxis]) * 1.2
//         ])
//         .range([0, chartWidth]);

//         return xLinearScale;
// }

// // function used for updating x-axis var upon x-axis label click ***
// function renderAxes(newXScale, xAxis) {

//     // define bottomAxis variable for the selected x-axis label
//     var bottomAxis = d3.axisBottom(newXScale);

//     // transition the x-axis once x-axis label is selected
//     xAxis.transition()
//         .duration(1000)
//         .call(bottomAxis);

//     return xAxis;
// }

// //  function to update circles group ***
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//     // define transtion for circles
//     circlesGroup.transition()
//         .duration(1000)
//         .attr("cx", d => newXScale(d[chosenXAxis]));

//     return circlesGroup;
// }


// pull in data from data.csv
d3.csv("./assets/data/data.csv").then(function(stateData) {

    // confirm we are pulling in data correctly
    console.log(stateData);

    // cast numeric values to numbers for each piece of stateData
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
    });

    // scale x to chart width
    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([d3.min(stateData, d => d.poverty)-2, d3.max(stateData, d => d.poverty)+2]);
        console.log("Poverty Max: ", d3.max(stateData, d => d.poverty));



    // scale y to chart height
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([d3.min(stateData, d => d.healthcare) -2, d3.max(stateData, d => d.healthcare)+2]);
        console.log("Healthcare Max: ", d3.max(stateData, d => d.healthcare));

    // create axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    // append y axis to chart
    chartGroup.append("g")
        .call(leftAxis);

    // create x axis label
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top -10})`)
        .classed("aText", true)
        .text("In Poverty (%)");

    // create y axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");

    // create circles for scatter plot
    chartGroup.selectAll("stateCircle")
        .data(stateData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "12")
        
    // create labels for state abbreviations for scatterplot
    chartGroup.selectAll(".label")
        .data(stateData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare)+5)
        .text(d => d.abbr);
});








