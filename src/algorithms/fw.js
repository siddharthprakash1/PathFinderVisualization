export function floydWarshall(grid, startNode, finishNode) {
    const nodes = getAllNodes(grid);
    const n = nodes.length;
    const dist = Array(n).fill().map(() => Array(n).fill(Infinity));
    const next = Array(n).fill().map(() => Array(n).fill(null));
    
    // Initialize distances and next nodes
    for (let i = 0; i < n; i++) {
      dist[i][i] = 0;
      const neighbors = getUnvisitedNeighbors(nodes[i], grid);
      for (const neighbor of neighbors) {
        const j = nodes.indexOf(neighbor);
        dist[i][j] = 1;
        next[i][j] = j;
      }
    }
  
    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            next[i][j] = next[i][k];
          }
        }
      }
    }
  
    // Reconstruct path
    const visitedNodesInOrder = [];
    let currentNode = startNode;
    while (currentNode !== finishNode) {
      visitedNodesInOrder.push(currentNode);
      currentNode.isVisited = true;
      const nextIndex = next[nodes.indexOf(currentNode)][nodes.indexOf(finishNode)];
      if (nextIndex === null) break;
      currentNode = nodes[nextIndex];
    }
    visitedNodesInOrder.push(finishNode);
  
    return visitedNodesInOrder;
  }