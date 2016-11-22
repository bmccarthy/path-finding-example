const fs = require("fs");
const ProblemHelper = require("./problem");

if (process.argv.length < 4) {
  console.log("Need to pass run with node ./test-runner.js input.txt answers.txt");
  return;
}

let inputFile = process.argv[2];
let answersFile = process.argv[3];

console.log(`inputFile: ${inputFile}, answersFile: ${answersFile}`);

fs.readFile(answersFile, "utf8", (err, answers) => {
  if (err) throw err;

  let expected = answers.split("\n");

  fs.readFile(inputFile, "utf8", (err, input) => {
    if (err) throw err;

    let problemHelper = new ProblemHelper();

    let problem = problemHelper.readProblem(input);

    console.log("# problem queries: ", problem.queries.length);
    console.log("# of cities: " + Object.keys(problem.cities).length);

    let actual = problemHelper.solveProblem(problem);

    // printResults prints results as is defined in the problem.  checkStatus compares actual/expected values
    problemHelper.checkStatus(expected, actual);
    // problemHelper.printResults(actual);
    console.log("finished!");
  });
});
