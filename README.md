# path-finding-example

## Testing:
Run the tests in the tests/ folder with "node ./tests/<test_input_file>.txt ./tests/<test_answer_file>.txt"
This will give the print the results of the run after 

## Current implementation:
1. Dijkstra's shortest path algorithm on the initial graph to get the optimum path
2. For each query, check to see if the edge being removed is part of the optimum path
2.a If it is part of the optimum path, remove the edge from the graph and re-run Dijkstra to get the shortest path
2.b If it is not part of the optimum path, return the saved optimum path distance

## TODO:
Check if the edge being removed is a bridge in the graph, and if not, then the optimum path distance can be returned
Instead of re-running Dijkstra each time, have a better way to calculate the increase in distance caused by the removal of a bridge edge.
