var width = 500;
var height = 500;
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

var data = [[250, 250], [0, 0], [100, 150], [400, 200], [700, 250], [5000, 400]];
var padding = 20

var xMin = d3.min(data, function(d) {
  return d[0];
});

var xMax = d3.max(data, function(d) {
  return d[0];
});

var yMin = d3.min(data, function(d) {
  return d[1];
});

var yMax = d3.max(data, function(d) {
  return d[1];
});

var xScale = d3.scaleLinear()
               .domain([xMin, xMax])
               .range([padding, width - padding]);

var yScale = d3.scaleLinear()
               .domain([yMin, yMax])
               .range([ padding, height - padding]); // [height, 0] - flips it - inverse

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return xScale(d[0]); })
  .attr('cy', function(d) { return yScale(d[1]); })
  .attr('r', function() { return 10; });


// var quotes = [{
// 	quote: "Go ahead, make my day.",
// 	color: "red",
//   size: 24
// }, {
// 	quote: "I'll be back.",
// 	color: "orange",
//   size: 30
// }, {
// 	quote: "May the Force be with you.",
// 	color: "yellow",
//   size: 18
// }, {
// 	quote: "There's no place like home.",
// 	color: "green",
//   size: 36
// }, {
// 	quote: "You're gonna need a bigger boat.",
// 	color: "blue",
//   size: 14
// }];
//
// d3.select("body")
//   .selectAll("p")
//   .data(quotes)
//   .enter()  //makes new p tags when they don't exist
//   // if enter wasn't here, would fill up existing <p> tags
//   .append("p")
//   .text(function(d) { // data is passed into this callback
//     return d.quote;
//   })
//   .style("color", function(d) {
//     return d.color;
//   })
//   .style("font-size", function(d){
//     // return d.size + "px";
//     return Math.round((Math.random() * 40)) + 30 + "px";
//   })
