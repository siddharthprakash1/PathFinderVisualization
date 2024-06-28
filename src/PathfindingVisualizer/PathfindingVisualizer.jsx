import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder as getDijkstraNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { aStar, getNodesInShortestPathOrder as getAStarNodesInShortestPathOrder } from '../algorithms/AStar';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 5;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 49;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algorithmTime: null,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }
  
  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      heuristic: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }
  clearBoard() {
    const newGrid = this.state.grid.map(row => 
      row.map(node => {
        return {
          ...node,
          distance: Infinity,
          heuristic: Infinity,
          isVisited: false,
          previousNode: null,
          // Preserve isWall, isStart, and isFinish
        };
      })
    );
    
    this.setState({ grid: newGrid });
  
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        if (
          !newGrid[row][col].isStart &&
          !newGrid[row][col].isFinish &&
          !newGrid[row][col].isWall
        ) {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  visualizeAlgorithm(algorithm) {
    this.clearBoard();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const startTime = performance.now();
    const visitedNodesInOrder = algorithm(grid, startNode, finishNode);
    const endTime = performance.now();
    const nodesInShortestPathOrder = algorithm === dijkstra
      ? getDijkstraNodesInShortestPathOrder(finishNode)
      : getAStarNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    this.setState({ algorithmTime: endTime - startTime });
  }

  render() {
    const { grid, mouseIsPressed, algorithmTime } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeAlgorithm(dijkstra)}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm(aStar)}>
          Visualize A* Algorithm
        </button>
        <div className="time-taken">
          {algorithmTime && <p>Time taken: {algorithmTime.toFixed(2)} ms</p>}
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    heuristic: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};