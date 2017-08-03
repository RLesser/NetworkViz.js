var c1 = ForceGraph("#chart1")

var cursor = c1.view.append("circle")
    .attr("r", 30)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("pointer-events", "none")
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

c1.view.on("pointermove", function() {
	cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
})

c1.view.on("mousedown")

$(".pause").on("click", function() {
	c1.stopSim()
})

$(".resume").on("click", function() {
	c1.startSim()
})

$(".addNode").on("click", function() {
	c1.addNode({
		
	})
})