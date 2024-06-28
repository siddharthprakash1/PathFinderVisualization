export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [startNode];
    startNode.isVisited = true;
  
    while (stack.length) {
      const currentNode = stack.pop();
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === finishNode) return visitedNodesInOrder;
  
      const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of unvisitedNeighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  
    return visitedNodesInOrder;
  }