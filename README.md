# Akamai EdgeWorkers Test Mocks

This repository provides a set of Jest mocks for the [EdgeWorkers API](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html). In the Akamai EdgeWorkers execution environment, there are a set of modules and objects provided; since equivalent packages are not available in npm or node, Jest mocks are provided here to be able to execute JS written against the EdgeWorkers API in Node.js for the purpose of testing.

These mocks are provided using [manual mocks](https://jestjs.io/docs/en/manual-mocks) and allow for user control of their functions.  

This isn't a perfect solution, as:
* Mocks provided here will not perfectly replicate the API.
* Tests are executed in Node; while both Node and EdgeWorkers run on top of V8, some features are explicitly disabled for EdgeWorkers, there are execution limits for EdgeWorkers (time and memory), and developers need to be careful not to pull in Node APIs.


## Structure

The EdgeWorker has the following structure:

* `src` - the location of your main.js and bundle.json.  All additional modules should go here.
* `test` - unit tests


### 


## Running Tests

Testing is provided via the [Jest](https://jestjs.io/) framework.
To run you unit tests, execute the following command from the command line:

```
npm test
```

This will run all tests in the `test` directory following the `Jest` conventions.  If you want more tests, name them in the pattern *.test.js.

A good overview of using Jest can be found [here](https://flaviocopes.com/jest/).

## Examples

Example EdgeWorkers and tests to go along with them can be found [in the Akamai EdgeWorkers Exmaples](https://github.com/akamai/edgeworkers-examples) repo.
