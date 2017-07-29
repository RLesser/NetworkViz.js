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


function ForceGraph(selectorString, options) {

	// setting up DOM elements

	// PRIVATE MEMBERS

	//Graph data variables

	var nodeData = [
		{
			id: 1
		},
		{
			id: 2
		},
		{
			id: 3
		},
		{
			id: 4
		},
		{
			id: 5
		}
	]

	var linkData = [
		{
			source: 1,
			target: 2
		},
		{
			source: 2,
			target: 3
		},
		{
			source: 3,
			target: 1
		},
		{
			source: 2,
			target: 4
		},
		{
			source: 4,
			target: 5
		}
	]

	//Environmental Variables


	var view = d3.selectAll(selectorString)
		.append("svg:svg")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("pointer-events", "all")
			.call(d3.zoom().on("zoom", rescale))
			.on("dblclick.zoom", null)

	var background = view
		.append("svg:rect")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "white");
		
	var graph = view
		.append("svg:g")

	function rescale() {
		graph.attr("transform", d3.event.transform)
	}

	var width = view.node().getBBox().width,
		height = view.node().getBBox().height

	console.log(width, height)

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(1).strength(1))
		.force("charge", d3.forceManyBody().strength(-20))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.alphaDecay(0.0002);

	var link = graph.append("g")
		.attr("class", "links")
		.selectAll("line")
			.data(linkData)
			.enter().append("line")
				.attr("stroke-width", function(d) { return 1; })
				.attr("stroke", "black")

	var node = graph.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
			.data(nodeData)
			.enter().append("circle")
				.attr("id", function(d) {return d.id})
				.attr("fill", "lightgray")
				.attr("r", 2)
				.attr("stroke", "darkgray")
				// .attr("size", "")
				// .attr("category", "")
				// .attr("name", function(d) { return d.name })
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended));

	function ticked() {
		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
  	}

	simulation
		.nodes(nodeData)
		.on("tick", ticked);

	simulation.force("link")
		.links(linkData);

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3);
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

	//Graph data variables

	var methodObj = {}

}