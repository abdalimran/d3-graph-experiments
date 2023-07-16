fetch('data/ap_data_USA_Snacks_Grain_Snacks_100.json').then(res => res.json()).then(data => {
    
    const elem = document.getElementById('graph');

    const Graph = ForceGraph()(elem)
        .backgroundColor('#101020')
        .nodeRelSize(6)
        .nodeAutoColorBy('group')
        .nodeLabel(node => `${node.id}: ${node.group}`)
        .linkColor(() => 'rgba(255,255,255,0.2)')
        .linkDirectionalParticles(1)
        .onNodeClick(node => {
            // Center/zoom on node
            Graph.centerAt(node.x, node.y, 1000);
            Graph.zoom(8, 2000);
        })
        // .onNodeDragEnd(node => {
        //     node.fx = node.x;
        //     node.fy = node.y;
        // })
        // .onNodeClick(node => window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank'))
        .graphData(data);
});