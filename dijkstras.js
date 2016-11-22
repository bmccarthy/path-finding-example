// https://github.com/gwtw/js-fibonacci-heap
let FibonacciHeap = require("@tyriar/fibonacci-heap");

// algorithm from https://en.wikipedia.org/wiki/Dijkstra's_algorithm and using the heap implemenation
class Dijkstra {
  constructor(vertices) {
    this.vertices = vertices;
  }

  // from the "previous" dictionary, create the path from start->finish
  convertToPath(previous, finish) {
    let reversePath = [];

    reversePath.push(finish);

    let next = previous[finish];

    while (typeof next !== 'undefined') {
      reversePath.push(next);
      next = previous[next];
    }

    return reversePath.reverse();
  }

  shortestPath(start, finish) {
    let distances = {};
    let previous = {};
    let visited = {};
    let heapCopy = {};

    distances[start] = 0;

    let heap = new FibonacciHeap();

    // initialize all nodes to have a distance of infinity and no previous node set yet
    // (except for start which is initialized to have 0 distance and no previous node set)
    for (let key in this.vertices) {
      if (key !== start) {
        distances[key] = Infinity;
        previous[key] = null;
      }
    }

    // initially the heap has 1 node in it, the start node.
    // currently keeping access to the heap in a dictionary like object so we can decrease the priority of it in the queue
    // todo: see if this functionality is available in any fibonacci heap implementation
    heapCopy[start] = heap.insert(distances[start], start);

    while (!heap.isEmpty()) {
      let node = heap.extractMinimum();
      let uKey = node.value;

      // if we are at the end node, return back the distance to this node and the path
      // todo: the path may help cache some of the results in the future
      if (uKey == finish) {
        return { previous: previous, path: this.convertToPath(previous, finish), distance: distances[finish] };
      }

      let u = this.vertices[uKey];

      // mark this node as being visited so we don't attempt to update its distance anymore.  It is already the
      // least distance when it gets visited
      visited[uKey] = true;
      delete heapCopy[uKey];

      for (let vKey in u.neighbors) {
        if (visited[vKey]) continue; // only need to update distances for nodes we didn't already visit

        // get the distance to each neighbor coming from the 'u' node.
        let alt = distances[uKey] + u.neighbors[vKey];

        // if the distance coming from the 'u' node is less than what the previous best distance was, update it
        if (alt < distances[vKey]) {
          distances[vKey] = alt;
          previous[vKey] = uKey;

          if (vKey in heapCopy) {
            // if item is already in the queue and its distance is less than we thought it was previously, update its priority in the queue
            let neighborNode = heapCopy[vKey];
            heap.decreaseKey(neighborNode, alt);
          } else {
            // if item was not in the queue already insert it
            // should this happen also if the distance isn't less than we thought it was previously?
            // the node will always be added because initially all distances are infinity so the alt distance will always be initially better
            heapCopy[vKey] = heap.insert(alt, vKey);
          }
        }
      }
    }

    // if we got through the entire heap and never found our "finish" node, there is no path from start->finish
    return { previous: previous, path: [], distance: Infinity };
  }

  removeEdge(u, v) {
    let distance = this.vertices[u].neighbors[v];

    delete this.vertices[u].neighbors[v];
    delete this.vertices[v].neighbors[u];

    return distance;
  }

  addEdge(u, v, distance) {
    this.vertices[u].neighbors[v] = distance;
    this.vertices[v].neighbors[u] = distance;
  }
}

module.exports = Dijkstra;
