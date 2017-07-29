var c1 = ForceGraph("#chart1")
var c2 = ForceGraph("#chart2")

$(".pause").on("click", function() {
	c1.stopSim()
})

$(".resume").on("click", function() {
	c1.startSim()
})