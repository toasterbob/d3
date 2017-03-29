var width = 500;
var height = 500;
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

// var data = [[250, 250], [0, 0], [100, 150], [400, 200], [700, 250], [5000, 400]];
var data = movies;

var padding = 20;

var xMin = d3.min(data, function(d) {
  return d.daysOpen;
});

var xMax = d3.max(data, function(d) {
  return d.daysOpen;
});

var yMin = d3.min(data, function(d) {
  return d.total;
});

var yMax = d3.max(data, function(d) {
  return d.total;
});

var xScale = d3.scaleLinear()
               .domain([xMin, xMax])
               .range([padding, width - padding]);

var yScale = d3.scaleLinear()
               .domain([yMin, yMax])
               .range([ height - padding, padding ]); // [0, height] - flips it - inverse

var colorScale = d3.scaleLinear()
                  .domain([0,1])
                  .range(['red', 'green']);

var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity",0)
                .style("position","absolute");

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return xScale(d.daysOpen); })
  .attr('cy', function(d) { return yScale(d.total); })
  .attr('r', function(d) { return 5 * d.total / d.openingTotal; })
  .attr('fill', function(d) {
    return colorScale(d.freshness);
  })
  .on('mouseenter', (d) => {
    console.log(d);
    console.log(d3.event.screenX,
                d3.event.screenY);
    tooltip.text(d.title)
           .style("opacity", 1)
           .style("left", d3.event.pageX + "px")
           .style("top", d3.event.pageY + "px");
  })

  .on('mouseout', (d) => {
    tooltip.style("opacity", 0);
  })

  svg.append('g')
     .attr("class","x-axis")
     .attr("transform", "translate(0," + (height - padding.top) + ")")
     .call(d3.axisBottom(xScale));

 svg.append('g')
    .attr("transform", "translate(" + padding.left + ",0)")
    .call(d3.axisLeft(yScale));
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
