# Pathfinding Visualizer

This project is a React-based visualization tool for pathfinding algorithms. It supports Dijkstra's Algorithm and A* Algorithm, allowing users to visualize the steps taken by these algorithms to find the shortest path between two points on a grid.

![Pathfinding Visualizer Demo](df.gif)

## Features

- Visualize Dijkstra's Algorithm
- Visualize A* Algorithm
- Interactive grid where you can set walls and see how algorithms navigate around them
- Clear board functionality to reset the grid
- Display the time taken by the algorithm to find the shortest path

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/pathfinding-visualizer.git
    cd pathfinding-visualizer
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Click and drag on the grid to create walls.
3. Click "Visualize Dijkstra's Algorithm" or "Visualize A* Algorithm" to see the algorithm in action.
4. To reset the grid, click the "Clear Board" button.
5. The time taken by the algorithm to find the shortest path will be displayed after the visualization.

## Project Structure

- `src/`: The source directory containing all the React components and algorithm implementations.
  - `components/Node/Node.jsx`: The Node component representing each cell in the grid.
  - `components/PathfindingVisualizer.jsx`: The main component that manages the grid and handles the visualization logic.
  - `algorithms/dijkstra.js`: Implementation of Dijkstra's Algorithm.
  - `algorithms/AStar.js`: Implementation of A* Algorithm.
  - `PathfindingVisualizer.css`: Styling for the Pathfinding Visualizer component.

## Algorithms

### Dijkstra's Algorithm

Dijkstra's Algorithm is a graph search algorithm that finds the shortest path between a starting node and all other nodes in the graph. It guarantees the shortest path in a weighted graph without negative weights. The algorithm works by iteratively selecting the node with the smallest known distance from the start node, updating the distances to its neighboring nodes, and marking the node as "visited." This process continues until the shortest path to the target node is found.

### A* Algorithm

A* Algorithm is an extension of Dijkstra's Algorithm that uses heuristics to improve performance. It finds the shortest path by considering both the cost to reach the node and the estimated cost to reach the goal. The algorithm maintains two cost values for each node: the actual cost from the start node and the estimated cost to the goal (heuristic). By prioritizing nodes based on the sum of these costs, A* can often find the shortest path more efficiently than Dijkstra's Algorithm, especially in large graphs with many nodes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project was inspired by Clément Mihailescu's Pathfinding Visualizer.

## Contact

For any inquiries, please contact me at [iamsid0011@gmail.com].
