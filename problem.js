let Dijkstra = require("./dijkstras");

class ProblemHelper {
  readProblem(input) {
    let cities = {};

    let inputLines = input.split("\n");
    let n = parseInt(inputLines[0].split(" ")[0]);
    let m = parseInt(inputLines[0].split(" ")[1]);
    // console.log(`n: ${n}, m: ${m}`);

    for (let i = 0; i < m; i++) {
      let currentLine = inputLines[1 + i];

      let u = currentLine.split(" ")[0];
      let v = currentLine.split(" ")[1];
      let w = parseInt(currentLine.split(" ")[2]);
      // console.log(`u: ${u}, v: ${v}, w: ${w}`);

      if (!(u in cities)) {
        cities[u] = { neighbors: {} };
      }

      if (!(v in cities)) {
        cities[v] = { neighbors: {} };
      }

      cities[u].neighbors[v] = w;
      cities[v].neighbors[u] = w;
    }

    let s = inputLines[1 + m].split(" ")[0].trim();
    let d = inputLines[1 + m].split(" ")[1].trim();
    // console.log(`s: ${s}, d: ${d}`);

    let Q = parseInt(inputLines[1 + m + 1]);
    // console.log(`Q: ${Q}`);

    let queries = [];

    for (let i = 0; i < Q; i++) {
      let currentLine = inputLines[1 + m + 1 + 1 + i];
      let u = currentLine.split(" ")[0].trim();
      let v = currentLine.split(" ")[1].trim();

      queries.push({ u, v });
    }

    return {
      queries: queries,
      cities: cities,
      s: s,
      d: d
    };
  }

  // returns an array of the shortest path between s->d given that an edge is removed in each iteration
  solveProblem(problem) {
    let results = [];

    // load the graph
    let dijkstra = new Dijkstra(problem.cities);

    let shortestPath = dijkstra.shortestPath(problem.s, problem.d);

    for (let i = 0; i < problem.queries.length; i++) {

      // if there is no original shortest path, then removing any node won't affect the outcome and there is still no path
      if (shortestPath.distance === Infinity) {
        results.push(Infinity);
        continue;
      }

      let removeU = problem.queries[i].u;
      let removeV = problem.queries[i].v;

      // if the edge we are removing is not in the shortest path, use existing shortest path
      if (!this.hasEdge(shortestPath.path, removeU, removeV)) {
        results.push(shortestPath.distance);
        // this.logAnswer(shortestPath.distance, null, i, true, problem.queries.length);
        continue;
      }

      // remove edge from graph for this current iteration
      let removedEdgeDistance = dijkstra.removeEdge(removeU, removeV);

      let result = dijkstra.shortestPath(problem.s, problem.d);

      // re-add edge to graph for this current iteration
      dijkstra.addEdge(removeU, removeV, removedEdgeDistance);

      results.push(result.distance);
      // this.logAnswer(result.distance, null, i, false, problem.queries.length);
    }

    return results;
  }

  // Returns true if the u<->v edge is in the path.  False otherwise
  hasEdge(path, u, v) {
    let indexOfU = path.indexOf(u);
    let indexOfV = path.indexOf(v);

    if (indexOfU < 0 || indexOfV < 0 || Math.abs(indexOfV - indexOfU) > 1) {
      return false;
    }

    return true;
  }

  logAnswer(actual, expected, runNo, total) {
    let message = `CORRECT?: ${expected == actual} actual: "${actual}" expected: "${expected}", run: ${runNo}`;

    if (expected != actual) {
      console.log(message);
    } else if (runNo % 100 === 0) {
      console.log(message);
    } else if (runNo === total - 1) {
      console.log(message);
    }
  }

  printResults(actual) {
    for (let i = 0; i < actual.length; i++) {
      console.log(actual[i]);
    }
  }

  checkStatus(expected, actual) {
    for (let i = 0; i < actual.length; i++) {
      this.logAnswer(actual[i], expected[i], i, expected.length);
    }
  }
}

module.exports = ProblemHelper;
