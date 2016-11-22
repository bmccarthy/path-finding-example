# path-finding-example

## Testing:
Run the tests in the tests/ folder with "node ./test-runner.js ./tests/<test_input_file>.txt ./tests/<test_answer_file>.txt"
This will give the print the results of the run after 

## Current implementation:
1. Use Dijkstra's shortest path algorithm (with Fibonacci heap) on the initial graph to get the optimum path on the initial graph
2. For each query, check to see if the edge being removed is part of the optimum path
2.a If it is part of the optimum path, remove the edge from the graph and re-run Dijkstra to get the shortest path
2.b If it is not part of the optimum path, return the saved optimum path distance

## TODO:
1. Check if the edge being removed is part of one of the shortest paths from the start to destination.  Currently, the code only checks a single shortest path.
2. someway to find a new shortest path if one of the edges in the initial shortest path is missing without re-running Dijkstra? - See notes below about "Replacement Paths".

## Other notes:
### http://alumni.cs.ucsb.edu/~bhosle/publications/eprp-pdcs04-final.pdf
* The (Single-Edge) Replacement Paths problem is defined
as follows: Given a weighted graph G(V, E), two nodes
s and t, and the shortest path PG(s, t) = {e1, e2, . . . , ep}
from s to t in G, compute the shortest path from s to t in the
graph G\ei
for 1 ≤ i ≤ p. In other words, the single-edge
replacement paths problem studies how a given s-t shortest
path changes with the deletion of an edge lying on the path.

### http://ie.technion.ac.il/~yemek/Publications/near-linear-time.pdf
* A Near-Linear Time Algorithm for Computing Replacement Paths
in Planar Directed Graphs
