// console.log because we can
console.log("This is app.js");


//-------------------------------------------------------//
//                DEFINE SVG AREA                        //
//-------------------------------------------------------//


// define SVG area dimensions
var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;

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


// pull in data from data.csv
d3.csv("./assets/data/data.csv").then(function(stateData) {

    // confirm we are pulling in data correctly
    console.log(stateData);

    // cast numeric values to numbers for each piece of stateData
    stateData.forEach(function(data) {
        stateData.poverty = +stateData.poverty;
        stateData.povertyMoe = +stateData.povertyMoe;
        stateData.age = +stateData.age;
        stateData.ageMoe = +stateData.ageMoe;
        stateData.income = +stateData.income;
        stateData.incomeMoe = +stateData.incomeMoe;
        stateData.healthcare = +stateData.healthcare;
        stateData.healthcareLow = +stateData.healthcareLow;
        stateData.healthcareHigh = +stateData.healthcareHigh;
        stateData.obesity = +stateData.obesity;
        stateData.obesityLow = +stateData.obesityLow;
        stateData.obesityHigh = +stateData.obesityHigh;
        stateData.smokes = +stateData.smokes;
        stateData.smokesLow = +stateData.smokesLow;
        stateData.smokesHigh = +stateData.smokesHigh;
    });

    // scale x to chart width
    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([0, d3.max(stateData, d => d.poverty)]);

    // scale y to chart height
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(stateData, d => d.healthcare)]);

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

    // // create circles for scatter plot
    // var circlesGroup = chartGroup.selectAll("circle")
    //     .data(stateData)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", d => xLinearScale(d[poverty]))
    //     .attr("cy", d => yLinearScale(d.healthcare))
    //     .attr("r", 15)
    //     .attr("fill", "light blue")
    //     .attr("opacity", "0.5");

});








