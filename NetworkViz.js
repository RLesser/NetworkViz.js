// Plugin to create basic graph

// var defaultOptions = {
// 	node: {
// 		defaultRadius: 2,
// 		defaultColor: "lightgray",
// 	},
// 	backgroundColor: "white",
// 	simulation: {
// 		linkDistance: 1,
// 		linkStrength: 1,
// 		chargeStrength: -20,
// 		alphaDecay: 0.0002,
// 	}

// }

(function() {
	//...
})

function ForceGraph(selectorString, options) {

	// setting up DOM elements

	console.log(selectorString)
	console.log(d3.selectAll(selectorString))

	var width = parseInt(d3.selectAll(selectorString).style("width"), 10)
		height =  parseInt(d3.selectAll(selectorString).style("height"), 10)

	var view = d3.selectAll(selectorString)
		.append("svg:svg")
		.attr("width", width)
		.attr("height", height)
		.attr("pointer-events", "all")
		.call(d3.zoom().on("zoom", rescale))
		.on("dblclick.zoom", null)

	var background = view
		.append("svg:rect")
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "white");
		
	var graph = view
		.append("svg:g")

	function rescale() {
		vis.attr("transform", d3.event.transform)
	}

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(1).strength(1))
		.force("charge", d3.forceManyBody().strength(-20))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.alphaDecay(0.0002);

}