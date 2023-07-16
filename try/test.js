fetch('data/ap_data_USA_Snacks_Grain_Snacks_100.json').then(res => res.json()).then(gData => {
    gData.links.forEach(link => {
        const a = gData.nodes[link.source];
        const b = gData.nodes[link.target];
        // !a.neighbors && (a.neighbors = []);
        // !b.neighbors && (b.neighbors = []);
        // a.neighbors.push(b);
        // b.neighbors.push(a);

        // !a.links && (a.links = []);
        // !b.links && (b.links = []);
        // a.links.push(link);
        // b.links.push(link);
    });
    // console.log(gData);
});