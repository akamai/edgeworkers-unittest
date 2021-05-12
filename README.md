# EdgeWorkers Unit Tests
Mocks and examples to write and run unit tests for EdgeWorkers 

### Mocks
The goal of this repository is to provide a set of mocks for the [EdgeWorkers API](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html). There are a set of modules and objects provided for EdgeWorker execution; since equivalent packages are not available in npm, Jest mocks are provided here to be able to execute JS written against this API in Node.js.

These mocks are provided using [manual mocks](https://jestjs.io/docs/en/manual-mocks) and allow for user control of their functions.  

This isn't a perfect solution, as:
* mocks will not perfectly replicate the API
* tests are executed in Node, meaning developers need to be careful not to pull in Node APIs and need to be aware of the execution limits of EdgeWorkers


## Structure

The EdgeWorker has the following structure:

* `src` - the location of your main.js and bundle.json.  All additional modules should go here.
* `test` - unit tests


## Running Tests

Testing is provided via the [Jest](https://jestjs.io/) framework.
To run you unit tests, execute the following command from the command line:

```
npm test
```

This will run all tests in the `test` directory following the `Jest` conventions.  If you want more tests, name them in the pattern *.test.js.

A good overview of using Jest can be found [here](https://flaviocopes.com/jest/).

## Examples

Need to write some example EdgeWorkers