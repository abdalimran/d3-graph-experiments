var svg = d3.select("svg");
var width = svg.attr("width");
var height = svg.attr("height");
var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3
.forceSimulation()
.force("charge", d3.forceManyBody().strength(-100))
.force("link", d3.forceLink().id(d => d.id).distance(100)) // .strength(1)
.force("center", d3.forceCenter(width/2, height/2));


d3.json("data/miserables.json", function (error, graph) {
    if (error) throw error;

    var g = svg.append("g")
        .attr("class", "everything");

    var link = g
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("g");

    var circles = node.append("circle")
        .attr("r", 15)
        .attr("fill", function (d) { return color(d.group); });


    var lables = node.append("text")
        .text(function (d) {
            return d.id;
        })
        .attr("x", 0)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle");


    function zoom_actions() {
        g.attr("transform", d3.event.transform)
    }

    var zoom_handler = d3
        .zoom()
        .on("zoom", zoom_actions);

    svg.call(zoom_handler)

    var drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    node.call(drag)

    node.on('mouseover', function (d) {
        link.style('stroke', function (l) {
            if (d === l.source || d === l.target)
                return 'lime';
            else
                return 'grey';
        });
    });

    // Set the stroke width back to normal when mouse leaves the node.
    node.on('mouseout', function () {
        link.style('stroke', 'grey');
    });

    node.append("title")
        .text(function (d) { return d.id; });

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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