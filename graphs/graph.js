const stations = 'Malmö C,Lund C,Triangeln,Östra Grevie,Trelleborg C,Hyllie,Oxie,Stångby'.split(',');

const routes = [
    ['Malmö C', 'Lund C'],
    ['Malmö C', 'Hyllie'],
    ['Malmö C', 'Triangeln'],
    ['Trelleborg C', 'Hyllie'],
    ['Trelleborg C', 'Östra Grevie'],
    ['Oxie', 'Hyllie'],
    ['Triangeln', 'Hyllie'],
    ['Lund C', 'Stångby']
];

const adjacencyList = new Map();

const addNode = (station) => {
    adjacencyList.set(station, []);
}

const addEdge = (origin, destination) => {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
}

stations.forEach(addNode);
routes.forEach(route => addEdge(...route));

console.log(adjacencyList);

const breadth_first_search = (start) => {
    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
        const station = queue.shift();

        const destinations = adjacencyList.get(station);

        for (const destination of destinations) {
            if (destination === 'Malmö C') {
                console.log('hittade Malmö C');
            }

            if (!visited.has(destination)) {
                visited.add(destination);
                queue.push(destination);
                console.log(destination);
            }
        }
    }
}

breadth_first_search('Hyllie');

const depth_first_search = (start, visited = new Set()) => {
    console.log(start);

    visited.add(start);

    const destinations = adjacencyList.get(start);

    let steps = 0;
    for (const destination of destinations) {
        steps++;
        if (destination === 'Oxie') {
            console.log(`DFS found Oxie in ${steps} steps`);
            return;
        }

        if (!visited.has(destination)) {
            depth_first_search(destination, visited);
        }
    }
}

depth_first_search('Hyllie');