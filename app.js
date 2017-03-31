let width = 500;
let height = 500;
let svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

// var data = [[250, 250], [0, 0], [100, 150], [400, 200], [700, 250], [5000, 400]];
let data = movies;

let padding = 20;

let xMin = d3.min(data, (d) => {
  return d.daysOpen;
});

let xMax = d3.max(data, (d) => {
  return d.daysOpen;
});

let yMin = d3.min(data, (d) => {
  return d.total;
});

let yMax = d3.max(data, (d) => {
  return d.total;
});

let xScale = d3.scaleLinear()
               .domain([xMin, xMax])
               .range([padding, width - padding]);

let yScale = d3.scaleLinear()
               .domain([yMin, yMax])
               .range([ height - padding, padding ]); // [0, height] - flips it - inverse

let colorScale = d3.scaleLinear()
                  .domain([0,1])
                  .range(['red', 'green']);

let tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity",0)
                .style("position","absolute");

svg.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', (d) => { return xScale(d.daysOpen); })
  .attr('cy', (d) => { return yScale(d.total); })
  .attr('r', (d) => { return 5 * d.total / d.openingTotal; })
  .attr('fill', (d) => {
    return colorScale(d.freshness);
  })
  .on('mouseenter', (d) => {
    console.log(d);
    console.log(d3.event.screenX,
                d3.event.screenY);
    tooltip.text(d.title)
           .style("opacity", 1)
           .style("background", "beige")
           .style("left", d3.event.pageX + "px")
           .style("top", d3.event.pageY + "px");
  })

  .on('mouseout', (d) => {
    tooltip.style("opacity", 0);
  })

svg.append('g')
   .attr("class","x-axis")
   .attr("transform", "translate(5," + (height - padding) + ")")
   .call(d3.axisBottom(xScale));

svg.append('g')
  .attr("transform", "translate(" + (padding + 5)+ ",0)")
  .call(d3.axisLeft(yScale));

d3.select("select").on("change", () => {
  let scaleType;
  let newVal = d3.select("select").property("value"); //daysOpen, maxTheaters, release
  xMin = d3.min(movies, (d) => {
    return d[newVal];
  });
  xMax = d3.max(movies, (d) => {
    return d[newVal];
  });
  if (newVal === "release") {
    scaleType = d3.scaleTime;
  } else {
    scaleType = d3.scaleLinear;
  }
  xScale = scaleType().domain([xMin, xMax])
                      .range([padding, width - padding]);

  let t = d3.transition()
            .duration(1000)
            .ease(d3.easeBounceOut);
  //
  d3.selectAll('circle')
    .transition(t)
    .attr('cx', (d) => {
      return xScale(d[newVal]);
    });

  d3.selectAll('.x-axis')
    .transition(t)
    .call(d3.axisBottom(xScale));

});
