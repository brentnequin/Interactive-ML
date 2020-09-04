# Interactive-ML

[Interactive-ML](https://brentnequin.github.io/Interactive-ML/) is a JavaScript-based web tool for visualizing machine learning algorithms.

The web tool consists of a 2D Cartesian graph generated using Plotly.js. Additional data points can be placed by clicking anywhere on the graph. When an algorithm is selected, the graph will show results of the algorithm when ran.

## How to use Interactive-ML
1. In the Nav-bar at the top of the page, select an algorithm.
   * For algorithms dependent on a value for *k* (*k*-Means, *k*-Medoids, etc.), specify a value.
2. Place additional data points by clicking on the graph.
   * If you are not happy with the points already placed, hit Clear to clear the graph of all points.
3. Hit run and observe the results of the selected algorithm.

## Goals
* Apply web framework (Flask, Django) to run python scripts instead of JS.
* Implement algorithms including but not limited to: *k*-Means Clustering, *k*-Medoids Clustering, Perceptron, k-NN.
* Add user controls to allow algorithms to run at a certain speed per step/iteration.
* Add ability to place test points 
* Add a table view of all points placed on the graph.
* More to come...
