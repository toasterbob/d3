var quotes = [{
  quote: "Go ahead, make my day.",
  color: "red",
  size: 24
}, {
  quote: "I'll be back.",
  color: "orange",
  size: 30
}, {
  quote: "May the Force be with you.",
  color: "yellow",
  size: 18
}, {
  quote: "There's no place like home.",
  color: "green",
  size: 36
}, {
  quote: "You're gonna need a bigger boat.",
  color: "blue",
  size: 14
}];


d3.select("body")
.selectAll("p")
.data(quotes)
.enter()  //makes new p tags when they don't exist
// if enter wasn't here, would fill up existing <p> tags
.append("p")
.text(function(d) { // data is passed into this callback
  return d.quote;
})
.style("color", function(d) {
  return d.color;
})
.style("font-size", function(d){
  // return d.size + "px";
  return Math.round((Math.random() * 40)) + 30 + "px";
})
