var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");
var color = d3.scaleOrdinal(d3.schemeCategory20);
var radius = 15;

var simulation = d3
.forceSimulation()
.force("charge", d3.forceManyBody().strength(-30))
.force("link", d3.forceLink().id(d => d.id))
.force("center", d3.forceCenter(width/2, height/2));


d3.json("data/miserables.json", function (error, graph) {
    if (error) throw error;

    simulation
    .nodes(graph.nodes)
    .force("link")
    .links(graph.links);

    simulation.on("tick", tickActions);

    var g = svg.append("g")
        .attr("class", "everything");

    var link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", 2)
        .style("stroke", linkColour);

    var node = g.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", circleColour);


    var drag_handler = d3.drag()
        .on("start", drag_start)
        .on("drag", drag_drag)
        .on("end", drag_end);

    drag_handler(node);


    var zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);

    zoom_handler(svg);


    function circleColour(d) {
        if (d.sex == "M") {
            return "blue";
        } else {
            return "pink";
        }
    }

    function linkColour(d) {
        if (d.type == "A") {
            return "green";
        } else {
            return "red";
        }
    }

    function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function drag_drag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function zoom_actions() {
        g.attr("transform", d3.event.transform)
    }

    function tickActions() {
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
    }

});