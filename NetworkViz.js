// Basic default options

var defaultOptions = {
	node: {
		defaultRadius: 2,
		defaultColor: "lightgray",
	},
	edge: {
		defaultStroke: "black" 
	},
	backgroundColor: "white",
	simulation: {
		linkDistance: 1,
		linkStrength: 1,
		chargeStrength: -20,
		alphaDecay: 0.0002,
	}

}


function ForceGraph(selectorString, options) {


	// console.log(test, test2)

	// setting up DOM elements

	// PRIVATE MEMBERS

	//Graph data variables

	var nodeData = [
		{
			
		},
		{
			
		},
		{
			
		},
		{
			
		},
		{
			
		}
	]

	var linkData = [
		{
			source: 0,
			target: 1
		},
		{
			source: 1,
			target: 2
		},
		{
			source: 2,
			target: 0
		},
		{
			source: 1,
			target: 3
		},
		{
			source: 3,
			target: 4
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
		.force("link", d3.forceLink().distance(1).strength(1))
		.force("charge", d3.forceManyBody().strength(-20))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.alphaDecay(0.0002);

	var link = graph.append("g")
		.attr("class", "links")
		.selectAll("line")

	var node = graph.append("g")
		.attr("class", "nodes")
		.selectAll("circle")

	drawGraph();

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

	function drawGraph() {
		node = node.data(nodeData)
		node.exit().remove()
		node = node.enter().append("circle")
			.attr("id", function(d) {return d.id})
			.attr("fill", "lightgray")
			.attr("r", 2)
			.attr("stroke", "darkgray")
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended))
			.merge(node);

		link = link.data(linkData)
		link.exit().remove();
		link = link.enter().append("line")
			.attr("stroke-width", function(d) { return 1; })
			.attr("stroke", "black")
			.merge(link)

		simulation.nodes(nodeData).on("tick", ticked);
		simulation.force("link").links(linkData)
		simulation.restart()
	}

	//Graph data variables

	var module = {}

	module.view = view

	module.stopSim = function() {
		simulation.stop();
	}

	module.startSim = function() {
		simulation.restart();
	}

	module.addEdge = function({
		source_id = null, 
		target_id = null, 
		edge_properties = {}
	} = {}) {
		console.log("addEdge", source_id, target_id, edge_properties)
		if (source_id == null || target_id == null) {
			throw "source id and target id must both be specified"
		}
		linkData.push({ source: source_id, target: target_id, properties: edge_properties })
		// drawGraph()
	}

	module.addNode = function({
		node_id = null, 
		coordinates = [width/2, height/2], 
		edge_ids = [], 
		node_properties = {}, 
		edge_properties = {}
	} = {}) {
		console.log("addNode", node_id, coordinates, edge_ids, node_properties, edge_properties)
		nodeData.push({ 
			id: node_id, 
			properties: node_properties,
			x: coordinates[0],
			y: coordinates[1]
		})
		edge_ids.forEach(function(idx, edge_id) {
			module.addEdge(nodeData.length-1, edge_id, edge_properties[edge_id])
		})
		drawGraph()
	}

	module.redraw = drawGraph

	return module

}